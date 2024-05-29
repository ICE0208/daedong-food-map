"use client";

import { useEffect, useState } from "react";
import { getNearRestaurant } from "./actions";
import { SearchKeywordResponse } from "@/types/apiTypes";
import KakaoMap from "./components/KakaoMap";
import RestaurantListViewer from "./components/RestaurantListViewer";

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

  console.log(data?.documents);

  return (
    <div className="flex w-full flex-1 px-32 pb-14 pt-10">
      {/* <div className="w-full bg-red-200"></div> */}
      <div className="flex w-full gap-6">
        <div className="relative w-full overflow-hidden rounded-xl bg-neutral-500">
          <KakaoMap
            restaurantsData={data?.documents}
            lat={position.lat}
            lng={position.lng}
            setPosition={setPosition}
          />
        </div>
        <RestaurantListViewer restaurantsData={data?.documents} />
      </div>
    </div>
  );
}
