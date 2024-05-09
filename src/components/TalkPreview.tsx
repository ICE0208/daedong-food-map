"use client";

import HeartSVG from "@/icons/HeartSVG";
import SVGButton from "./SVGButton";
import CommentSVG from "@/icons/CommentSVG";

interface RecentComment {
  author: string;
  content: string;
}

interface TalkPreviewProps {
  author: string;
  formattedData: string;
  content: string;
  heartCount: number;
  commentCount: number;
  recentComment: RecentComment;
}

export default function TalkPreview({
  author,
  formattedData,
  content,
  heartCount,
  commentCount,
  recentComment,
}: TalkPreviewProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-neutral-50">
      <div className="p-4 pb-3">
        {/* 프로필 */}
        <div className="flex items-center gap-3">
          <div className="aspect-square w-12 rounded-full bg-blue-300"></div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{author}</span>
            <span className="text-sm">{formattedData}</span>
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
      <div className="overflow-hidden text-ellipsis text-nowrap bg-neutral-300 px-4 py-2">
        <span className="font-semibold">최근 댓글 | </span>
        <span className="font-semibold">{recentComment.author} : </span>
        <span>{recentComment.content}</span>
      </div>
    </div>
  );
}
