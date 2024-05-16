export type User = {
  uid: string;
  name: string;
  email: string;
  email_verified: boolean;
}

export type UserSession = {
  uid: string;
  id: string;
  login_at: number;
  logout_at: number | undefined;
}

export type Order = {
  orderId: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderItem = {
  itemId: string;
  orderId: string;
  productId: string;
  quantity: string;
  price: string;
}