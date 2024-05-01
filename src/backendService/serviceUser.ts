import config from "../../config.json";
import { UserSession } from "../../dataTypes";

type UserSessionReqBody = {
  uid: string;
  event: "login" | "logout";
}

export const fetchUserSessionGet = async (uid: string): Promise<UserSession> => {
  const res = await fetch(`http://localhost:${config.serverPort}/user_sessions?uid=${uid}`);
  return await res.json();
}

export const fetchUserSessionInsertLogin = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/user_sessions`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "login"
    } as UserSessionReqBody),
  });
}

export const fetchUserSessionInsertLogout = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/user_sessions`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "logout"
    } as UserSessionReqBody),
  });
}