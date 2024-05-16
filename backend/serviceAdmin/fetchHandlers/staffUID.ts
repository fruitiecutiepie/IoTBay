// CONTROLLER // Andrew's Code

// This code is mostly boilerplate. Look at ./staffList.ts for comprehensive comments.

import { FetchHandler } from "../..";
import { checkUID, checkSysAdminUID, staffUIDDelete, staffUIDGet, staffUIDInsertOrUpdate } from "../sql/staffUID";

type ReqBody = {
  uid: string;
  event: "add" | "delete";
}

export const staffUIDFetchHandler: FetchHandler = {
  "/auth/staff": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      const uid = url.searchParams.get("uid");
      const toCheck = url.searchParams.get("toCheck");
      
      if (!uid) {
        console.error(`/auth/staff: uid is required`);
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        )
      }

      if (toCheck === "Admin") {
        return Promise.resolve(
          new Response(JSON.stringify(checkUID(uid)), { status: 200, headers })
        ); 
      }
      else if (toCheck === "SysAdmin") {
        return Promise.resolve(
          new Response(JSON.stringify(checkSysAdminUID(uid)), { status: 200, headers })
        ); 
      }
      else {
        const staffUID = staffUIDGet(uid);
      
        return Promise.resolve(
          new Response(JSON.stringify(staffUID), { status: 200, headers })
        );
      }
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      const uid = reqBody.uid;
      
      if (reqBody.event === "add") {
        staffUIDInsertOrUpdate(uid);
      }
      else if (reqBody.event === "delete") {
        staffUIDDelete(uid)
      } 

      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
    }
  }
}