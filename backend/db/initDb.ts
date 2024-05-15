import { Database } from "bun:sqlite";

import { authInitDb } from "../serviceAuth/authInitDb";
import { PaymentsmoduleInitDb} from "../servicePayments/PaymentsmoduleInitDb";


const DB_NAME = "iotbay.db";
export const db = new Database(`./db/${DB_NAME}`);

export const initDb = () => {
  // WAL mode is used for better performance
  db.exec(
    `PRAGMA journal_mode = WAL;`
  );

  authInitDb();
  PaymentsmoduleInitDb();
}