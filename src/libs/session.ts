import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionUser {
  id: string;
  nickname: string;
}

export interface SessionContent {
  user: SessionUser | null | undefined;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: process.env.COOKIE_NAME!,
    password: process.env.COOKIE_PASSWORD!,
  });
}
