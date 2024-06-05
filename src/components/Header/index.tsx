"use client";

import useScrollY from "@/hooks/useScrollY";
import cls from "@/utils/cls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SVGButton from "../SVGButton";
import SearchForm from "./SearchForm";
import BellSVG from "@/icons/BellSVG";
import UserSVG from "@/icons/UserSVG";
import { SessionContent } from "@/libs/session";

const HEADER_HEIGHT = 70;

interface HeaderProps {
  user: SessionContent["user"];
}

export default function Header({ user }: HeaderProps) {
  const currentY = useScrollY();
  const isScrolled = currentY > 0;

  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleUserIconClick = () => {
    router.push("/user");
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
            className={cls("text-in font-BMHANNAPro text-[36px]")}
          >
            대동밥 지도
          </button>
          <Link className={cls("font-BMHANNAPro text-[20px]")} href="/food-map">
            맛집
          </Link>
          <Link className={cls("font-BMHANNAPro text-[20px]")} href="/talk">
            잡담
          </Link>
          <Link className={cls("font-BMHANNAPro text-[20px]")} href="/review">
            리뷰
          </Link>
        </div>
        <div className="flex items-center space-x-5">
          {user && <span>Hello, {user.nickname}!</span>}
          <SVGButton svg={BellSVG} size={5} />
          <SVGButton onClick={handleUserIconClick} svg={UserSVG} size={5} />
          <SearchForm theme={isScrolled ? "dark" : "light"} />
        </div>
      </div>
    </div>
  );
}
