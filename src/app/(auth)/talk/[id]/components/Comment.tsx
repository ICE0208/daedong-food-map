import SVGButton from "@/components/SVGButton";
import EtcButton from "@/components/buttons/EtcButton";
import HeartSVG from "@/icons/HeartSVG";
import ReplyButton from "./ReplyButton";
import { submitLike, submitTalkReplyComment } from "../actions";
import { useLayoutEffect, useRef, useState } from "react";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";

interface CommentProps {
  type?: "DEFAULT" | "REPLY";
  activeState: [number, React.Dispatch<React.SetStateAction<number>>];
  commentId: number;
  author: string;
  authorId: string;
  createdAt: Date;
  content: string;
  heartCount: number;
  isLike: boolean;
  activeReply?: boolean;
  curUserId?: string;
}

export default function Comment({
  type = "DEFAULT",
  activeState,
  commentId,
  author,
  authorId,
  content,
  heartCount,
  createdAt,
  isLike,
  activeReply = false,
  curUserId,
}: CommentProps) {
  const [activeId, setActiveId] = activeState;
  const [formattedData, setFormattedData] = useState("로딩중...");

  useLayoutEffect(() => {
    setFormattedData(formatToTimeAgo(createdAt.toString()));
  }, [createdAt]);

  return (
    <div className="flex flex-col rounded-xl bg-neutral-50 px-6 py-5">
      <div className="flex items-center gap-2">
        <div className="aspect-square w-10 flex-none rounded-full bg-blue-300"></div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <span className="overflow-hidden text-ellipsis text-[18px] font-semibold leading-6">
            {author}
          </span>
          <span className="text-[12px]">{formattedData}</span>
        </div>
        <div className="flex-none">
          <EtcButton
            id="comment-etc-button"
            size={5}
            onClick={() => setActiveId(commentId)}
            // ! 테스트용 type 지정, 추후 수정 필요
            type={author === "친절한 악어" ? "OWNER" : "VIEWER"}
            isModalActive={commentId === activeId}
            reportFn={() => console.log(`댓글 ${commentId}를 신고합니다.`)}
            editFn={() => console.log(`댓글 ${commentId}를 수정합니다.`)}
            deleteFn={() => console.log(`댓글 ${commentId}를 삭제합니다.`)}
          />
        </div>
      </div>
      <div className="my-[4px]" />
      <span className="whitespace-pre-wrap break-words">{content}</span>
      <div className="my-[2px]" />
      <div className="mt-2 flex items-center gap-6">
        <div className="flex items-center gap-[2px]">
          <SVGButton
            svg={HeartSVG}
            size={5}
            color={isLike ? "rgb(252, 84, 151)" : "rgba(252, 84, 151, 0.3)"}
            onClick={() => submitLike(commentId, type, isLike)}
          />
          <span>{heartCount}</span>
        </div>
        {activeReply && (
          <form
            action={(formData) => {
              submitTalkReplyComment(commentId, formData);
            }}
            key={Date.now()}
            className="flex flex-grow items-center gap-3"
          >
            <div className="aspect-square w-[22px] rounded-full bg-blue-300" />
            <div className="flex w-full flex-col gap-2">
              <input
                className="w-full border-b-[1.4px] border-gray-800 bg-transparent outline-none"
                name="content"
              />
            </div>
            <ReplyButton />
          </form>
        )}
      </div>
    </div>
  );
}
