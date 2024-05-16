// CONTROLLER // Andrew's Code

import { FetchHandler } from "../..";
import { addUser, deleteUser, getAllUsers, isUserDisabled, updateUser, userDisabled } from "../../common/firebaseAdminInit";
import { User } from "../../serviceAuth/sql/authUser";
import { checkSysAdminUID, checkUID } from "../sql/staffUID";

// An object to hold the information that may be received from the POST method in fetch requests.
type ReqBody = {
  uid: string | undefined;
  user: User | undefined;
  ps: string | undefined;
  disable: boolean | undefined;
  event: "add" | "delete" | "update" | "disable"; // The client can specify and event in the POST requests.
}

export const userListFetchHandler: FetchHandler = {
  "/auth/fb": {
    GET: async (req: Request, headers: Headers) => {
      const url = new URL(req.url);

      // Searches for ?filter="filter" or ?getDisabled="uid" in the url so the client can pass some information in their GET requests.
      const filter = url.searchParams.get("filter");
      const getDisabled = url.searchParams.get("getDisabled");

      const allUsers = await getAllUsers();


      if (filter) { 
        if (filter === "staff") { // Return an array of all users who are staff members.
          return Promise.resolve(
            new Response(JSON.stringify(filterStaff(allUsers)), { status: 200, headers })
          );
        }
        else if (filter === "customer") {  // Return an array of all users who are not staff members.
          return Promise.resolve(
            new Response(JSON.stringify(filterCustomer(allUsers)), { status: 200, headers })
          );
        }
      }

      // Return true or false depending on if the account pertaining to the specified uid is enabled or disabled respectively.
      if (getDisabled) {
        var isDisabled = await isUserDisabled(getDisabled);
        return Promise.resolve(
          new Response(JSON.stringify(isDisabled), { status: 200, headers })
        );
      }

      // Return undefined if the GET request is empty.
      return Promise.resolve(
        new Response(undefined, { status: 400, headers })
      );
    },
    POST: async (req: Request, headers: Headers) => {
      const reqBody = await req.json() as ReqBody; // Information from the client in the form of type 'ReqBody'.
      const event = reqBody.event;

      // Each event corresponds to their model function.
      // Each parameter in the model functions cannot be null or undefined, so we check those here aswell.
      if (event === "add" && reqBody.user && reqBody.ps) {
        const uid = await addUser(reqBody.user, reqBody.ps);
        return Promise.resolve(
          new Response(uid, { status: 200, headers })
        );
      }
      else if (event === "delete" && reqBody.uid) {
        console.error("Deleting user.");
        deleteUser(reqBody.uid);
        return Promise.resolve(
          new Response(undefined, { status: 200, headers })
        );
      }
      else if (event === "update" && reqBody.user) {
        console.error("Sending update request to model");
        return Promise.resolve(
          new Response(JSON.stringify(updateUser(reqBody.user)), { status: 200, headers })
        );
      }
      else if (event === "disable" && reqBody.uid && reqBody.disable != undefined) {
        return Promise.resolve(
          new Response(JSON.stringify(userDisabled(reqBody.uid, reqBody.disable)), { status: 200, headers })
        );
      }

      return Promise.resolve(
        new Response(undefined, { status: 200, headers })
      );
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