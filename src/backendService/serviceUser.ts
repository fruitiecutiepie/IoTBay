import { SERVER_PORT } from "../../backend";
import { UserSession } from "../../backend/serviceUserSession/userSessionModel";
import { UserSessionReqBody } from "../../backend/serviceUserSession/userSessionFetchHandler";

export const fetchUserSessionGet = async (uid: string): Promise<UserSession> => {
  const res = await fetch(`http://localhost:${SERVER_PORT}/user_sessions?uid=${uid}`);
  return await res.json();
}

export const fetchUserSessionInsertLogin = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${SERVER_PORT}/user_sessions`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "login"
    } as UserSessionReqBody),
  });
}

export const fetchUserSessionInsertLogout = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${SERVER_PORT}/user_sessions`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "logout"
    } as UserSessionReqBody),
  });
}