import { db } from "../../db/initDb"

export type Order = {
    orderId: string;
    userId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }

  export const OrderGet = (orderId: string): Order => {
    const query = db.query(
      `SELECT * FROM orders WHERE id = $id;`
    );
    return query.get({ $orderId: orderId }) as Order;
  }

  
  export const OrderGetAll = (): Order[] => {
    const query = db.query(
      `SELECT * FROM orders;`
    );
    return query.all() as Order[];
  };

  export const OrderInsertOrUpdate = (OrderDetail: Order): Order => {
    const query = db.query(
      `INSERT OR REPLACE INTO orders (
        orderId,
        userId,
        status,
        createdAt,
        updatedAt
      ) VALUES (
        $orderId, $userId, $status, $createdAt, $updatedAt
      );`
    );
    return query.get({
      $orderId: OrderDetail.orderId,
      $userId: OrderDetail.userId,
      $status: OrderDetail.status,
      $createdAt: OrderDetail.createdAt,
      $updatedAt: OrderDetail.updatedAt
    }) as Order;
  }
  
  export const OrderDelete = (): void => {
    const query = db.query(
      `DELETE FROM orders;`
    );
    query.run();
  }

    
  export const OrderDeleteSpecific = (orderId:string): void => {
    const query = db.query(
      `DELETE FROM orders WHERE orderId = ?;`
    );
    query.run(orderId);
  }