"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { SearchKeywordResponse } from "@/types/apiTypes";
import { redirect } from "next/navigation";

export const getNearRestaurant = async (position: {
  lat: number;
  lng: number;
}): Promise<SearchKeywordResponse> => {
  const baseUrl = "https://dapi.kakao.com/v2/local/search/category.json";
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY!}`,
  };

  // params 객체에 page 속성을 추가할 수 있도록 타입을 확장
  interface Params {
    x: string;
    y: string;
    radius: string;
    category_group_code: string;
    page?: string;
  }

  const params: Params = {
    x: `${position.lng}`, // 경도
    y: `${position.lat}`, // 위도
    radius: "2000", // 미터 단위
    category_group_code: "FD6", // 음식점 그룹 코드
  };

  const requests = [1, 2, 3].map((page) => {
    const url = new URL(baseUrl);
    params.page = `${page}`;
    url.search = new URLSearchParams(params as any).toString();

    return fetch(url.toString(), { headers })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          return response.json().then((errorData) => {
            if (
              errorData.errorType === "InvalidArgument" &&
              errorData.message.includes("page is more than max")
            ) {
              return null; // 페이지가 더 이상 없는 경우 null 반환
            }
            throw new Error(`Error: ${errorData.message}`);
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        return null; // 오류 발생 시 null 반환
      });
  });

  try {
    const results = await Promise.all(requests);
    const validResults = results.filter(
      (result) => result !== null,
    ) as SearchKeywordResponse[];

    const allDocuments: SearchKeywordResponse["documents"] =
      validResults.flatMap((result) => result.documents);
    const meta: SearchKeywordResponse["meta"] =
      validResults.length > 0
        ? validResults[0].meta
        : { is_end: true, pageable_count: 0, same_name: {}, total_count: 0 };

    return { documents: allDocuments, meta };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      documents: [],
      meta: { is_end: true, pageable_count: 0, same_name: {}, total_count: 0 },
    };
  }
};

export const routeRestaurantDetail = async (
  data: SearchKeywordResponse["documents"][number],
) => {
  const isExist = Boolean(
    await db.restaurant.findUnique({
      where: {
        id: +data.id,
      },
      select: {
        id: true,
      },
    }),
  );

  if (!isExist) {
    await db.restaurant.create({
      data: {
        id: +data.id,
        name: data.place_name,
        address: data.road_address_name,
        category: data.category_name,
        phone: data.phone,
      },
    });
  }

  redirect(`/restaurant/${data.id}`);
};

interface GenerateMessageResponse {
  status: boolean;
  message: string;
}

const GPT_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export const generateMessage = async (
  message: string,
  data: SearchKeywordResponse["documents"] | undefined,
): Promise<GenerateMessageResponse> => {
  const session = await getSession();
  const user = session.user;

  if (!user) {
    return { status: false, message: "해당 기능은 로그인이 필요합니다." };
  }

  const isSubscriber = Boolean(
    await db.subscriber.findUnique({
      where: {
        userId: user.id,
      },
    }),
  );
  if (!isSubscriber) {
    return {
      status: false,
      message:
        "해당 기능은 유료 구독자만 이용할 수 있습니다. 관리자에게 문의하세요.",
    };
  }

  if (!data) {
    console.log("data가 없음.");
    return { status: false, message: "식당 데이터를 불러오지 못했습니다." };
  }

  if (message.length > 50)
    return { status: false, message: "메세지가 너무 깁니다." };

  try {
    const recommendations = data.map((doc) => ({
      place_name: doc.place_name,
      address_name: doc.address_name,
      category_name: doc.category_name,
      distance: doc.distance,
    }));

    const systemMessage = {
      role: "system",
      content:
        "You are an assistant that helps recommend restaurants based on user preferences. Do not include any links or non-related phrases like 'bon appétit!' in your responses. Respond in Korean.",
    };

    const userMessage = {
      role: "user",
      content: message,
    };

    const assistantMessage = {
      role: "assistant",
      content: `Here is the restaurant data: ${JSON.stringify(recommendations)}. Based on the user's message, please recommend some restaurants without including any links or non-related phrases.`,
    };

    const response = await fetch(GPT_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemMessage, userMessage, assistantMessage],
      }),
    });

    const result = await response.json();

    // 응답에서 적절한 내용을 반환
    return { status: true, message: String(result.choices[0].message.content) };
  } catch (error) {
    console.error("Error generating message:", error);
    return { status: false, message: "응답 생성 중 오류가 발생했습니다." };
  }
};
