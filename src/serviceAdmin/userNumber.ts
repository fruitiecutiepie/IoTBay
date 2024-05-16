// CONTROLLER // Andrew's Code

import config from "../../config.json";
import { User, UserNumber } from "../../dataTypes";

type ReqBody = {
  uid: string;
  number: string;
  event: "add" | "delete";
}

// Gets a specified user's phone number.
export const fetchUserNumberGet = async (uid: string): Promise<UserNumber> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/number?uid=${uid}`);
  return await res.json();
}


// Gets every user's phone number.
export const fetchUserNumberGetAll = async (): Promise<UserNumber[]> => {
    const res = await fetch(`http://localhost:${config.serverPort}/auth/number`);
    const v = await res.json() as UserNumber[];
    return v;
  }

// Add's a phone number to the database.
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

// Deletes a user's phone number from the database.
export const fetchDeleteUserNumber = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/number`, {
    method: 'POST',
    body: JSON.stringify({
      uid,
      event: "delete"
    } as ReqBody),
  });
}
