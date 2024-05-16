import { db } from "../db/initDb";

export const authInitDb = () => {
  // Singleton table
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
  // Insert some dummy data
  db.exec(
    `INSERT OR REPLACE INTO user_session (
      uid, id, login_at, logout_at
    ) VALUES
      ('1', '1', 1620000000, 1620000000),
      ('2', '2', 1620000000, 1620000000),
      ('3', '3', 1620000000, 1620000000),
      ('4', '4', 1620000000, 1620000000),
      ('5', '5', 1620000000, 1620000000),
      ('6', '6', 1620000000, 1620000000),
      ('7', '7', 1620000000, 1620000000),
      ('8', '8', 1620000000, 1620000000),
      ('9', '9', 1620000000, 1620000000),
      ('10', '10', 1620000000, 1620000000),
      ('11', '11', 1620000000, 1620000000),
      ('12', '12', 1620000000, 1620000000),
      ('13', '13', 1620000000, 1620000000),
      ('14', '14', 1620000000, 1620000000),
      ('15', '15', 1620000000, 1620000000),
      ('16', '16', 1620000000, 1620000000),
      ('17', '17', 1620000000, 1620000000),
      ('18', '18', 1620000000, 1620000000),
      ('19', '19', 1620000000, 1620000000),
      ('20', '20', 1620000000, 1620000000)
    ;`
  )
}