import { FetchHandler } from "../..";
import { getAllUsers } from "../../common/firebaseAdminInit";
import { User } from "../../serviceAuth/sql/authUser";
import { checkUID } from "../sql/staffUID";
  
export const userListFetchHandler: FetchHandler = {
  "/auth/fb": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);
      const filter = url.searchParams.get("filter");

      const allUsers = await getAllUsers();

      if (!filter) {
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }

      if (filter === "staff") {
        return Promise.resolve(
          new Response(JSON.stringify(filterStaff(allUsers)), { status: 200, headers })
        );
      }
      else {
        return Promise.resolve(
          new Response(undefined, { status: 400, headers })
        );
      }
    }
  }
}

const filterStaff = (users: User[]): User[] => {
  var staffList: User[] = new Array;
  users.forEach(user => {
    if (checkUID(user.uid))
      staffList.push(user);
  });

  return staffList;
}