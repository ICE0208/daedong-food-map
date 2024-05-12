"use client";

import { useState } from "react";
import { CurrentPositionButton, KakaoMap } from "./components";

export interface Position {
  lat: number;
  lng: number;
}

export default function FoodMapPage() {
  const [position, setPosition] = useState<Position>({
    lat: 33.450701,
    lng: 126.570667,
  });

  return (
    <div className="flex w-full flex-col items-center px-24 py-8">
      <div className="h-[600px] w-full max-w-[1200px] overflow-hidden rounded-xl bg-neutral-100">
        <KakaoMap lat={position.lat} lng={position.lng} />
      </div>
      <CurrentPositionButton setPosition={setPosition} />
    </div>
  );
}
