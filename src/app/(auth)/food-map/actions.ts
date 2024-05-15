"use server";

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
