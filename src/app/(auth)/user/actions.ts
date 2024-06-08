"use server";

import getSession from "@/libs/session";
import { redirect } from "next/navigation";

export const actionLogout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
