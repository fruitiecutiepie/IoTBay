import config from "../../config.json";
import { User } from "../../dataTypes";

type ReqBody = {
  user: User | undefined;
}

export const fetchAuthUserGet = async (): Promise<User> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/user`);
  return await res.json();
}

export const fetchAuthUserInsertOrUpdate = async (user: User): Promise<User> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/user`, {
    method: 'POST',
    body: JSON.stringify({
      user
    } as ReqBody),
  });
  return await res.json();
}

export const fetchAuthUserDelete= async (): Promise<void> => {
  await fetch(`http://localhost:${config.serverPort}/auth/user`, {
    method: 'POST',
    body: JSON.stringify({
      user: undefined
    } as ReqBody),
  });
}