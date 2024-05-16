// MODEL // Andrew's Code

import { db } from "../../db/initDb";

// An object to store the uid of a staff member.
export type StaffUID = {
    uid: string;
}

// Get's the uid of a staff member if it exists.
export const staffUIDGet = (uid: string): StaffUID => {
    const q = db.query('SELECT * FROM staffUID WHERE uid = ?').all(uid);
    return q[0] as StaffUID;
}

// Adds a uid to the staff member database.
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

// Deletes a staff member with uid 'uid' from the database.
export const staffUIDDelete = (uid: string): void => {
    const q = db.query('DELETE FROM staffUID WHERE uid = ?').run(uid);
}

// Returns true if the uid corresponds with an admin or sysadmin.
export const checkUID = (uid: string): boolean => {
    if (checkSysAdminUID(uid) || staffUIDGet(uid))
        return true;

    return false;
}

// Returns true if the uid corresponds only a sysadmin (Hardcoded uid).
export const checkSysAdminUID = (uid: string): boolean => {
    return uid === "4hIPub0rJMQnTxWITCNFgC8ZGz63";
}
