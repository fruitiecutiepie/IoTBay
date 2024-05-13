// backend/serviceCustomerManagement/customerManagementInitDb.ts
import { db } from '../db/initDb';

export const initCustomerManagementDb = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            type TEXT NOT NULL CHECK(type IN ('company', 'individual')),
            address TEXT NOT NULL,
            status BOOLEAN NOT NULL DEFAULT true
        );
    `);
};

