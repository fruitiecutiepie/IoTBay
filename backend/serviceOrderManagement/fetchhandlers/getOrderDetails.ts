import { FetchHandler } from "../..";

export const getOrderDetails = async (orderId: string) => {
  const order = db.query("SELECT * FROM orders WHERE id = ?", [orderId]).get();
  const items = db.query("SELECT * FROM orderItems WHERE orderId = ?", [orderId]).all();
  return { order, items };
};
