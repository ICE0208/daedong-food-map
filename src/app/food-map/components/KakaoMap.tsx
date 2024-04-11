import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  lat: number;
  lng: number;
}

export default function KakaoMap({ lat, lng }: KakaoMapProps) {
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
      level={3}
    >
      <MapMarker position={{ lat, lng }}>
        <div style={{ color: "#000" }}>Hello World!</div>
      </MapMarker>
    </Map>
  );
}
