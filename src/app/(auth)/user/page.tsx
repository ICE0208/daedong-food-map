import getSession from "@/libs/session";
import { redirect } from "next/navigation";
import UserPageClient, {
  UserPageClientWithRecoilRoot,
} from "./components/UserPageClient";
import db from "@/libs/db";
import { PromiseReturnType } from "@prisma/client/extension";
import { formatToTimeAgo } from "@/utils/formatToTimeAgo";
import { RecoilRoot } from "recoil";

async function getUserInfo(userId: string) {
  const userInfo = await db.user.findUnique({
    where: { id: userId },
    select: {
      nickname: true,
      email: true,
    },
  });

  if (!userInfo) {
    redirect("/");
  }

  return userInfo;
}

async function getUserReview(userId: string) {
  const userReview = await db.review.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
    include: {
      user: { select: { nickname: true } },
      likes: { where: { userId: userId } },
      _count: { select: { likes: true } },
      restaurant: { select: { name: true } },
    },
  });

  if (!userReview) {
    redirect("/");
  }

  return userReview.map((review) => ({
    ...review,
    convertedDate: formatToTimeAgo(review.createdAt.toString()),
  }));
}

async function getUserTalk(userId: string) {
  const userTalk = await db.talk.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
    include: {
      user: { select: { nickname: true } },
      likes: { where: { userId: userId } },
      _count: { select: { likes: true, talkComments: true } },
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

  if (!userTalk) {
    redirect("/");
  }

  return userTalk.map((talk) => ({
    ...talk,
    convertedDate: formatToTimeAgo(talk.createdAt.toString()),
  }));
}

async function getLikeReview(userId: string) {
  const likeReview = await db.reviewLike.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
    select: {
      review: {
        include: {
          user: { select: { nickname: true } },
          likes: { where: { userId: userId } },
          _count: { select: { likes: true } },
          restaurant: { select: { name: true } },
        },
      },
    },
  });

  if (!likeReview) {
    redirect("/");
  }

  return likeReview.map((data) => ({
    ...data,
    convertedDate: formatToTimeAgo(data.review.createdAt.toString()),
  }));
}

async function getLikeTalk(userId: string) {
  const likeTalk = await db.talkLike.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId },
    select: {
      talk: {
        include: {
          user: { select: { nickname: true } },
          likes: { where: { userId: userId } },
          _count: { select: { likes: true, talkComments: true } },
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
      },
    },
  });

  if (!likeTalk) {
    redirect("/");
  }

  return likeTalk.map((data) => ({
    ...data,
    convertedDate: formatToTimeAgo(data.talk.createdAt.toString()),
  }));
}

export type UserInfo = PromiseReturnType<typeof getUserInfo>;
export type UserReview = PromiseReturnType<typeof getUserReview>;
export type UserTalk = PromiseReturnType<typeof getUserTalk>;
export type LikeReview = PromiseReturnType<typeof getLikeReview>;
export type LikeTalk = PromiseReturnType<typeof getLikeTalk>;

export default async function UserPage() {
  const session = await getSession();
  const user = session.user;
  if (!user) {
    redirect("/log-in");
  }

  const userInfo = await getUserInfo(user.id);
  if (!userInfo) {
    session.destroy();
    redirect("/log-in");
  }

  const userReview = await getUserReview(user.id);
  const userTalk = await getUserTalk(user.id);
  const likeReview = await getLikeReview(user.id);
  const likeTalk = await getLikeTalk(user.id);

  return (
    <UserPageClientWithRecoilRoot
      userInfo={userInfo}
      userReview={userReview}
      userTalk={userTalk}
      likeReview={likeReview}
      liekTalk={likeTalk}
    />
  );
}
