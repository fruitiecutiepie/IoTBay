import { FetchHandler } from "../..";
import { userNumberGet, userNumberGetAll, userNumberDelete, userNumberInsertOrUpdate, UserNumber } from "../sql/userNumber";

type ReqBody = {
    uid: string;
    number: string
    event: "add" | "delete";
}

export const userNumberFetchHandler: FetchHandler = {
    "/auth/number": {
      GET: async (req: Request, headers: Headers) => {
        const url = new URL(req.url);
        const uid = url.searchParams.get("uid");

        if (!uid) {
          return Promise.resolve(
            new Response(JSON.stringify(userNumberGetAll()), { status: 200, headers })
          )
        };

        return Promise.resolve(
          new Response(JSON.stringify(userNumberGet(uid)), { status: 200, headers })
        );
      },
      POST: async (req: Request, headers: Headers) => {
        const reqBody = await req.json() as ReqBody;
        
        if (reqBody.event === "add") {
          userNumberInsertOrUpdate(reqBody.uid, reqBody.number);
        }
        else if (reqBody.event === "delete") {
          userNumberDelete(reqBody.uid)
        } 
  
        return Promise.resolve(
          new Response(undefined, { status: 200, headers })
        );
      }
    }
  }