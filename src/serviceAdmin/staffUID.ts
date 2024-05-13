import config from "../../config.json";
import { StaffUID } from "../../dataTypes";

type ReqBody = {
  uid: string;
  event: "add" | "delete";
}

export const fetchStaffUIDGet = async (uid: string): Promise<StaffUID> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/staff?uid=${uid}`);
  return await res.json();
}

export const fetchStaffUIDAuth = async (uid: string, checkSysAdmin: boolean): Promise<boolean> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/staff?uid=${uid}&checkSysAdmin=${checkSysAdmin}`);
  return await res.json();
}

export const fetchAddStaffUID = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/staff`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "add"
    } as ReqBody),
  });
}

export const fetchDeleteStaffUID = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/staff`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "delete"
    } as ReqBody),
  });
}
