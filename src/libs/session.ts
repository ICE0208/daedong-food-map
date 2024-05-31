import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  user: {
    id: string;
    nickname: string;
  };
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: process.env.COOKIE_NAME!,
    password: process.env.COOKIE_PASSWORD!,
  });
}
