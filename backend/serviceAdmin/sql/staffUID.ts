import { db } from "../../db/initDb";

export type StaffUID = {
    uid: string;
}

export const staffUIDGet = (uid: string): StaffUID => {
    const q = db.query('SELECT * FROM staffUID WHERE uid = ?').all(uid);
    return q[0] as StaffUID;
}

export const staffUIDInsertOrUpdate = (uid: string): StaffUID => {
    const q = db.query(
        `INSERT OR REPLACE INTO staffUID (
            uid
          ) VALUES (
            $uid
          );`
    );

    return q.get({ $uid: uid }) as StaffUID;
}

export const staffUIDDelete = (uid: string): void => {
    const q = db.query('DELETE FROM staffUID WHERE uid = ?').run(uid);
}

export const checkUID = (uid: string): boolean => {
    if (checkSysAdminUID(uid) || staffUIDGet(uid))
        return true;

    return false;
}

export const checkSysAdminUID = (uid: string): boolean => {
    return uid === "4hIPub0rJMQnTxWITCNFgC8ZGz63";
}
