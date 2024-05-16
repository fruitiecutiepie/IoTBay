import { db } from "../db/initDb";

export const PaymentsmoduleInitDb = () => {
  db.exec(
    `CREATE TABLE IF NOT EXISTS carddetails (
      paymentmethod TEXT NOT NULL,
      holdername TEXT NOT NULL,
      creditcardnumber INTEGER NOT NULL PRIMARY KEY,
      confirmedcard INTEGER NOT NULL,
      expirydate INTEGER NOT NULL,
      billingaddress TEXT NOT NULL
    );`
  );


  db.exec(
    `CREATE TABLE IF NOT EXISTS payments (
      paymentid TEXT NOT NULL PRIMARY KEY, 
      orderid TEXT NOT NULL,
      paymentmethod TEXT NOT NULL,
      creditcarddetails INTEGER NOT NULL,
      amount INTEGER NOT NULL,
      date INTEGER NOT NULL
    );`
  );

  db.exec(`
    INSERT INTO carddetails (paymentmethod, holdername, creditcardnumber, confirmedcard, expirydate, billingaddress)
    VALUES 
    ('Visa', 'John Doe', 1234567890123456, 1234567890123456, 0425, '123 Main St'),
    ('Mastercard', 'Jane Smith', 2345678901234567, 2345678901234567, 0724, '0724 Elm St'),
    ('American Express', 'Alice Johnson', 3456789012345678, 3456789012345678, 0525, '789 Oak St');
  `);

  db.exec(`
    INSERT INTO payments (paymentid, orderid, paymentmethod, creditcarddetails, amount, date)
    VALUES 
    ('PAYID1', 'ORDID1', 'Visa', 1234567890123456, 100, 10032023),
    ('PAYID2', 'ORDID2', 'Mastercard', 2345678901234567, 150, 31032023),
    ('PAYID3', 'ORDID3', 'American Express', 3456789012345678, 200, 23042023),
    ('PAYID4', 'ORDID4', 'Discover', 4567890123456789, 250, 10052023),
    ('PAYID5', 'ORDID5', 'Visa', 5678901234567890, 300, 11012023),
    ('PAYID6', 'ORDID6', 'Mastercard', 6789012345678901, 350, 12022023),
    ('PAYID7', 'ORDID7', 'American Express', 7890123456789012, 400, 16022023),
    ('PAYID8', 'ORDID8', 'Discover', 8901234567890123, 450, 17032023),
    ('PAYID9', 'ORDID9', 'Visa', 9012345678901234, 500, 20032023),
    ('PAYID10', 'ORDID10', 'Mastercard', 1234567890123456, 550, 02032023),
    ('PAYID11', 'ORDID11', 'American Express', 2345678901234567, 600, 01032023),
    ('PAYID12', 'ORDID12', 'Discover', 3456789012345678, 650, 30032023),
    ('PAYID13', 'ORDID13', 'Visa', 4567890123456789, 700, 23052023),
    ('PAYID14', 'ORDID14', 'Mastercard', 5678901234567890, 750, 27022023),
    ('PAYID15', 'ORDID15', 'American Express', 6789012345678901, 800, 27032023),
    ('PAYID16', 'ORDID16', 'Discover', 7890123456789012, 850, 15012023),
    ('PAYID17', 'ORDID17', 'Visa', 8901234567890123, 900, 09052023),
    ('PAYID18', 'ORDID18', 'Mastercard', 9012345678901234, 950, 07022023),
    ('PAYID19', 'ORDID19', 'American Express', 1234567890123456, 1000, 03032023),
    ('PAYID20', 'ORDID20', 'Discover', 2345678901234567, 1050, 02022023);
  `);
}
