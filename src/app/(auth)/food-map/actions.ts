"use server";

import db from "@/libs/db";
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
