import { FetchHandler } from "../..";
export const getOrderHistory = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const orders = db.query("SELECT * FROM orders WHERE userId = ?", [user.uid]).all();
  return orders;
};
