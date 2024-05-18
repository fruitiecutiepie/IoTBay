import { db } from "../../db/initDb";

export type User = {
  uid: string;
  name: string;
  email: string;
  email_verified: number;
}

export const authUserGet = (): User | undefined => {
  const query = db.query(
    `SELECT * FROM user;`
  );
  return query.get() as User | undefined;
}

export const authUserInsertOrUpdate = (user: User): undefined => {
  const query = db.query(
    `INSERT OR REPLACE INTO user (
      uid,
      name,
      email,
      email_verified
    ) VALUES (
      $uid, $name, $email, $email_verified
    );`
  );
  query.run({
    $uid: user.uid,
    $name: user.name,
    $email: user.email,
    $email_verified: user.email_verified,
  });
}

export const authUserDelete = (): void => {
  const query = db.query(
    `DELETE FROM user;`
  );
  query.run();
}