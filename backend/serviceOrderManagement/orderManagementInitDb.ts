import { db } from '../db/initDb';

export const OrderManagementModuleinitDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      orderId TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS orderItems (
      itemId TEXT PRIMARY KEY,
      orderId TEXT NOT NULL,
      productId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL,
      FOREIGN KEY (orderId) REFERENCES orders(orderId)
    );
  `);

  db.exec(`
    INSERT INTO orders (orderId, userId, status, createdAt, updatedAt)
    VALUES ('123', '123', 'saved', '2023-05-04T13:00:00Z', '2023-05-06T15:00:00Z');
  `);
}

// Initialize the database
OrderManagementModuleinitDb();
