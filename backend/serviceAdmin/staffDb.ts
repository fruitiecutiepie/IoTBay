import { db } from "../db/initDb";

export const staffDb = () => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS staffUID (
      uid TEXT NOT NULL PRIMARY KEY
    );`
  );
}