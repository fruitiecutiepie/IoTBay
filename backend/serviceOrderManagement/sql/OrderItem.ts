import { db } from "../../db/initDb";

export type OrderItem = {
    itemId: string;
    orderId: string;
    productId: string;
    quantity: string;
    price: string;
  }

  //GET ORDER ITEM
  export const OrderItemGet = (itemId: string): OrderItem => {
    const query = db.query(
      `SELECT * FROM orderItems WHERE id = $id;`
    );
    return query.get({ $itemId: itemId }) as OrderItem;
  }

  //GET ALL ORDERITEMS
  export const OrderItemGetAll = (): OrderItem[] => {
    const query = db.query(
      `SELECT * FROM orderItems;`
    );
    return query.all() as OrderItem[];
  };
  //ADD OR UPDATE ORDERITEMS
  export const OrderItemInsertOrUpdate = (OrderItem: OrderItem): OrderItem => {
    const query = db.query(
      `INSERT OR REPLACE INTO orderItems (
        itemId,
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
  //DELETE ITEM
  export const OrderItemDelete = (): void => {
    const query = db.query(
      `DELETE FROM orderItems;`
    );
    query.run();
  }