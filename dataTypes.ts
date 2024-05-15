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

export type CardDetail = {
  paymentmethod: string;
  holdername: string;
  creditcardnumber: number;
  confirmedcard: number;
  expirydate: number;
  billingaddress: string;
}

export type Payment = {
  paymentid: string;
  orderid: string;
  paymentmethod: string;
  creditcarddetails: number;
  amount: number;
  date: number; 
}