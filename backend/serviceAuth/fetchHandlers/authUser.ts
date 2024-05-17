import { FetchHandler } from "../..";
import { User, authUserDelete, authUserGet, authUserInsertOrUpdate } from "../sql/authUser";

type ReqBody = {
  user: User | undefined;
}

export const authUserFetchHandler: FetchHandler = {
  "/auth/user": {
    GET: async (req: Request, headers: Headers) => {
      const user = authUserGet();
      return Promise.resolve(
        new Response(JSON.stringify(user), { status: 200, headers })
      );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.user) {
        authUserDelete();
        return Promise.resolve(
          new Response(undefined, { status: 200, headers })
        );
      }
      const user = authUserInsertOrUpdate(reqBody.user);
      return Promise.resolve(
        new Response(JSON.stringify(user), { status: 200, headers })
      );
    }
  }
}