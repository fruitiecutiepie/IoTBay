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
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS orderItems (
      itemId TEXT PRIMARY KEY,
      orderId TEXT NOT NULL,
      productId TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price INTEGER NOT NULL
    );
  `)

  db.exec(`
  INSERT OR REPLACE INTO orders (orderId, userId, status, createdAt, updatedAt)
  VALUES 
  ('123', '123', 'saved', '2023-05-04T13:00:00Z', '2023-05-06T15:00:00Z'),
  ('832', '233', 'saved', '2023-05-04T13:00:00Z', '2023-05-06T15:00:00Z'),
  ('013', '133', 'saved', '2023-05-04T13:00:00Z', '2023-05-06T15:00:00Z'),
  ('981', '342', 'saved', '2023-05-05T10:00:00Z', '2023-05-07T12:00:00Z'),
  ('029', '453', 'saved', '2023-05-06T09:00:00Z', '2023-05-08T11:00:00Z'),
  ('158', '564', 'saved', '2023-05-07T08:00:00Z', '2023-05-09T10:00:00Z'),
  ('367', '675', 'saved', '2023-05-08T07:00:00Z', '2023-05-10T09:00:00Z'),
  ('476', '786', 'saved', '2023-05-09T06:00:00Z', '2023-05-11T08:00:00Z'),
  ('585', '897', 'saved', '2023-05-10T05:00:00Z', '2023-05-12T07:00:00Z'),
  ('694', '908', 'saved', '2023-05-11T04:00:00Z', '2023-05-13T06:00:00Z'),
  ('703', '019', 'saved', '2023-05-12T03:00:00Z', '2023-05-14T05:00:00Z'),
  ('812', '120', 'saved', '2023-05-13T02:00:00Z', '2023-05-15T04:00:00Z'),
  ('921', '231', 'saved', '2023-05-14T01:00:00Z', '2023-05-16T03:00:00Z'),
  ('032', '342', 'saved', '2023-05-15T00:00:00Z', '2023-05-17T02:00:00Z'),
  ('143', '453', 'saved', '2023-05-16T23:00:00Z', '2023-05-18T01:00:00Z'),
  ('254', '564', 'saved', '2023-05-17T22:00:00Z', '2023-05-19T00:00:00Z'),
  ('365', '675', 'saved', '2023-05-18T21:00:00Z', '2023-05-20T23:00:00Z'),
  ('476', '786', 'saved', '2023-05-19T20:00:00Z', '2023-05-21T22:00:00Z'),
  ('587', '897', 'saved', '2023-05-20T19:00:00Z', '2023-05-22T21:00:00Z'),
  ('698', '908', 'saved', '2023-05-21T18:00:00Z', '2023-05-23T20:00:00Z'),
  ('809', '019', 'saved', '2023-05-22T17:00:00Z', '2023-05-24T19:00:00Z'),
  ('910', '120', 'saved', '2023-05-23T16:00:00Z', '2023-05-25T18:00:00Z'),
  ('021', '231', 'saved', '2023-05-24T15:00:00Z', '2023-05-26T17:00:00Z');
  `)
}

