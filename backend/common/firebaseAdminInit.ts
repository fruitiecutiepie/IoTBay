import admin from "firebase-admin";
import serviceAccount from "../firebaseAdminConfig.json";
import { UserRecord } from "firebase-admin/auth";
import { User } from "../serviceAuth/sql/authUser";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export async function getAllUsers(): Promise<User[]> {
    try {
        const userList: UserRecord[] = (await admin.auth().listUsers()).users;
        var safeUserList: User[] = new Array;
        userList.forEach(user => {
            const safeUser: User = {
                uid: user.uid,
                name: user.displayName || "",
                email: user.email || "",
                email_verified: user.emailVerified
            };
            safeUserList.push(safeUser);
        });

        return safeUserList;
    }
    catch (error) {
        console.log("Failed to fetch users: ", error);
        return new Array;
    }
}