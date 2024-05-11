"use client";

import useScrollY from "@/hooks/useScrollY";
import cls from "@/utils/cls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SVGButton from "../SVGButton";
import SearchForm from "./SearchForm";
import { BellSVG, UserSVG } from "@/icons";

const HEADER_HEIGHT = 70;

export default function Header() {
  const currentY = useScrollY();
  const isScrolled = currentY > 0;

  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleUserIconClick = () => {
    router.push("/log-in");
  };

  return (
    <div className="text-white" style={{ height: `${HEADER_HEIGHT}px` }}>
      <div
        className={cls(
          "fixed flex w-full items-center justify-between bg-white bg-opacity-0 px-4",
          "transition-all duration-300 ease-in-out",
          `${isScrolled && "bg-opacity-100 text-black"}`,
        )}
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <div className="flex items-center space-x-8">
          <button
            onClick={handleLogoClick}
            className="text-in text-2xl font-extrabold"
          >
            대동밥 지도
          </button>
          <Link href="/food-map">맛집</Link>
          <Link href="/talk">잡담</Link>
          <Link href="/review">리뷰</Link>
        </div>
        <div className="flex items-center space-x-5">
          <SVGButton svg={BellSVG} size={5} />
          <SVGButton onClick={handleUserIconClick} svg={UserSVG} size={5} />
          <SearchForm theme={isScrolled ? "dark" : "light"} />
        </div>
      </div>
    </div>
  );
}
