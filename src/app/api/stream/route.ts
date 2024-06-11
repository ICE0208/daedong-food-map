import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { StreamingTextResponse } from "ai";
import getSession from "@/libs/session";
import dbEdge from "@/libs/db";
import { Document } from "@/types/apiTypes";

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

    const { message, data }: { message: string; data: Document[] } =
      await request.json();

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

    const dataForAI = data.map((doc) => ({
      place_name: doc.place_name,
      address_name: doc.address_name,
      category_name: doc.category_name,
      distance: doc.distance,
      phone: doc.phone,
    }));

    const systemMessage = {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        "You are an assistant that recommends restaurants based on provided data. You must use only the provided restaurant data for recommendations and not create or fabricate any additional information. Respond in Korean and keep your response within 300 characters including spaces. Speak in a kind, gentle, and friendly tone using emojis and wave symbols (~), and occasionally say nice things to the user. Always check the provided data carefully before stating that a certain type of restaurant is not available. If a specific type of restaurant is requested, ensure to look for related keywords in the provided data and recommend restaurants that serve the requested type of food, even if it is not a specialty. Restaurants provide as many restaurants as possible, but provide as much relevant restaurant information as possible and limit it to a maximum of three. You won't be looking for a specialty restaurant for a particular dish, but you'll be providing information about restaurants that can sell it.",
    };

    const userMessage = {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: message,
    };

    const assistantMessage = {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Here are the restaurant data provided by the user: ${JSON.stringify(dataForAI)}. Please recommend a restaurant based on this data.`,
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

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
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
