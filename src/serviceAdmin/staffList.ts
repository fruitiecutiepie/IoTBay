// CONTROLLER // Andrew's Code

import config from "../../config.json";
import { User } from "../../dataTypes";

// This object should be the same as the object in /backend/serviceAdmin/fetchHandlers/staffList.ts
// It contains all the information that might be sent to the server.
type ReqBody = {
  uid: string | undefined;
  user: User | undefined;
  ps: string | undefined;
  disable: boolean | undefined;
  event: "add" | "delete" | "update" | "disable"; // To specify the intended operation of the POST request.
}

// Get's a list of every user.
export const fetchUserList = async (filter: string): Promise<User[]> => {
  // This is how to connect to the backend/database from the frontent.
  // Functions and files cannot be directly reference between /backend and /src.
  const res = await fetch(`http://localhost:${config.serverPort}/auth/fb?filter=${filter}`);
  return await res.json();
}

// Returns true if a user is disabled or false if they are not.
export const fetchIsUserDisabled = async (uid: string): Promise<boolean> => {
  if (!uid) // Comprehensive error handling due to frequent errors.
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
      throw error;
    }
}

// Deletes a user from firebase.
export const fetchDeleteUser = async (uid: string): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/fb`, {
    method: 'POST',
    body: JSON.stringify({
      uid: uid,
      event: "delete"
    } as ReqBody)
  });
}

// Add's a user to firebase. Having the password in plaintext here is extremely bad, especially since it is sent via HTTP.
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

// Updates a user's information in firebase.
export const fetchUpdateUser = async (user: User): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/fb`, {
    method: 'POST',
    body: JSON.stringify({
      user: user,
      event: "update"
    } as ReqBody)
  });
}

// Disables the specified user if disable is 'true' and enables the user if disable if 'false'.
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