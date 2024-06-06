"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";
import { Prisma } from "@prisma/client";

export const searchTalkAction = async (query: string) => {
  const session = await getSession();
  const user = session.user;

  const result = await db.talk.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      content: { contains: query },
    },
    include: {
      user: { select: { nickname: true } },
      likes: { where: { userId: user?.id } },
      _count: { select: { likes: true, talkComments: true } },
      talkComments: {
        take: 1,
        orderBy: { createdAt: "desc" },
        select: {
          user: { select: { nickname: true } },
          content: true,
          _count: { select: { talkCommentReplies: true } },
        },
      },
    },
  });

  return result.map((talk) => ({
    ...talk,
    convertedDate: formatToTimeAgo(talk.createdAt.toString()),
    type: "TALK",
  }));
};

export type SearchTalk = Prisma.PromiseReturnType<typeof searchTalkAction>;

export const searchReviewAction = async (query: string) => {
  const session = await getSession();
  const user = session.user;

  const result = await db.review.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      content: { contains: query },
    },
    include: {
      user: { select: { nickname: true } },
      likes: { where: { userId: user?.id } },
      _count: { select: { likes: true } },
      restaurant: { select: { name: true } },
    },
  });

  return result.map((review) => ({
    ...review,
    convertedDate: formatToTimeAgo(review.createdAt.toString()),
    type: "REVIEW",
  }));
};
export type SearchReview = Prisma.PromiseReturnType<typeof searchReviewAction>;
