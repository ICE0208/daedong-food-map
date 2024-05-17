import RecoilWrapper from "@/components/RecoilWrapper";
import SVGButton from "@/components/SVGButton";
import TalkPreview from "@/components/TalkPreview";
import PencilSVG from "@/icons/PencilSVG";
import { default as talkMockData } from "@/mocks/talkData";
import cls from "@/utils/cls";
import Link from "next/link";
import { RecoilRoot } from "recoil";

const getTalkData = async () => {
  return talkMockData;
};

export default async function TalkPage() {
  const talkData = await getTalkData();

  return (
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        <RecoilWrapper>
          {talkData.map((data, index) => (
            <TalkPreview
              key={data.talkId}
              talkId={data.talkId}
              author={data.author}
              formattedData={data.formattedData}
              content={data.content}
              heartCount={data.heartCount}
              commentCount={data.commentCount}
              recentComment={data.recentComment}
            />
          ))}
        </RecoilWrapper>
      </div>
      <Link
        href="/talk/new"
        className={cls(
          "fixed bottom-8 right-8 flex  size-16 items-center justify-center text-3xl",
          "rounded-full bg-white shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]",
          "border-[1.6px] border-neutral-300 hover:border-neutral-400",
          "transition ease-in-out hover:scale-110",
        )}
      >
        <SVGButton color="black" svg={PencilSVG} size={6} />
      </Link>
    </main>
  );
}
