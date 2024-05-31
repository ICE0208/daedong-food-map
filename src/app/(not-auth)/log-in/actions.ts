"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

interface LoginActionFormData {
  id: string;
  password: string;
}

type FormState = { errorMsg: String } | null;

export const loginAction = async (
  formState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const data: LoginActionFormData = {
    id: formData.get("id") as string,
    password: formData.get("password") as string,
  };

  const user = await db.user.findUnique({
    where: {
      userId: data.id,
    },
    select: {
      id: true,
      nickname: true,
      password: true,
    },
  });

  if (!user) {
    return {
      errorMsg: "해당 유저가 존재하지 않습니다.",
    };
  }

  const passwordOk = await bcrypt.compare(data.password, user.password);

  if (!passwordOk) {
    return {
      errorMsg: "비밀번호가 일치하지 않습니다.",
    };
  }

  // 유저 인증 성공
  const session = await getSession();
  session.user = {
    id: user.id,
    nickname: user.nickname,
  };
  await session.save();
  return redirect("/");
};
