// MODEL // Andrew's Code

// This file contains all the functions required to manipulate firebase,

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
        userList.forEach(user => { // FireBase's UserRecord is converted into our implementation of Users here.
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

// Deletes the specified user's account from FireBase.
export async function deleteUser(uid: string): Promise<void> {
    console.error("Working");
    await admin.auth().deleteUser(uid).then(() => {
        console.error('Successfully deleted user');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
}

// Adds a new user to FireBase and returns their UID. The use of a password in plaintext here is very bad.
export async function addUser(user: User, ps: string): Promise<string> {
    const newUser = await admin.auth().createUser({
        displayName: user.name,
        email: user.email,
        emailVerified: true,
        password: ps,
        disabled: false
    });

    return newUser.uid;
}

// Updates a user's information in FireBase.
export async function updateUser(user: User): Promise<UserRecord> {
    console.error("Updating user with uid: " + user.uid);
    return await admin.auth().updateUser(user.uid, {
        displayName: user.name,
        email: user.email,
        emailVerified: user.email_verified,
    });
}

// Disables a user in firebase.
export async function userDisabled(uid: string, disable: boolean): Promise<void> {
    await admin.auth().updateUser(uid, {
        disabled: disable
    });
}

// Returns if the specified user is disabled or not.
export async function isUserDisabled(uid: string): Promise<Boolean> {
    var isDisable = (await admin.auth().getUser(uid)).disabled;
    if (isDisable) {
        //console.error('User is Disabled');
    }
    else {
        //console.error('User is Enabled');
    }
    
    return isDisable;
}