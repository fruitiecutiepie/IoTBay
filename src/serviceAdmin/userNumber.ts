import config from "../../config.json";
import { UserNumber } from "../../dataTypes";

type ReqBody = {
  uid: string;
  number: string;
  event: "add" | "delete";
}

export const fetchUserNumberGet = async (uid: string): Promise<UserNumber> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/number?uid=${uid}`);
  return await res.json();
}

export const fetchUserNumberGetAll = async (): Promise<UserNumber[]> => {
    const res = await fetch(`http://localhost:${config.serverPort}/auth/number`);
    return await res.json();
  }

export const fetchAddUserNumber = async (uid: string, number: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/number`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      number,
      event: "add"
    } as ReqBody),
  });
}

export const fetchDeleteUserNumber = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/number`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "delete"
    } as ReqBody),
  });
}
