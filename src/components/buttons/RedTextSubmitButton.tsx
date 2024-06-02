"use client";

import cls from "@/utils/cls";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function RedTextSubmitButton({
  text,
  onClick,
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className={cls("rounded-xl p-2 text-red-500")}
      onClick={onClick}
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-[4px]">
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
