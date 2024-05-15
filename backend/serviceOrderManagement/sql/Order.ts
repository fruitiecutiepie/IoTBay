import { db } from "../../db/initDb"

export type Order = {
    id: string;
    userId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
  