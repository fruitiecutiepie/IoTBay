import { FetchHandler } from "../..";
import { authUserSessionInsertLogin, authUserSessionInsertLogout, authUserSessionGet } from "../sql/authUserSession";

type ReqBody = {
  uid: string;
  event: "login" | "logout";
}

export const authUserSessionFetchHandler: FetchHandler = {
  "/auth/user_sessions": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      const uid = url.searchParams.get("uid");
      if (!uid) {
        console.error(`/auth/user_sessions: uid is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        )
      }
      const userSessions = authUserSessionGet(uid);
      
      return Promise.resolve(
        new Response(JSON.stringify(userSessions), { status: 200, headers })
      );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      const uid = reqBody.uid;
      if (!uid) {
        console.error(`/auth/user_sessions: uid is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        )
      }
      const event = reqBody.event;
      if (event !== "login" && event !== "logout") {
        console.error(`/auth/user_sessions: event must be "login" or "logout"`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        )
      }
      
      if (event === "login") {
        authUserSessionInsertLogin(uid);
      } else if (event === "logout") {
        authUserSessionInsertLogout(uid);
      }

      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}