import { FetchHandler } from "../..";
import { Staff, authStaffGet, authStaffInsertOrUpdate, authStaffDelete } from "../sql/authStaff";

type ReqBody = {
  staff: Staff | undefined;
}

export const authUserFetchHandler: FetchHandler = {
  "/auth/user": {
    GET: async (req: Request, headers: Headers) => {
      const staff = authStaffGet();
      return Promise.resolve(
        new Response(JSON.stringify(staff), { status: 200, headers })
      );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody;
      if (!reqBody.staff) {
        authStaffDelete();
        return Promise.resolve(
          new Response(undefined, { status: 200, headers })
        );
      }
      const user = authStaffInsertOrUpdate(reqBody.staff);
      return Promise.resolve(
        new Response(JSON.stringify(user), { status: 200, headers })
      );
    }
  }
}