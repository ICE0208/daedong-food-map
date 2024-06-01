"use server";

import db from "@/libs/db";
import { SearchKeywordResponse } from "@/types/apiTypes";
import { redirect } from "next/navigation";

export const getNearRestaurant = async (position: {
  lat: number;
  lng: number;
}) => {
  const url = new URL("https://dapi.kakao.com/v2/local/search/category.json");

  const params = {
    x: `${position.lng}`, // 경도
    y: `${position.lat}`, // 위도
    radius: "2000", // 미터 단위
    category_group_code: "FD6", // 음식점 그룹 코드
  };

  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url.toString(), {
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY!}` },
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      return null;
    }
  } catch (error) {
    return null;
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
