import { db } from "../db/initDb";

export const authInit = () => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS user (
      uid TEXT NOT NULL PRIMARY KEY, 
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      email_verified INTEGER NOT NULL
    );`
  );
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