import { default as talkMockData } from "@/mocks/talkData";
import { redirect } from "next/navigation";

import Comment from "./components/Comment";
import TalkDetail from "./components/TalkDetail";

interface TalkDetailPageProps {
  params: {
    id: string;
  };
}

const getDetailTalkData = async (talkId: number) => {
  const mockTalkData = talkMockData;
  const filteredMockTalkData = mockTalkData.filter(
    (data) => data.talkId === talkId,
  );

  return filteredMockTalkData ? filteredMockTalkData[0] : null;
};

export default async function TalkDetailPage({ params }: TalkDetailPageProps) {
  const { id: talkId } = params;
  const detailTalkData = await getDetailTalkData(+talkId);

  if (!detailTalkData) {
    redirect("/talk");
  }

  return (
    <main className="flex justify-center px-24 py-8">
      <div className="w-full max-w-[820px] rounded-xl bg-slate-200 p-[20px]">
        <div className="flex w-full flex-col">
          <TalkDetail
            key={detailTalkData.talkId}
            talkId={detailTalkData.talkId}
            author={detailTalkData.author}
            formattedData={detailTalkData.formattedData}
            content={detailTalkData.content}
            heartCount={detailTalkData.heartCount}
            commentCount={detailTalkData.commentCount}
            recentComment={detailTalkData.recentComment}
          />
          <div className="my-1" />

          <div className="my-4" />
          <span className="ml-[8px] text-[20px]">
            댓글 {detailTalkData.comments.length}
          </span>
          <div className="my-1" />
          <form className="flex items-start gap-3 px-3 pr-6">
            <div className="aspect-square w-[36px] rounded-full bg-blue-300" />
            <div className="flex w-full flex-col gap-2">
              <input
                className="w-full border-b-2 border-gray-800 bg-transparent outline-none"
                name="content"
              />
              <button className="self-end rounded-xl bg-neutral-50 px-[20px] py-[6px] font-semibold">
                등록
              </button>
            </div>
          </form>
          <div className="my-2" />
          {detailTalkData.comments.length > 0 ? (
            <div className="space-y-3">
              {detailTalkData.comments.map((comment, index) => (
                <Comment key={index} {...comment} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center pb-12 pt-4 text-xl">
              댓글이 없습니다. 😭
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
