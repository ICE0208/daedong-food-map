import { SearchKeywordResponse } from "@/types/apiTypes";
import { useEffect } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  useKakaoLoader,
} from "react-kakao-maps-sdk";

import IMAGE from "@/assets/images/red-dot.png";
import HoverMarker from "./HoverMarker";

interface KakaoMapProps {
  lat: number;
  lng: number;
  restaurantsData?: SearchKeywordResponse["documents"];
}

export default function KakaoMap({ lat, lng, restaurantsData }: KakaoMapProps) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAOJSKEY!,
    libraries: ["clusterer", "services"],
  });

  return (
    <Map // 지도를 표시할 Container
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
        ></HoverMarker>
      ))}
      <CustomOverlayMap position={{ lat, lng }}>
        <div className="size-4 animate-pulse rounded-full bg-red-400 shadow-2xl" />
      </CustomOverlayMap>
    </Map>
  );
}
