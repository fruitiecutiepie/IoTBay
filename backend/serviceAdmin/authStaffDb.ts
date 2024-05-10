import { db } from "../db/initDb";

export const authStaffDb = () => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS staff (
      uid TEXT NOT NULL PRIMARY KEY, 
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      is_staff INTEGER NOT NULL
    );`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS staffUID (
      uid TEXT NOT NULL PRIMARY KEY,
    );`
  );
}