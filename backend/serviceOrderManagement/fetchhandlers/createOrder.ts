import { FetchHandler } from "../..";

export const createOrder = async (orderData: { items: OrderItem[] }) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const orderId = uuidv4();
  const order: Order = {
    id: orderId,
    userId: user.uid,
    status: "saved",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  db.run("INSERT INTO orders (id, userId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", [
    order.id, order.userId, order.status, order.createdAt.toISOString(), order.updatedAt.toISOString()
  ]);

  for (const item of orderData.items) {
    db.run("INSERT INTO orderItems (id, orderId, productId, quantity, price) VALUES (?, ?, ?, ?, ?)", [
      uuidv4(), orderId, item.productId, item.quantity, item.price
    ]);
  }

  return order;
};
