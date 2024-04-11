"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface Position {
  lat: number;
  lng: number;
}

export default function FoodMapPage() {
  const [position, setPosition] = useState<Position>({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [locationLoading, setLocationLoading] = useState(false);

  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAOJSKEY!,
    libraries: ["clusterer", "services"],
  });

  const handleClick = () => {
    if (locationLoading) return;
    console.log("현재 위치 불러오기 시작");
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setPosition((prev) => ({
          lat,
          lng: lng === prev.lng ? lng + 10 ** -12 : lng,
        }));
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
      },
      { maximumAge: Infinity },
    );
  };

  return (
    <div className="w-full p-4">
      <div className="h-[600px] w-full overflow-hidden rounded-xl bg-neutral-100">
        <Map // 지도를 표시할 Container
          id="map"
          isPanto={true}
          center={{
            // 지도의 중심좌표
            lat: position.lat,
            lng: position.lng,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={3}
        >
          <MapMarker position={{ lat: position.lat, lng: position.lng }}>
            <div style={{ color: "#000" }}>Hello World!</div>
          </MapMarker>
        </Map>
      </div>
      <button onClick={handleClick}>
        {locationLoading ? "위치 로딩중..." : "내 위치로 가기"}
      </button>
    </div>
  );
}
