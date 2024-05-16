import config from "../../config.json";
import { User } from "../../dataTypes";

type ReqBody = {
  uid: string | undefined;
  user: User | undefined;
  ps: string | undefined;
  disable: boolean | undefined;
  event: "add" | "delete" | "update" | "disable";
}


export const fetchUserList = async (filter: string): Promise<User[]> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/fb?filter=${filter}`);
  return await res.json();
}

export const fetchIsUserDisabled = async (uid: string): Promise<boolean> => {
  if (!uid)
    console.log("UID is null");
    try {
      const response = await fetch(`http://localhost:${config.serverPort}/auth/fb?getDisabled=${uid}`);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user disabled status:", error);
      throw error; // Rethrow or handle error as needed
    }
}

export const fetchDeleteUser = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/fb`, {
    method: 'POST',
    body: JSON.stringify({
      uid: uid,
      event: "delete"
    } as ReqBody)
  });
}

export const fetchAddUser = async (user: User, password: string): Promise<string> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/fb`, {
    method: 'POST',
    body: JSON.stringify({
      uid: undefined,
      user: user,
      ps: password,
      event: "add"
    } as ReqBody)
  });

  return await res.text();
}

export const fetchUpdateUser = async (user: User): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/fb`, {
    method: 'POST',
    body: JSON.stringify({
      user: user,
      event: "update"
    } as ReqBody)
  });
}

export const fetchDisableUser = async (uid: string, disable: boolean): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/fb`, {
    method: 'POST',
    body: JSON.stringify({
      uid: uid,
      disable: disable,
      event: "disable"
    } as ReqBody)
  });
}