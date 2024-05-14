"use client";

import HeartSVG from "@/icons/HeartSVG";
import SVGButton from "./SVGButton";
import CommentSVG from "@/icons/CommentSVG";
import { useRouter } from "next/navigation";
import EtcButton from "./buttons/EtcButton";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { talkPreviewActiveModalState } from "@/app/atoms";
import withStopPropagation from "@/utils/withStopPropagation";

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
  recentComment: RecentComment;
}

export default function TalkPreview({
  talkId,
  author,
  formattedData,
  content,
  heartCount,
  commentCount,
  recentComment,
}: TalkPreviewProps) {
  const router = useRouter();

  const handleTalkPreview = () => {
    router.push(`/talk/${talkId}`);
  };

  const [modalActive, setModalActive] = useRecoilState(
    talkPreviewActiveModalState,
  );
  const resetModalActive = useResetRecoilState(talkPreviewActiveModalState);

  const windowClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id !== "talk-preview-etc-button") {
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
    <div
      className="w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-50 transition hover:scale-[1.01]"
      onClick={handleTalkPreview}
    >
      <div className="p-6 pb-3">
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
              id="talk-preview-etc-button"
              size={5}
              onClick={withStopPropagation(() => setModalActive(talkId))}
              isModalActive={modalActive === talkId}
              reportFn={withStopPropagation(() => {
                resetModalActive();
                console.log(`잡담 ${talkId}를 신고합니다`);
              })}
              editFn={withStopPropagation(() => {
                resetModalActive();
                console.log(`잡담 ${talkId}를 수정합니다`);
              })}
              deleteFn={withStopPropagation(() => {
                resetModalActive();
                console.log(`잡담 ${talkId}를 삭제합니다`);
              })}
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
            <SVGButton svg={HeartSVG} size={5} color="rgb(252, 84, 151)" />
            <span>{heartCount}</span>
          </div>
          <div className="flex items-center gap-[1px]">
            <SVGButton svg={CommentSVG} size={5} color="rgb(72, 72, 72)" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
      {/* 최근 댓글 */}
      <div className="overflow-hidden text-ellipsis text-nowrap bg-neutral-300 px-6 py-2">
        <span className="font-semibold">최근 댓글 | </span>
        <span className="font-semibold">{recentComment.author} : </span>
        <span>{recentComment.content}</span>
      </div>
    </div>
  );
}
