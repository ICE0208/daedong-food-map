"use client";

import { useEffect, useState } from "react";
import { getNearRestaurant } from "./actions";
import { SearchKeywordResponse } from "@/types/apiTypes";
import KakaoMap from "./components/KakaoMap";
import RestaurantListViewer from "./components/RestaurantListViewer";
import Modal from "./components/Modal";
import AIChat from "./components/AIChat";

const INIT_POSITION = { lat: 36.79882414199912, lng: 127.07590287342681 };

export interface Position {
  lat: number;
  lng: number;
}

export default function FoodMapPage() {
  const [position, setPosition] = useState<Position>(INIT_POSITION);
  const [data, setData] = useState<SearchKeywordResponse | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const selectedRestaurantData = data?.documents.filter(
    (document) => document.id === selectedId,
  )[0];

  useEffect(() => {
    if (!position) return;
    const action = async () => {
      const result = await getNearRestaurant(position);
      setData(result);
    };

    action();
  }, [position]);

  return (
    <div className="flex w-full flex-1 px-32 pb-14 pt-10">
      {/* <div className="w-full bg-red-200"></div> */}
      <div className="relative flex w-full gap-6">
        <div className="relative w-full overflow-hidden rounded-xl bg-neutral-500">
          <KakaoMap
            restaurantsData={data?.documents}
            lat={position.lat}
            lng={position.lng}
            setPosition={setPosition}
            hoveredId={hoveredId}
            setSelectedId={setSelectedId}
          />
        </div>
        <AIChat restaurantsData={data?.documents} />
        <RestaurantListViewer
          restaurantsData={data?.documents}
          setSelectedId={setSelectedId}
          setHoveredId={setHoveredId}
        />
      </div>
      {selectedId && (
        <Modal
          selectedId={selectedId}
          onExit={() => setSelectedId(null)}
          data={selectedRestaurantData}
        />
      )}
    </div>
  );
}
