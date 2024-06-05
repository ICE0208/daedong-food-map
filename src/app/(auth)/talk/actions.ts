"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidatePath } from "next/cache";

export const submitTalkLike = async (
  talkId: number,
  prevLikeState: boolean,
) => {
  const session = await getSession();
  const user = session.user;

  if (!user) return;

  try {
    if (prevLikeState === false) {
      await db.talkLike.create({
        data: {
          talkId,
          userId: user.id,
        },
      });
    } else {
      await db.talkLike.delete({
        where: {
          userId_talkId: { userId: user.id, talkId },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  revalidatePath("");
};
