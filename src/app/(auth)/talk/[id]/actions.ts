"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const submitTalkComment = async (talkId: string, formData: FormData) => {
  const content = formData.get("content") as string;
  const user = (await getSession()).user;

  if (!user) redirect(`/talk/${talkId ?? ""}`);

  const newComment = await db.talkComment.create({
    data: {
      userId: user.id,
      content,
      talkId: +talkId,
    },
  });

  console.log(newComment);
  console.log("댓글 생성됨");
  revalidatePath(`/talk/${talkId}`);
};

export const submitTalkReplyComment = async (
  talkCommentId: number,
  formData: FormData,
) => {
  const content = formData.get("content") as string;
  const user = (await getSession()).user;

  if (!user) return;

  const newTalkReply = await db.talkCommentReply.create({
    data: {
      content,
      userId: user.id,
      talkCommentId,
    },
  });
  console.log(newTalkReply);
  console.log("대댓글 생성됨");

  revalidatePath("");
};

export const submitLike = async (
  commentId: number,
  type: "DEFAULT" | "REPLY",
  prevLikeState: boolean,
) => {
  const user = (await getSession()).user;

  if (!user) return;

  let newLike;
  try {
    if (type === "DEFAULT") {
      if (prevLikeState === false) {
        newLike = await db.talkCommentLike.create({
          data: {
            talkCommentId: commentId,
            userId: user.id,
          },
        });
      } else {
        await db.talkCommentLike.delete({
          where: {
            userId_talkCommentId: { userId: user.id, talkCommentId: commentId },
          },
        });
      }
    } else if (type === "REPLY") {
      if (prevLikeState === false) {
        newLike = await db.talkCommentReplyLike.create({
          data: {
            talkCommentReplyId: commentId,
            userId: user.id,
          },
        });
      } else {
        await db.talkCommentReplyLike.delete({
          where: {
            userId_talkCommentReplyId: {
              userId: user.id,
              talkCommentReplyId: commentId,
            },
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }

  // console.log(newLike);
  revalidatePath("");
};
