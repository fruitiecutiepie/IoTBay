import config from "../../config.json";
import { Customer } from "../../dataTypes";

type ReqBody = {
  customer: Customer | undefined;
  event: 'delete';
}

// Function to fetch all customers
export const fetchAllCustomers = async (): Promise<Customer[]> => {
  const res = await fetch(`http://localhost:${config.serverPort}/customer`);
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
};

// Function to fetch a specific customer by ID
export const fetchCustomer = async (id: string): Promise<Customer> => {
  const res = await fetch(`http://localhost:${config.serverPort}/customer?id=${id}`);
  if (!res.ok) throw new Error(`Failed to fetch customer with ID: ${id}`);
  return res.json();
};

// Function to add or update a customer
export const addOrUpdateCustomer = async (customer: Customer): Promise<Customer> => {
  const res = await fetch(`http://localhost:${config.serverPort}/customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer })
  });
  if (!res.ok) throw new Error('Failed to add/update customer');
  return res.json();
};

// Function to delete a customer
export const deleteCustomer = async (id: string): Promise<void> => {
  const res = await fetch(`http://localhost:${config.serverPort}/customer?id=${id}`, {
    method: 'POST',
    body: JSON.stringify({
      event: 'delete'
    } as ReqBody)
  });
  if (!res.ok) throw new Error(`Failed to delete customer with ID: ${id}`);
};
