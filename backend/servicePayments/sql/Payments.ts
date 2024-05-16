import { db } from "../../db/initDb";

export type Payments = {
  paymentid: string;
  orderid: string;
  paymentmethod: string;
  creditcarddetails: number;
  amount: number;
  date: number;  
}
 
  export const paymentGetAll = (): Payments[] => {
    const query = db.query(
      `SELECT * FROM Payments;`
    );
    return query.all() as Payments[];
  };
  
  export const paymentsInsertOrUpdate = (Payments: Payments): Payments => {
    const query = db.query(
      `INSERT OR REPLACE INTO customers (
        paymentid,
        orderid,
        paymentmethod,
        creditcarddetails,
        amount,
        date 
      ) VALUES (
        $paymentid, $orderid, $paymentmethod, $creditcarddetails, $amount, $date
      );`
    );
    return query.get({
      $paymentid: Payments.paymentid,
      $orderid: Payments.orderid,
      $paymentmethod: Payments.paymentmethod,
      $creditcarddetails: Payments.creditcarddetails,
      $amount: Payments.amount,
      $date: Payments.date,
    }) as Payments;
  }
  