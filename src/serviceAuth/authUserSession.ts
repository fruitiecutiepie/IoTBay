import config from "../../config.json";
import { UserSession } from "../../dataTypes";

type ReqBody = {
  uid: string;
  event: "login" | "logout";
}

export const fetchAuthUserSessionGet = async (uid: string): Promise<UserSession> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/user_sessions?uid=${uid}`);
  return await res.json();
}

export const fetchAuthUserSessionInsertLogin = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/user_sessions`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "login"
    } as ReqBody),
  });
}

export const fetchAuthUserSessionInsertLogout = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/user_sessions`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "logout"
    } as ReqBody),
  });
}