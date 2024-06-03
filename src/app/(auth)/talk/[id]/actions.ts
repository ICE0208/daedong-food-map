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
