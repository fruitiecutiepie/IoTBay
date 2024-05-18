import { nanoid } from "nanoid";
import { db } from "../../db/initDb";

type UserSession = {
  uid: string;
  id: string;
  login_at: number;
  logout_at: number | undefined;
}

export const authUserSessionGet = (uid: string): UserSession[] => {
  const query = db.query(
    `SELECT * FROM user_session 
    WHERE uid = $uid;`
  );
  return query.all({ $uid: uid }) as UserSession[];
}

export const authUserSessionInsertLogin = (uid: string): void => {
  const id = nanoid();
  const query = db.query(
    `INSERT INTO user_session (
      uid, 
      id, 
      login_at
    ) VALUES (
      $uid, $id, $login_at
    );`
  );
  query.run({ $uid: uid, $id: id, $login_at: Date.now() });
}

export const authUserSessionInsertLogout = (uid: string): void => {
  const lastLoginSession = db.query(
    `SELECT * FROM user_session 
    WHERE uid = $uid 
    ORDER BY login_at DESC 
    LIMIT 1;`
  ).get({ $uid: uid }) as UserSession;

  if (!lastLoginSession) {
    return;
  }

  const query = db.query(
    `UPDATE user_session 
    SET logout_at = $logout_at 
    WHERE id = $id;`
  );
  query.run({ $id: lastLoginSession.id, $logout_at: Date.now() });
}