import { db } from "../../db/initDb";

export type StaffUID = {
    uid: string;
}

export const staffUIDGet = (uid: string): StaffUID => {
    const q = db.query(
        'SELECT * FROM staffUID WHERE uid = $uid;'
        );
    return q.get() as StaffUID;
}

export const staffUIDInsertOrUpdate = (uid: string): StaffUID => {
    var staffUID: StaffUID = {uid}
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
    const q = db.query('DELETE FROM staffUID WHERE uid = $uid;');
    q.run();
}

export const checkUID = (uid: string): boolean => {
    if (checkSysAdminUID(uid) || staffUIDGet(uid))
        return true;

    return false;
}

export const checkSysAdminUID = (uid: string): boolean => {
    return uid === "BT1CYU3FhSMON2vjT1JX7N3njpx2";
}
