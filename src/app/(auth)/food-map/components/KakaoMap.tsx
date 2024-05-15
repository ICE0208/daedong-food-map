import { SearchKeywordResponse } from "@/types/apiTypes";
import { useEffect } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import IMAGE from "@/assets/images/red-dot.png";

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
        <MapMarker
          key={data.id}
          position={{ lat: Number(data.y), lng: Number(data.x) }}
        ></MapMarker>
      ))}
      <MapMarker
        position={{ lat, lng }}
        image={{ src: IMAGE.src, size: { width: 24, height: 24 } }}
      >
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
