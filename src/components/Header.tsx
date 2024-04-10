"use client";

import useScrollY from "@/hooks/useScrollY";
import cls from "@/utils/cls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SVGButton from "./SVGButton";

const HEADER_HEIGHT = 70;

export default function Header() {
  const currentY = useScrollY();
  const isScrolled = currentY > 0;

  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div style={{ height: `${HEADER_HEIGHT}px` }}>
      <div
        className={cls(
          "fixed flex w-full items-center gap-8 bg-white bg-opacity-0 px-4 text-white",
          "transition-all duration-200 ease-in-out",
          `${isScrolled && "bg-opacity-100 text-black "}`,
        )}
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <button onClick={handleLogoClick} className="text-2xl font-extrabold">
          대동밥 지도
        </button>
        <Link href="/food-map">맛집</Link>
        <Link href="/talk">잡담</Link>
        <Link href="/review">리뷰</Link>
        {/* <SVGButton /> */}
      </div>
    </div>
  );
}
