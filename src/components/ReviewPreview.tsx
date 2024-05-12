"use client";

import HeartSVG from "@/icons/HeartSVG";
import SVGButton from "./SVGButton";

interface ReviewPreviewProps {
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  restaurantName: string;
  rate: number;
}

export default function ReviewPreview({
  author,
  formattedData,
  content,
  heartCount,
  restaurantName,
  rate,
}: ReviewPreviewProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-neutral-50">
      <div className="p-6 pb-3">
        {/* 프로필 */}
        <div className="flex items-center gap-3">
          <div className="aspect-square w-12 rounded-full bg-blue-300"></div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{author}</span>
            <span className="text-sm">{formattedData}</span>
          </div>
        </div>
        <div className="my-3" />

        {/* 식당 이름 */}
        <div className="text-[17px]">
          <span className="font-semibold">{"식당 이름: "}</span>
          <span>{restaurantName}</span>
        </div>

        {/* 평점*/}
        <div className="text-[17px]">
          <span className="font-semibold">{"평점: "}</span>
          <RateStarDisplay rate={rate} />
        </div>
        <div className="my-2" />

        {/* 텍스트 부분 */}
        <div>
          <span className="whitespace-pre-wrap break-words">{content}</span>
        </div>
        <div className="my-2" />

        {/* 좋아요 아이콘, 개수 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-[1px]">
            <SVGButton svg={HeartSVG} size={5} color="rgb(252, 84, 151)" />
            <span>{heartCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RateStarDisplayProps {
  rate: number;
}

function RateStarDisplay({ rate }: RateStarDisplayProps) {
  // 평점(rate)은 5점 만점이므로, 만점을 100% 기준으로 맞춫기 위하여 x20을 해주었습니다.
  const percentage = rate * 20;

  return (
    <span className="space-x-1 text-inherit">
      <span>{(Math.floor(rate * 10) / 10).toFixed(1)}</span>
      <span
        style={{
          backgroundImage: `linear-gradient(to right, #ffdd47 ${percentage}%, #cbcbcb ${percentage}%)`,
        }}
        className="bg-clip-text"
      >
        <span className="text-[#ffffff00]">★★★★★</span>
      </span>
    </span>
  );
}
