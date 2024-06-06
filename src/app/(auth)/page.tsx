import getSession from "@/libs/session";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const session = await getSession();
  // const user = session.user;

  return (
    <>
      <main className="relative flex-1 overflow-hidden bg-neutral-50">
        <div className="absolute flex h-full w-full items-center justify-evenly">
          <Image
            className="absolute h-full w-full object-cover opacity-90 "
            src="/assets/images/main.jpg"
            alt="main"
            width="1920"
            height="1440"
          />
          <LinkButton
            mainText="맛집"
            subText="먹고 싶은 맛집을 누구보다 빠르게"
            href="/food-map"
          />
          <LinkButton
            mainText="잡담"
            subText="음식을 가지고 다른 사람들과 즐겁게"
            href="/talk"
          />
          <LinkButton
            mainText="리뷰"
            subText="내가 먹은 맛집을 다른 사람에게"
            href="/review"
          />
        </div>
      </main>
    </>
  );
}

const LinkButton = ({
  mainText,
  subText,
  href,
}: {
  mainText: string;
  subText: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="z-0 flex size-80 cursor-pointer flex-col items-center justify-center gap-4 rounded-full bg-[#D9CBBC] p-12 ring-[12px] ring-[#FF914D] transition hover:scale-[102%]"
    >
      <span className="text-[50px] font-bold">{mainText}</span>
      <span className="text-pretty text-center text-[22px] font-semibold">
        {subText}
      </span>
    </Link>
  );
};
