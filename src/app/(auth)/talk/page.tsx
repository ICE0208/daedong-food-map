import RecoilWrapper from "@/components/RecoilWrapper";
import SVGButton from "@/components/SVGButton";
import TalkPreview from "@/components/TalkPreview";
import PencilSVG from "@/icons/PencilSVG";
import db from "@/libs/db";
import getSession from "@/libs/session";
import cls from "@/utils/cls";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";
import Link from "next/link";

const getTalkData = async () => {
  const session = await getSession();
  const user = session.user;

  const talks = await db.talk.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      user: {
        select: { nickname: true },
      },
      content: true,
      createdAt: true,
      likes: { where: { userId: user?.id } },
      _count: {
        select: {
          likes: true,
          talkComments: true,
        },
      },
      talkComments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          user: { select: { nickname: true } },
          content: true,
          _count: {
            select: {
              talkCommentReplies: true,
            },
          },
        },
      },
    },
  });

  const enhancedTalks = talks.map((talk) => ({
    ...talk,
    totalCommentsCount:
      talk._count.talkComments +
      (talk.talkComments.length > 0
        ? talk.talkComments[0]._count.talkCommentReplies
        : 0),
  }));

  return enhancedTalks;
};

export default async function TalkPage() {
  const talkData = await getTalkData();

  return (
    <main className="flex justify-center px-24 py-8">
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        <RecoilWrapper>
          {talkData.map((data, index) => (
            <TalkPreview
              key={data.id}
              talkId={data.id}
              author={data.user.nickname}
              formattedData={formatToTimeAgo(data.createdAt.toString())}
              content={data.content}
              heartCount={data._count.likes}
              commentCount={data.totalCommentsCount}
              isLike={data.likes.length > 0}
              recentComment={data.talkComments[0]}
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
