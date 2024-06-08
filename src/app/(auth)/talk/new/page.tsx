import BlueSubmitButton from "@/components/buttons/BlueSubmitButton";
import { submitNewTalk } from "./actions";
import getSession from "@/libs/session";
import { redirect } from "next/navigation";

export default async function TalkNewPage() {
  const user = (await getSession()).user;

  if (!user) redirect("/");

  return (
    <main className="flex justify-center px-24 py-8">
      <div className="w-full max-w-[820px] rounded-xl bg-slate-200 p-[36px]">
        <form action={submitNewTalk} className="flex w-full flex-col">
          {/* 타이틀 */}
          <h1 className="ml-1 text-3xl font-bold">새 잡담</h1>
          <div className="my-2" />
          {/* 텍스트 부분 */}
          <textarea
            className="min-h-96 w-full resize-none rounded-xl border-2 border-gray-300 bg-slate-50 p-4 outline-none"
            name="content"
          />
          <div className="my-3" />
          <BlueSubmitButton text="등록" />
        </form>
      </div>
    </main>
  );
}
