"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidatePath } from "next/cache";

export const submitReviewLike = async (
  reviewId: number,
  prevLikeState: boolean,
) => {
  const session = await getSession();
  const user = session.user;
  if (!user) return;

  try {
    if (prevLikeState === false) {
      await db.reviewLike.create({
        data: {
          reviewId,
          userId: user.id,
        },
      });
    } else {
      await db.reviewLike.delete({
        where: {
          userId_reviewId: { userId: user.id, reviewId },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("");
};
