import { nanoid } from "nanoid";
import { db } from "../db/initDb";

export type UserSession = {
  uid: string;
  id: string;
  login_at: number;
  logout_at: number | undefined;
}

export const userSessionGet = (uid: string): UserSession[] => {
  const query = db.query(
    `SELECT * FROM user_session 
    WHERE uid = $uid;`
  );
  return query.all({ $uid: uid }) as UserSession[];
}

export const userSessionInsertLogin = (uid: string): UserSession[] => {
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
  return query.all({ $uid: uid, $id: id, $login_at: Date.now() }) as UserSession[];
}

export const userSessionInsertLogout = (uid: string): UserSession[] | void => {
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

  return query.all({ $id: lastLoginSession.id, $logout_at: Date.now() }) as UserSession[];
}