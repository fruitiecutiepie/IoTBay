import { FetchHandler } from "../..";

export const searchOrders = async (searchParams: { orderNumber?: string; date?: string }) => {
  let query = "SELECT * FROM orders WHERE 1=1";
  const params: string[] = [];

  if (searchParams.orderNumber) {
    query += " AND id = ?";
    params.push(searchParams.orderNumber);
  }

  if (searchParams.date) {
    query += " AND DATE(createdAt) = ?";
    params.push(searchParams.date);
  }

  const orders = db.query(query, params).all();
  return orders;
};
