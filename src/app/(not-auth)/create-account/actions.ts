"use server";

import db from "@/libs/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

interface CreateAccountFormData {
  id: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  address: string;
}

type FormState = { errorMsg: String } | null;

export const createAccount = async (
  formState: FormState,
  formData: FormData,
) => {
  const data: CreateAccountFormData = {
    id: formData.get("id") as string,
    email: formData.get("email") as string,
    nickname: formData.get("nickname") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    gender: formData.get("languages") as string,
    age: Number(formData.get("age")),
    address: formData.get("address") as string,
  };

  console.log(data.password !== data.confirmPassword);
  if (data.password !== data.confirmPassword) {
    return { errorMsg: "비밀번호가 일치하지 않습니다." };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  try {
    const user = await db.user.create({
      data: {
        userId: data.id,
        email: data.email,
        nickname: data.nickname,
        password: hashedPassword,
        gender: data.gender === "남자" ? "MALE" : "FEMALE",
        age: data.age,
        address: data.address,
      },
    });
    console.log("유저 생성 성공");
    console.log(user);
  } catch (error) {
    if (error instanceof Error) {
      return { errorMsg: error.message };
    }
    return { errorMsg: "요청중에 에러가 발생했습니다." };
  }

  return redirect("/log-in");
};
