"use client";

import { useFormStatus } from "react-dom";

export default function ReplyButton() {
  const { pending } = useFormStatus();

  return (
    <button className="min-w-[72px] text-nowrap rounded-lg bg-neutral-200 py-[6px] text-[13px] font-normal">
      {pending ? (
        <div className="flex items-center justify-center gap-[4px]">
          <span>로딩중</span>
          <div className="mx-[4px] animate-spin text-[8px] font-semibold">
            |
          </div>
        </div>
      ) : (
        <span>등록</span>
      )}
    </button>
  );
}
