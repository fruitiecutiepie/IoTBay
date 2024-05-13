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

export type Customer = {
  id: string;
  name: string;
  email: string;
  type: string; // 'company' or 'individual'
  address: string;
  status: boolean;
}