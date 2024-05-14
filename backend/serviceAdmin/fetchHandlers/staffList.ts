import { FetchHandler } from "../..";
import { getAllUsers } from "../../common/firebaseAdminInit";
import { User } from "../../serviceAuth/sql/authUser";
import { checkSysAdminUID, checkUID } from "../sql/staffUID";
  
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
      else if (filter === "customer") {
        return Promise.resolve(
          new Response(JSON.stringify(filterCustomer(allUsers)), { status: 200, headers })
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
    if (checkUID(user.uid) && !checkSysAdminUID(user.uid)) // The sysadmin account should not be so visible.
      staffList.push(user);
  });

  return staffList;
}

const filterCustomer = (users: User[]): User[] => {
  var customerList: User[] = new Array;
  users.forEach(user => {
    if (!checkUID(user.uid) && !checkSysAdminUID(user.uid))
      customerList.push(user);
  });

  return customerList;
}