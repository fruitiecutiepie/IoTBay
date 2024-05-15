import { db } from "../../db/initDb";

export type CardDetail = {
    paymentmethod: string;
    holdername: string;
    creditcardnumber: number;
    confirmedcard: number;
    expirydate: number;
    billingaddress: string;  
}
 
  export const CardDetailGetAll = (): CardDetail[] => {
    const query = db.query(
      `SELECT * FROM carddetails;`
    );
    return query.all() as CardDetail[];
  };
  
  export const CardDetailInsertOrUpdate = (CardDetail: CardDetail): CardDetail => {
    const query = db.query(
      `INSERT OR REPLACE INTO carddetails (
        paymentmethod,
        holdername,
        creditcardnumber,
        confirmedcard,
        expirydate,
        billingaddress
      ) VALUES (
        $paymentmethod, $holdername, $creditcardnumber, $confirmedcard, $expirydate, $billingaddress
      );`
    );
    return query.get({
      $paymentmethod: CardDetail.paymentmethod,
      $holdername: CardDetail.holdername,
      $creditcardnumber: CardDetail.creditcardnumber,
      $confirmedcard: CardDetail.confirmedcard,
      $expirydate: CardDetail.expirydate,
      $billingaddress: CardDetail.billingaddress,
    }) as CardDetail;
  }
  
  export const CardDetailDelete = (): void => {
    const query = db.query(
      `DELETE FROM carddetails;`
    );
    query.run();
  }
