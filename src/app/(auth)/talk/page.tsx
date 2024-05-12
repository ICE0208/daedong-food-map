import TalkPreview from "@/components/TalkPreview";
import { default as talkMockData } from "@/mocks/talkData";

const getTalkData = async () => {
  return talkMockData;
};

export default async function TalkPage() {
  const talkData = await getTalkData();

  return (
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
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
      </div>
    </main>
  );
}
