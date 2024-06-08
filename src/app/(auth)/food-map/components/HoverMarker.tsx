"use client";

import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

interface HoverMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
  hoverText: string;
  textVisible?: boolean;
  onClick: () => void;
}

export default function HoverMarker({
  position,
  hoverText,
  textVisible = false,
  onClick,
}: HoverMarkerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const markerImage =
    textVisible || isOpen
      ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
      : "https://t1.daumcdn.net/mapjsapi/images/marker.png";

  return (
    <>
      <MapMarker
        image={{
          src: markerImage, // 마커이미지의 주소입니다
          size: {
            width: 24,
            height: 35,
          }, // 마커이미지의 크기입니다
        }}
        position={position}
        onMouseOver={
          // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
          () => setIsOpen(true)
        }
        // 마커에 마우스아웃 이벤트를 등록합니다
        onMouseOut={
          // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
          () => setIsOpen(false)
        }
        onClick={onClick}
      ></MapMarker>
      {(textVisible || isOpen) && (
        <CustomOverlayMap position={position} yAnchor={2.2}>
          <div className="rounded-xl bg-white px-[8px] py-[6px] shadow-xl">
            <span className="title text-sm font-semibold">{hoverText}</span>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
