import { db } from "../../db/initDb";

export type Customer = {
  id: string;
  name: string;
  email: string;
  type: string;
  address: string;
  status: boolean;
}

export const customerGet = (id: string): Customer => {
  const query = db.query(
    `SELECT * FROM customers WHERE id = $id;`
  );
  return query.get({ $id: id }) as Customer;
}

export const customerGetAll = (): Customer[] => {
  const query = db.query(
    `SELECT * FROM customers;`
  );
  return query.all() as Customer[];
};

export const customerInsertOrUpdate = (customer: Customer): Customer => {
  const query = db.query(
    `INSERT OR REPLACE INTO customers (
      id,
      name,
      email,
      type,
      address,
      status
    ) VALUES (
      $id, $name, $email, $type, $address, $status
    );`
  );
  return query.get({
    $id: customer.id,
    $name: customer.name,
    $email: customer.email,
    $type: customer.type,
    $address: customer.address,
    $status: customer.status,
  }) as Customer;
}

export const customerDelete = (id: string): void => {
  const query = db.prepare(
    `DELETE FROM customers WHERE id = $id;`
  );
  query.run({ $id: id });
}