import { Database } from "bun:sqlite";

const DB_NAME = "iotbay.db";
export const db = new Database(`./db/${DB_NAME}`);

export const initDb = () => {
  // WAL mode is used for better performance
  db.exec(
    `PRAGMA journal_mode = WAL;`
  );
  
  // Commented out because Firebase Auth is used
  // db.exec(
  //   `CREATE TABLE IF NOT EXISTS user (
  //     uid TEXT NOT NULL PRIMARY KEY, 
  //     name TEXT NOT NULL,
  //     email TEXT NOT NULL UNIQUE, 
  //     password TEXT NOT NULL
  //   );`
  // );
  db.exec(
    `CREATE TABLE IF NOT EXISTS user_session (
      uid TEXT NOT NULL,

      id TEXT NOT NULL PRIMARY KEY,
      login_at INTEGER NOT NULL,
      logout_at INTEGER,
      FOREIGN KEY (uid) REFERENCES user (uid)
    );`
  )
}