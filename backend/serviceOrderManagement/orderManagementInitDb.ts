import { db } from '../db/initDb';

export const initOrderManagementDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS orderItems (
      id TEXT PRIMARY KEY,
      orderId TEXT NOT NULL,
      productId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(id)
    )
  `);
};

db.run(`
    INSERT INTO orders (id, userId, status, createdAt, updatedAt)
    VALUES ('123', '123', 'saved', '2023-05-04T13:00:00Z', '2023-05-06T15:00:00Z');
`);