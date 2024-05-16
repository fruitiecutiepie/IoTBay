import { Database } from "bun:sqlite";

import { authInitDb } from "../serviceAuth/authInitDb";
import { staffDb } from "../serviceAdmin/staffDb.ts";
import { initCustomerManagementDb } from "../serviceCustomerManagement/customerManagementInitDb";
import { PaymentsmoduleInitDb} from "../servicePayments/PaymentsmoduleInitDb";
import { OrderManagementModuleinitDb } from "../serviceOrderManagement/orderManagementInitDb";

const DB_NAME = "iotbay.db";
export const db = new Database(`./db/${DB_NAME}`);

export const initDb = () => {
// WAL mode is used for better performance
  db.exec(
    `PRAGMA journal_mode = WAL;`
  );
  initCustomerManagementDb();
  authInitDb();
  staffDb(); // Initialise the database table related to staff.
  PaymentsmoduleInitDb();
  OrderManagementModuleinitDb();
}
