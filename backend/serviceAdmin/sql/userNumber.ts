// MODEL // Andrew's Code

import { db } from "../../db/initDb";

// An object to store a user's phone number.
export type UserNumber = {
    uid: string;
    number: string;
}

// Gets a specific user's phone number.
export const userNumberGet = (uid: string): UserNumber => {
    const q = db.query('SELECT * FROM userNumber WHERE uid = ?').all(uid);
    return q[0] as UserNumber;
}

// Gets every phone number in the database.
export const userNumberGetAll = (): UserNumber[] => {
    const q = db.query(
        'SELECT * FROM userNumber;'
        );
    
    return q.all() as UserNumber[];
}

// Adds a new phone number or replaces an existing one.
export const userNumberInsertOrUpdate = (uid: string, number: string): UserNumber => {
    const q = db.query(
        `INSERT OR REPLACE INTO userNumber (
            uid,
            number
          ) VALUES (
            $uid,
            $number
          );`
    );

    return q.get({ $uid: uid, $number: number }) as UserNumber;
}

// Deletes a phone number from the database.
export const userNumberDelete = (uid: string): void => {
    const q = db.query('DELETE FROM userNumber WHERE uid = $uid;');
    q.run();
}