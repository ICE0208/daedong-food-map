"use client";

import { useEffect, useState } from "react";
import { CurrentPositionButton, KakaoMap } from "./components";
import { getNearRestaurant } from "./actions";
import { SearchKeywordResponse } from "@/types/apiTypes";

export interface Position {
  lat: number;
  lng: number;
}

export default function FoodMapPage() {
  const [position, setPosition] = useState<Position>({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [data, setData] = useState<SearchKeywordResponse | null>(null);

  useEffect(() => {
    if (!position) return;
    const action = async () => {
      const result = await getNearRestaurant(position);
      setData(result);
    };

    action();
  }, [position]);

  return (
    <div className="flex w-full flex-col items-center px-24 py-8">
      <div className="h-[600px] w-full max-w-[1200px] overflow-hidden rounded-xl bg-neutral-100">
        <KakaoMap
          restaurantsData={data?.documents}
          lat={position.lat}
          lng={position.lng}
        />
      </div>
      <CurrentPositionButton setPosition={setPosition} />
    </div>
  );
}
