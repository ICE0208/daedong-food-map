import { redirect } from "next/navigation";

import TalkDetail from "./components/TalkDetail";
import CommentsArea from "./components/CommentsArea";
import db from "@/libs/db";
import { Prisma } from "@prisma/client";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";
import BlueSubmitButton from "@/components/buttons/BlueSubmitButton";
import { submitTalkComment } from "./actions";
import getSession from "@/libs/session";

interface TalkDetailPageProps {
  params: {
    id: string;
  };
}

const getDetailTalkData = async (talkId: number) => {
  const session = await getSession();
  const user = session.user;

  const talk = await db.talk.findUnique({
    where: {
      id: talkId,
    },
    select: {
      id: true,
      user: { select: { nickname: true } },
      createdAt: true,
      content: true,
      likes: { where: { userId: user?.id } },
      _count: {
        select: {
          likes: true,
          talkComments: true,
        },
      },
      talkComments: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          user: { select: { nickname: true, id: true } },
          content: true,
          createdAt: true,
          likes: { where: { userId: user?.id } },
          _count: { select: { likes: true } },
          talkCommentReplies: {
            select: {
              id: true,
              user: { select: { nickname: true, id: true } },
              content: true,
              createdAt: true,
              likes: { where: { userId: user?.id } },
              _count: { select: { likes: true } },
            },
          },
        },
      },
    },
  });

  if (!talk) redirect("/talk");

  return talk;
};

export type Talk = Prisma.PromiseReturnType<typeof getDetailTalkData>;

export default async function TalkDetailPage({ params }: TalkDetailPageProps) {
  const { id: talkId } = params;
  const detailTalkData = await getDetailTalkData(+talkId);

  if (!detailTalkData) {
    redirect("/talk");
  }

  const curUserId = (await getSession()).user?.id;

  const submitTalkCommentWithTalkId = submitTalkComment.bind(null, talkId);

  return (
    <main className="flex justify-center px-24 py-8">
      <div className="w-full max-w-[820px] rounded-xl bg-slate-200 p-[20px]">
        <div className="flex w-full flex-col">
          <TalkDetail
            key={detailTalkData.id}
            talkId={detailTalkData.id}
            author={detailTalkData.user.nickname}
            formattedData={formatToTimeAgo(detailTalkData.createdAt.toString())}
            content={detailTalkData.content}
            heartCount={detailTalkData._count.likes}
            commentCount={detailTalkData._count.talkComments}
            isLike={detailTalkData.likes.length > 0}
          />
          <div className="my-1" />

          <div className="my-4" />
          <span className="ml-[8px] text-[20px]">
            댓글 {detailTalkData._count.talkComments}
          </span>
          <div className="my-1" />
          <form
            key={Date.now()}
            action={submitTalkCommentWithTalkId}
            className="flex items-start gap-3 px-3 pr-6"
          >
            <div className="aspect-square w-[36px] rounded-full bg-blue-300" />
            <div className="flex w-full flex-col gap-2">
              <input
                className="w-full border-b-2 border-gray-800 bg-transparent outline-none"
                name="content"
              />
              <span className="self-end">
                <BlueSubmitButton text="등록" />
              </span>
            </div>
          </form>
          <div className="my-2" />
          <CommentsArea
            curUserId={curUserId}
            comments={detailTalkData.talkComments}
          />
        </div>
      </div>
    </main>
  );
}
