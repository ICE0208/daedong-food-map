import { SearchKeywordResponse } from "@/types/apiTypes";
import { Dispatch, SetStateAction, useRef } from "react";
import { CustomOverlayMap, Map, useKakaoLoader } from "react-kakao-maps-sdk";

import { Position } from "../page";
import CurrentPositionButton from "./CurrentPositionButton";
import HoverMarker from "./HoverMarker";

interface KakaoMapProps {
  lat: number;
  lng: number;
  restaurantsData?: SearchKeywordResponse["documents"];
  setPosition: Dispatch<SetStateAction<Position>>;
  hoveredId: string | null;
}

export default function KakaoMap({
  lat,
  lng,
  restaurantsData,
  setPosition,
  hoveredId,
}: KakaoMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAOJSKEY!,
    libraries: ["clusterer", "services"],
  });

  const mapRef = useRef<kakao.maps.Map>(null);

  return (
    <Map // 지도를 표시할 Container
      ref={mapRef}
      id="map"
      isPanto={true}
      center={{
        lat,
        lng,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
      level={4}
    >
      {restaurantsData?.map((data) => (
        <HoverMarker
          key={data.id}
          position={{ lat: Number(data.y), lng: Number(data.x) }}
          hoverText={data.place_name}
          link={data.place_url}
          textVisible={data.id === hoveredId}
        ></HoverMarker>
      ))}
      <CustomOverlayMap position={{ lat, lng }}>
        <div className="size-4 animate-pulse rounded-full bg-red-400 shadow-2xl" />
      </CustomOverlayMap>
      <div className="absolute bottom-4 left-4 z-10 flex w-[180px] flex-col items-center gap-3">
        <CurrentPositionButton
          className="w-full rounded-xl bg-white py-1 font-semibold shadow-xl ring-[3px]"
          setPosition={setPosition}
        />
        <button
          className="w-full rounded-xl bg-white py-1 font-semibold shadow-xl ring-[3px]"
          onClick={() => {
            const map = mapRef.current;
            if (!map) return;

            const center = map.getCenter();
            setPosition({ lat: center.getLat(), lng: center.getLng() });
          }}
        >
          지도 중심에서 식당 찾기
        </button>
      </div>
    </Map>
  );
}
