"use client";

import HeartSVG from "@/icons/HeartSVG";
import SVGButton from "./SVGButton";
import EtcButton from "./buttons/EtcButton";
import { useRecoilState, useResetRecoilState } from "recoil";
import { reviewPreviewActiveModalState } from "@/app/atoms";
import { useCallback, useEffect } from "react";
import { submitReviewLike } from "@/app/actions";
import Link from "next/link";
import RateStarDisplay from "./RateStarDisplay";

interface ReviewPreviewProps {
  reviewId: number;
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  restaurantName: string;
  restaurantId: number;
  rate: number;
  isLike: boolean;
}

export default function ReviewPreview({
  reviewId,
  author,
  formattedData,
  content,
  heartCount,
  restaurantName,
  restaurantId,
  rate,
  isLike,
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
    <div className="w-full overflow-hidden rounded-xl bg-neutral-50 ring-2 ring-gray-300">
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
          <Link href={`/restaurant/${restaurantId}`}>{restaurantName}</Link>
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
            <SVGButton
              svg={HeartSVG}
              size={5}
              color={isLike ? "rgb(252, 84, 151)" : "rgba(252, 84, 151, 0.3)"}
              onClick={() => submitReviewLike(reviewId, isLike)}
            />
            <span>{heartCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
