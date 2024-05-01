export type UserSession = {
  uid: string;
  id: string;
  login_at: number;
  logout_at: number | undefined;
}