"use client";

import useScrollY from "@/hooks/useScrollY";
import cls from "@/utils/cls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SVGButton from "../SVGButton";
import SearchForm from "./SearchForm";
import localFont from "next/font/local";
import BellSVG from "@/icons/BellSVG";
import UserSVG from "@/icons/UserSVG";

const HEADER_HEIGHT = 70;

const fontBMHANNAPro = localFont({
  src: "../../assets/fonts/BMHANNAPro.ttf",
  display: "swap",
});

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
          "fixed z-50 flex w-full items-center justify-between bg-white bg-opacity-0 px-4",
          "transition-all duration-300 ease-in-out",
          `${isScrolled && "bg-opacity-100 text-black"}`,
        )}
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <div className="flex items-center space-x-8">
          <button
            onClick={handleLogoClick}
            className={cls("text-in text-[36px]", fontBMHANNAPro.className)}
          >
            대동밥 지도
          </button>
          <Link
            className={cls("text-[20px]", fontBMHANNAPro.className)}
            href="/food-map"
          >
            맛집
          </Link>
          <Link
            className={cls("text-[20px]", fontBMHANNAPro.className)}
            href="/talk"
          >
            잡담
          </Link>
          <Link
            className={cls("text-[20px]", fontBMHANNAPro.className)}
            href="/review"
          >
            리뷰
          </Link>
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
