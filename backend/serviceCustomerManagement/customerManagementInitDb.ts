import { db } from "../db/initDb";

export function initCustomerManagementDb() {
    const sql = `
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `;
    db.run(sql);
  }