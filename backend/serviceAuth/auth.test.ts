import Database from 'bun:sqlite';
import { expect, describe, it, beforeAll, afterAll, mock } from 'bun:test';

import { initDb } from '../db/initDb';
import { authUserFetchHandler } from './fetchHandlers/authUser';
import { authUserSessionFetchHandler } from './fetchHandlers/authUserSession';
import { User, authUserGet } from './sql/authUser';
import { authUserSessionGet } from './sql/authUserSession';

describe("serviceAuth", () => {
  let db: Database;
  
  beforeAll(() => {
    db = new Database(":memory:");
    initDb(db);
  });

  afterAll(() => {
    db.exec("DROP TABLE IF EXISTS user;");
    db.exec("DROP TABLE IF EXISTS user_session;");
    db.close();
  });
  
  let mockUser: User = {
    uid: "123",
    name: "John Doe",
    email: "john.doe@gmail.com",
    email_verified: 1
  };

  // Acceptance Test Criteria

  // As a Customer, I want to create an account, so that I can log into the system to review purchases and manage my account
  // As a Staff Member, I want to have a staff account for device collection management, so that I can efficiently manage device collection information.
  it("should create an account correctly", async () => {
    const reqUser = new Request("http://localhost/auth/user", {
      method: "POST",
      body: JSON.stringify({ user: mockUser }),
      headers: { "Content-Type": "application/json" }
    });
    const resUser = await authUserFetchHandler["/auth/user"].POST(reqUser, new Headers());
    expect(resUser.status).toBe(200);
    expect(authUserGet()).toEqual(mockUser);
  });

  // As a Customer, I want to login to my account, so that I can lodge orders and edit account information
  // As a Staff Member, I want to login to our system, so that I can conduct daily business processes and access the system
  // As a Developer, I want to provide a secure login mechanism for both staff and customers, so that only authorised individuals can access their respective accounts
  it("should handle login correctly", async () => {
    const userSession = authUserSessionGet(mockUser.uid);
    const reqUserSession = new Request("http://localhost/auth/user_sessions", {
      method: "POST",
      body: JSON.stringify({ uid: mockUser.uid, event: "login" }),
      headers: { "Content-Type": "application/json" }
    });
    const resUserSession = await authUserSessionFetchHandler["/auth/user_sessions"].POST(reqUserSession, new Headers());
    expect(resUserSession.status).toBe(200);
    expect(authUserSessionGet(mockUser.uid).length).toBe(userSession.length + 1);
    expect(authUserSessionGet(mockUser.uid)[0].login_at).not.toBeUndefined();
    expect(authUserSessionGet(mockUser.uid)[0].logout_at).toBeNull();
    expect(authUserGet()).toEqual(mockUser);
  });

  // As a Customer, I want to edit my details in my account, so that I receive information through the correct channels
  // As a Customer, I want to change my account details, so that I can update my information as needed
  // As a Staff Member, I want to change my login details, so that only I can enter my profile and use the system
  it("should change account details correctly", async () => {
    mockUser.name = "Jane van Doe";
    mockUser.email = "doe.van.jane@gmail.com";
    mockUser.email_verified = 0;

    const reqUser = new Request("http://localhost/auth/user", {
      method: "POST",
      body: JSON.stringify({ user: mockUser }),
      headers: { "Content-Type": "application/json" }
    });

    const resUser = await authUserFetchHandler["/auth/user"].POST(reqUser, new Headers());
    expect(resUser.status).toBe(200);
    expect(authUserGet()).toEqual(mockUser);
  });

  // As a Developer, I want to implement a working logout function, so that users can log out of their accounts and properly end the session
  it("should handle logout correctly", async () => {
    const userSession = authUserSessionGet(mockUser.uid);
    const reqUserSession = new Request("http://localhost/auth/user_sessions", {
      method: "POST",
      body: JSON.stringify({ uid: mockUser.uid, event: "logout" }),
      headers: { "Content-Type": "application/json" }
    });
    const resUserSession = await authUserSessionFetchHandler["/auth/user_sessions"].POST(reqUserSession, new Headers());
    expect(resUserSession.status).toBe(200);
    expect(authUserSessionGet(mockUser.uid).length).toBe(userSession.length);
    expect(authUserSessionGet(mockUser.uid)[0].login_at).not.toBeUndefined();

    const reqUserUndefined = new Request("http://localhost/auth/user", {
      method: "POST",
      body: JSON.stringify({ user: undefined }),
      headers: { "Content-Type": "application/json" }
    });
    const resUserUndefined = await authUserFetchHandler["/auth/user"].POST(reqUserUndefined, new Headers());
    expect(resUserUndefined.status).toBe(200);
    expect(authUserGet()).toBeNull();
  });

  // As a Customer, I want to delete my account, so that I can have the option to remove my account when necessary
  it("should delete account correctly", async () => {
    const userSession = authUserSessionGet(mockUser.uid);
    // Login again
    const reqUserSession = new Request("http://localhost/auth/user_sessions", {
      method: "POST",
      body: JSON.stringify({ uid: mockUser.uid, event: "login" }),
      headers: { "Content-Type": "application/json" }
    });
    const resUserSession = await authUserSessionFetchHandler["/auth/user_sessions"].POST(reqUserSession, new Headers());
    expect(resUserSession.status).toBe(200);
    expect(authUserSessionGet(mockUser.uid).length).toBe(userSession.length + 1);
    expect(authUserSessionGet(mockUser.uid)[0].login_at).not.toBeUndefined();
    expect(authUserSessionGet(mockUser.uid)[1].logout_at).toBeNull();

    const reqUser = new Request("http://localhost/auth/user", {
      method: "POST",
      body: JSON.stringify({ user: undefined }),
      headers: { "Content-Type": "application/json" }
    });

    const resUser = await authUserFetchHandler["/auth/user"].POST(reqUser, new Headers());
    expect(resUser.status).toBe(200);
    expect(authUserGet()).toBeNull();
    expect(authUserSessionGet(mockUser.uid).length).toBe(userSession.length + 1);
    expect(authUserSessionGet(mockUser.uid)[0].login_at).not.toBeUndefined();
    expect(authUserSessionGet(mockUser.uid)[1].logout_at).not.toBeUndefined();
  });

  // Not tested because requires a real fetch request
  // As a Customer, I want to verify my email address, so that I can make sure sensitive information is not sent to the wrong email
  // As a Customer, I want to recover my account, so that I can regain access in case of any forgotten credentials
});