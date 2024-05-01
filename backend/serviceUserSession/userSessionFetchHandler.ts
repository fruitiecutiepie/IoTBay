import { FetchHandler } from "..";
import { userSessionInsertLogin, userSessionInsertLogout, userSessionGet } from "./userSessionModel";

type UserSessionReqBody = {
  uid: string;
  event: "login" | "logout";
}

export const userSessionFetchHandler: FetchHandler = {
  "/user_sessions": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      const uid = url.searchParams.get("uid");
      if (!uid) {
        console.error(`/user_sessions: uid is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        )
      }
      const userSessions = userSessionGet(uid);
      
      return Promise.resolve(
        new Response(JSON.stringify(userSessions), { status: 200, headers })
      );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as UserSessionReqBody;
      const uid = reqBody.uid;
      
      if (reqBody.event === "login") {
        userSessionInsertLogin(uid);
      } else if (reqBody.event === "logout") {
        userSessionInsertLogout(uid);
      }

      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}