"use client";

import EtcSVG from "@/icons/EtcSVG";
import SVGButton from "../SVGButton";

interface EtcButtonProps {
  onClick?: () => void;
  type?: "VIEWER" | "OWNER";
  size?: number;
  isModalActive?: boolean;
}

export default function EtcButton({
  onClick,
  type = "VIEWER",
  size,
  isModalActive,
}: EtcButtonProps) {
  return (
    <div
      id="comment-etc-button"
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <div className="pointer-events-none">
        <SVGButton svg={EtcSVG} size={size} />
        {isModalActive && (
          <div className="absolute right-0 top-[20px] h-32 w-32 rounded-3xl bg-gray-200"></div>
        )}
      </div>
    </div>
  );
}
