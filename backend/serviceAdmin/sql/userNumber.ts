import { db } from "../../db/initDb";

export type UserNumber = {
    uid: string;
    number: string;
}

export const userNumberGet = (uid: string): UserNumber => {
    const q = db.query(
        'SELECT * FROM staffUID WHERE uid = $uid;'
        );
    return q.get() as UserNumber;
}

export const userNumberGetAll = (): UserNumber[] => {
    const q = db.query(
        'SELECT * FROM staffUID WHERE uid = $uid;'
        );
    return q.all() as UserNumber[];
}

export const userNumberInsertOrUpdate = (uid: string, number: string): UserNumber => {
    const q = db.query(
        `INSERT OR REPLACE INTO staffUID (
            uid
            number
          ) VALUES (
            $uid
            $number
          );`
    );

    return q.get({ $uid: uid, $number: number }) as UserNumber;
}

export const userNumberDelete = (uid: string): void => {
    const q = db.query('DELETE FROM userNumber WHERE uid = $uid;');
    q.run();
}