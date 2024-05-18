import { Database } from "bun:sqlite";

import { authInitDb } from "../serviceAuth/authInitDb";

const DB_NAME = "iotbay.db";
export const db = new Database(`./db/${DB_NAME}`);

export const initDb = (database: Database) => {
  // WAL mode is used for better performance
  database.exec(
    `PRAGMA journal_mode = WAL;`
  );

  authInitDb();
}