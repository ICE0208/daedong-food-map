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
        JSON.stringify({ status: false, message: "Message is required." }),
        { status: 400 },
      );
    }

    if (message.length > 50) {
      return new Response(
        JSON.stringify({ status: false, message: "Message is too long." }),
        { status: 400 },
      );
    }

    if (!data) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Failed to load restaurant data.",
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
        "You are an assistant that recommends restaurants based on provided data. You must only use the provided restaurant data for recommendations and not create or fabricate any additional information. Respond in Korean and keep your response within 300 characters including spaces. Speak in a kind, gentle, and friendly tone using emojis and wave symbols (~), and occasionally say nice things to the user. If you don't know something or if the data is not available, say there are no such restaurants nearby in a friendly manner.",
    };

    const userMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: message,
    };

    const assistantMessage = {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `다음은 사용자가 제공한 식당 데이터입니다: ${JSON.stringify(recommendations)}. 이 데이터를 바탕으로 식당을 추천해 주세요. 응답은 띄어쓰기 포함 300자 이내로 작성해 주세요. `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, userMessage, assistantMessage],
      temperature: 0.2, // Lower temperature for less creativity
      max_tokens: 1024, // Limit the maximum number of tokens to avoid excessive length
      top_p: 0.9, // Reduce the probability of less likely outputs
    });

    if (!response.body) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Error occurred while generating response.",
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
                // Ignore JSON parsing errors
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
        message: "Error occurred while generating response.",
      }),
      { status: 500 },
    );
  }
}
