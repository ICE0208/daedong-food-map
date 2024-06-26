"use client";

import HeartSVG from "@/icons/HeartSVG";
import CommentSVG from "@/icons/CommentSVG";
import SVGButton from "@/components/SVGButton";
import EtcButton from "@/components/buttons/EtcButton";
import { useCallback, useEffect, useState } from "react";
import { submitTalkLike } from "../../actions";

interface RecentComment {
  author: string;
  content: string;
}

interface TalkPreviewProps {
  talkId: number;
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  commentCount: number;
  isLike: boolean;
}

export default function TalkDetail({
  talkId,
  author,
  formattedData,
  content,
  heartCount,
  commentCount,
  isLike,
}: TalkPreviewProps) {
  const [modalActive, setModalActive] = useState(false);

  const windowClick = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id !== "talk-detail-etc-button") {
      setModalActive(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", windowClick);
    return () => window.removeEventListener("click", windowClick);
  }, [windowClick]);

  return (
    <div className="w-full rounded-xl bg-neutral-50 transition">
      <div className="p-6 pb-4">
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
              id="talk-detail-etc-button"
              size={5}
              onClick={() => setModalActive(true)}
              isModalActive={modalActive}
              reportFn={() => console.log(`잡담 ${talkId}를 신고합니다`)}
              editFn={() => console.log(`잡담 ${talkId}를 수정합니다`)}
              deleteFn={() => console.log(`잡담 ${talkId}를 삭제합니다`)}
            />
          </div>
        </div>
        <div className="my-3" />

        {/* 텍스트 부분 */}
        <div>
          <span className="whitespace-pre-wrap break-words">{content}</span>
        </div>
        <div className="my-2" />
        {/* 좋아요, 댓글 아이콘, 개수 */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-[1px]">
            <SVGButton
              svg={HeartSVG}
              size={5}
              color={isLike ? "rgb(252, 84, 151)" : "rgba(252, 84, 151, 0.3)"}
              onClick={() => submitTalkLike(talkId, isLike)}
            />
            <span>{heartCount}</span>
          </div>
          <div className="flex items-center gap-[1px]">
            <SVGButton svg={CommentSVG} size={5} color="rgb(72, 72, 72)" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
