import { db } from "../../db/initDb";

export type Staff = {
    uid: string;
    name: string;
    email: string;
    is_staff: boolean;
    is_sysadmin: boolean;
}

type StaffUID = {
    uid: string;
}

export const authStaffGet = (): Staff => {
    const q = db.query('SELECT * FROM staff');
    var staff: Staff = q.get() as Staff;
    staff.is_sysadmin = authSysAdminUID(staff.uid);
    if (!staff.is_sysadmin) {
        staff.is_staff = authStaffUID(staff.uid);
    }
    else {
        staff.is_staff = true;
    }
    
    return staff;
}
/*
export const makeStaffInstance = (uid: string, name: string, email: string): Staff => {
    var staff: Staff = {
        uid: uid,
        name: name,
        email: email,
        is_staff: true,
        is_sysadmin: false
    };
    return staff;
}
*/
export const authStaffInsertOrUpdate = (staff: Staff): Staff => {
    const q = db.query(
        `INSERT OR REPLACE INTO staff (
            uid,
            name,
            email,
            is_staff
          ) VALUES (
            $uid, $name, $email, $is_staff
          );`
    );

    return q.get({
        $uid: staff.uid,
        $name: staff.name,
        $email: staff.email,
        $is_staff: staff.is_staff
    }) as Staff;
}

export const authStaffDelete = (): void => {
    const q = db.query('DELETE FROM staff;');
    q.run();
}

const authStaffUID = (uid: String): boolean => {
    const q = db.query('SELECT * from staffUID');
    var allUIDs = q.all();
    allUIDs.forEach(id => {
        if (uid == id)
            return true;
    });

    return false;
}

const authSysAdminUID = (uid: String): boolean => {
    return uid == "BT1CYU3FhSMON2vjT1JX7N3njpx2";
}
