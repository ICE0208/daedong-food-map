import BlueSubmitButton from "@/components/buttons/BlueSubmitButton";
import cls from "@/utils/cls";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F0F4F9] px-16 py-8">
      <Link href="/">
        <h1 className="mb-4 font-BMHANNAPro text-[44px]">대동밥 지도</h1>
      </Link>
      <form
        className={cls(
          "relative mb-20 flex w-full max-w-[700px] flex-col items-center rounded-3xl bg-white px-16 py-8",
          "shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
        )}
      >
        <h1 className="mb-6 text-3xl font-semibold">Login</h1>
        <div className="flex w-[280px] flex-col gap-1">
          <div className="flex w-full justify-between">
            <span className="mr-3 flex-1 text-right">아이디</span>
            <input
              className="w-[180px] rounded-lg border-2 px-1"
              placeholder="abc1234"
              name="id"
              type="text"
              required
            />
          </div>
          <div className="flex w-full justify-between">
            <span className="mr-3 flex-1 text-right">비밀번호</span>
            <input
              className="w-[180px] rounded-lg border-2 px-1"
              placeholder="1234*#"
              name="password"
              type="password"
              required
            />
          </div>
        </div>
        <span className="mt-8"></span>
        <BlueSubmitButton text="로그인" />
        <Link
          className="absolute bottom-8 right-10 border-b-[1.5px] border-black"
          href="/create-account"
        >
          가입할래요 &rarr;
        </Link>
      </form>
    </div>
  );
}
