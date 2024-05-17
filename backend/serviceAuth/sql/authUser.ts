import { db } from "../../db/initDb";

export type User = {
  uid: string;
  name: string;
  email: string;
  email_verified: boolean;
}

export const authUserGet = (): User => {
  const query = db.query(
    `SELECT * FROM user;`
  );
  return query.get() as User;
}

export const authUserInsertOrUpdate = (user: User): User => {
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
  return query.get({
    $uid: user.uid,
    $name: user.name,
    $email: user.email,
    $email_verified: user.email_verified,
  }) as User;
}

export const authUserDelete = (): void => {
  const query = db.query(
    `DELETE FROM user;`
  );
  query.run();
}