import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { StreamingTextResponse } from "ai";
import getSession from "@/libs/session";
import dbEdge from "@/libs/db";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "해당 기능은 로그인이 필요합니다.",
        }),
        { status: 401 },
      );
    }

    const isSubscriber = Boolean(
      await dbEdge.subscriber.findUnique({
        where: { userId: user.id },
      }),
    );

    if (!isSubscriber) {
      return new Response(
        JSON.stringify({
          status: false,
          message:
            "해당 기능은 유료 구독자만 이용할 수 있습니다. 관리자에게 문의하세요.",
        }),
        { status: 403 },
      );
    }

    const { message, data } = await request.json();

    if (!message) {
      return new Response(
        JSON.stringify({ status: false, message: "메시지가 필요합니다." }),
        { status: 400 },
      );
    }

    if (message.length > 50) {
      return new Response(
        JSON.stringify({ status: false, message: "메세지가 너무 깁니다." }),
        { status: 400 },
      );
    }

    if (!data) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "식당 데이터를 불러오지 못했습니다.",
        }),
        { status: 400 },
      );
    }

    const recommendations = data.map((doc: any) => ({
      place_name: doc.place_name,
      address_name: doc.address_name,
      category_name: doc.category_name,
      distance: doc.distance,
    }));

    const systemMessage = {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        "You are an assistant that helps recommend restaurants based on user preferences. Do not include any links or non-related phrases like 'bon appétit!' in your responses. Respond in Korean.",
    };

    const userMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: message,
    };

    const assistantMessage = {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `어떤 음식이 드시고 싶나요? Here is the restaurant data: ${JSON.stringify(recommendations)}. Based on the user's message, please recommend some restaurants without including any links or non-related phrases.`,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, userMessage, assistantMessage],
    });

    if (!response.body) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "응답 생성 중 오류가 발생했습니다.",
        }),
        { status: 500 },
      );
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    const stream = new ReadableStream({
      async start(controller) {
        let done = false;
        let buffer = "";
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer
              .split("\n")
              .filter((line) => line.trim() !== "");
            for (const line of lines) {
              try {
                const json = JSON.parse(line.replace(/^data: /, ""));
                const content = json.choices[0].delta?.content;
                if (content) {
                  controller.enqueue(content);
                }
              } catch (e) {
                // JSON 파싱 오류 무시
              }
            }
            buffer = "";
          }
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: false,
        message: "응답 생성 중 오류가 발생했습니다.",
      }),
      { status: 500 },
    );
  }
}
