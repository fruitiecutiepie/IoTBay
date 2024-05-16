import { db } from "../../db/initDb";

export type OrderItem = {
    itemId: string;
    orderId: string;
    productId: string;
    quantity: string;
    price: string;
  }


  export const OrderItemGet = (itemId: string): OrderItem => {
    const query = db.query(
      `SELECT * FROM orderItems WHERE id = $id;`
    );
    return query.get({ $itemId: itemId }) as OrderItem;
  }


export const OrderItemGetAll = (): OrderItem[] => {
    const query = db.query(
      `SELECT * FROM orderItems;`
    );
    return query.all() as OrderItem[];
  };

  export const OrderItemInsertOrUpdate = (OrderItem: OrderItem): OrderItem => {
    const query = db.query(
      `INSERT OR REPLACE INTO orderItems (
        id,
        orderId,
        productId,
        quantity,
        price
      ) VALUES (
        $id, $orderId, $productId, $quantity, $price
      );`
    );
    return query.get({
      $id: OrderItem.itemId,
      $orderId: OrderItem.orderId,
      $productId: OrderItem.productId,
      $quantity: OrderItem.quantity,
      $price: OrderItem.price
    }) as OrderItem;
  }

  export const OrderItemDelete = (): void => {
    const query = db.query(
      `DELETE FROM orderItems;`
    );
    query.run();
  }