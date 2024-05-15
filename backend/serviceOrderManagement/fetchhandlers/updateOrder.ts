import { FetchHandler } from "../..";

export const updateOrder = async (orderId: string, updates: { items?: any[] }) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const order = db.query("SELECT * FROM orders WHERE id = ? AND userId = ?", [orderId, user.uid]).get();
  if (!order || order.status !== "saved") {
    throw new Error("Order not found or already submitted");
  }

  db.run("DELETE FROM orderItems WHERE orderId = ?", [orderId]);
  
  if (updates.items) {
    for (const item of updates.items) {
      db.run("INSERT INTO orderItems (id, orderId, productId, quantity, price) VALUES (?, ?, ?, ?, ?)", [
        uuidv4(), orderId, item.productId, item.quantity, item.price
      ]);
    }
  }

  return { message: "Order updated successfully" };
};
