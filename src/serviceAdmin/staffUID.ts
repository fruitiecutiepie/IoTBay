import config from "../../config.json";
import { StaffUID } from "../../dataTypes";

type ReqBody = {
  uid: string;
  event: "add" | "delete";
}

/* Get's the uid from the db (probably not needed). */
export const fetchStaffUIDGet = async (uid: string): Promise<StaffUID> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/staff?uid=${uid}`);
  return await res.json();
}

/*
  Checks if the uid provided is a staff member.
  
  fetchStaffUIDAuth(uid, "Admin") to check if it is an Admin (returns true if SysAdmin aswell).
  fetchStaffUIDAuth(uid, "SysAdmin") to check if it is an SysAdmin (returns false if only an admin).

  Default SysAdmin credentials:
  email: admin@iotbay.com
  password: P@ssw0rd
*/
export const fetchStaffUIDAuth = async (uid: string, toCheck: string): Promise<boolean> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/staff?uid=${uid}&toCheck=${toCheck}`);
  return await res.json();
}

// Adds the specified uid as a staff member.
export const fetchAddStaffUID = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/staff`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "add"
    } as ReqBody),
  });
}

// Removes the specified uid from being a staff member.
export const fetchDeleteStaffUID = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/staff`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "delete"
    } as ReqBody),
  });
}
