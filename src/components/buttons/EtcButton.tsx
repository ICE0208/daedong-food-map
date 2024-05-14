"use client";

import EtcSVG from "@/icons/EtcSVG";
import SVGButton from "../SVGButton";

interface EtcButtonProps {
  onClick?: () => void;
  size?: number;
}

export default function EtcButton({ onClick, size }: EtcButtonProps) {
  return (
    <>
      <SVGButton svg={EtcSVG} onClick={onClick} size={size} />
    </>
  );
}
