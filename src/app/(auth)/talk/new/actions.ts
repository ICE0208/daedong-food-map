"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const submitNewTalk = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const session = await getSession();
  const user = session.user;

  if (!user) redirect("/talk");

  const newTalk = await db.talk.create({
    data: {
      content,
      userId: user.id,
    },
  });

  console.log(newTalk);
  console.log("새로운 잡담이 생성됨");
  redirect("/talk");
};
