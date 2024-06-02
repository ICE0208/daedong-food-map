"use client";

import cls from "@/utils/cls";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function BlueSubmitButton({
  text,
  onClick,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cls(
        "rounded-xl bg-blue-600 px-6 py-2 text-white",
        "hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400",
      )}
      onClick={onClick}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-[4px]">
          <span>로딩중</span>
          <div className="mx-[4px] animate-spin text-[8px] font-semibold">
            |
          </div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
