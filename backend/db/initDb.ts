import { Database } from "bun:sqlite";

import { authInit } from "../serviceAuth/authInit";

const DB_NAME = "iotbay.db";
export const db = new Database(`./db/${DB_NAME}`);

export const initDb = () => {
  // WAL mode is used for better performance
  db.exec(
    `PRAGMA journal_mode = WAL;`
  );

  authInit();
}