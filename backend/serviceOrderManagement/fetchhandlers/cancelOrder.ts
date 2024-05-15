import { FetchHandler } from "../..";

export const cancelOrder = async (orderId: string) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const order = db.query("SELECT * FROM orders WHERE id = ? AND userId = ?", [orderId, user.uid]).get();
  if (!order || order.status !== "saved") {
    throw new Error("Order not found or already submitted");
  }

  db.run("UPDATE orders SET status = 'cancelled', updatedAt = ? WHERE id = ?", [new Date().toISOString(), orderId]);
  return { message: "Order cancelled successfully" };
};
