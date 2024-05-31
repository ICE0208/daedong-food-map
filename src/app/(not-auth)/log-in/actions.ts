"use server";

import db from "@/libs/db";
import bcrypt from "bcrypt";

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

  console.log("유저 인증 통과");

  return null;
};
