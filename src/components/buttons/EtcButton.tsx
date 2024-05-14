"use client";

import EtcSVG from "@/icons/EtcSVG";
import SVGButton from "../SVGButton";

interface EtcButtonProps {
  onClick?: () => void;
  type?: "VIEWER" | "OWNER";
  size?: number;
  isModalActive?: boolean;
  reportFn?: () => void;
  editFn?: () => void;
  deleteFn?: () => void;
}

export default function EtcButton({
  onClick,
  type = "VIEWER",
  size,
  isModalActive,
  reportFn,
  editFn,
  deleteFn,
}: EtcButtonProps) {
  return (
    <div
      id="comment-etc-button"
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <SVGButton className="pointer-events-none" svg={EtcSVG} size={size} />
      {isModalActive && (
        <div className="absolute right-0 top-[20px] flex w-32 flex-col items-stretch rounded-2xl bg-gray-200 py-2">
          {type === "VIEWER" ? (
            <>
              <div
                className="py-1 text-center hover:bg-gray-100"
                onClick={reportFn}
              >
                신고
              </div>
            </>
          ) : (
            <>
              <div
                className="py-1 text-center hover:bg-gray-50"
                onClick={editFn}
              >
                수정
              </div>
              <div
                className="py-1 text-center hover:bg-gray-50"
                onClick={deleteFn}
              >
                삭제
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
