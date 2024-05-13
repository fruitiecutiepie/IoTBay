import config from "../../config.json";
import { User } from "../../dataTypes";

export const fetchUserList = async (filter: string): Promise<User[]> => {
  const res = await fetch(`http://localhost:${config.serverPort}/auth/fb?filter=${filter}`);
  return await res.json();
}
