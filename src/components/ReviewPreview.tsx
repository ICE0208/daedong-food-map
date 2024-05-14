"use client";

import HeartSVG from "@/icons/HeartSVG";
import SVGButton from "./SVGButton";
import EtcButton from "./buttons/EtcButton";
import { useRecoilState, useResetRecoilState } from "recoil";
import { reviewPreviewActiveModalState } from "@/app/atoms";
import { useCallback, useEffect } from "react";

interface ReviewPreviewProps {
  reviewId: number;
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  restaurantName: string;
  rate: number;
}

export default function ReviewPreview({
  reviewId,
  author,
  formattedData,
  content,
  heartCount,
  restaurantName,
  rate,
}: ReviewPreviewProps) {
  const [modalActive, setModalActive] = useRecoilState(
    reviewPreviewActiveModalState,
  );
  const resetModalActive = useResetRecoilState(reviewPreviewActiveModalState);

  const windowClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id !== "review-preview-etc-button") {
        setModalActive(-1);
      }
    },
    [setModalActive],
  );

  useEffect(() => {
    window.addEventListener("click", windowClick);
    return () => window.removeEventListener("click", windowClick);
  }, [windowClick]);

  return (
    <div className="w-full overflow-hidden rounded-xl bg-neutral-50">
      <div className="p-6 pb-3">
        {/* 프로필 */}
        {/* 프로필 */}
        <div className="flex items-center gap-3">
          <div className="aspect-square w-12 flex-none rounded-full bg-blue-300"></div>
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="overflow-hidden text-ellipsis text-lg font-semibold">
              {author}
            </span>
            <span className="text-sm">{formattedData}</span>
          </div>
          <div className="flex-none">
            <EtcButton
              id="review-preview-etc-button"
              size={5}
              onClick={() => setModalActive(reviewId)}
              isModalActive={modalActive === reviewId}
              reportFn={() => {
                resetModalActive();
                console.log(`리뷰 ${reviewId}를 신고합니다`);
              }}
              editFn={() => {
                resetModalActive();
                console.log(`리뷰 ${reviewId}를 수정합니다`);
              }}
              deleteFn={() => {
                resetModalActive();
                console.log(`리뷰 ${reviewId}를 삭제합니다`);
              }}
            />
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
