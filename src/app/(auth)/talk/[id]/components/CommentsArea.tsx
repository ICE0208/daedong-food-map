"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import CommentWithReplies from "./CommentWithReplies";

interface CommentsAreaProps {
  comments: {
    commentId: number;
    author: string;
    content: string;
    formattedData: string;
    heartCount: number;
    replies: {
      commentId: number;
      author: string;
      content: string;
      formattedData: string;
      heartCount: number;
    }[];
  }[];
}

export default function CommentsArea({ comments }: CommentsAreaProps) {
  const activeState = useState(-1);
  const [_, setActive] = useMemo(() => activeState, [activeState]);

  const windowClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id !== "comment-etc-button") {
        setActive(-1);
      }
    },
    [setActive],
  );

  useEffect(() => {
    window.addEventListener("click", windowClick);
    return () => window.removeEventListener("click", windowClick);
  }, [windowClick]);

  return (
    <>
      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment, index) => (
            <CommentWithReplies
              activeState={activeState}
              key={index}
              {...comment}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center pb-12 pt-4 text-xl">
          댓글이 없습니다. 😭
        </div>
      )}
    </>
  );
}
