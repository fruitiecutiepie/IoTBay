import config from "../../config.json";
import { UserSession } from "../../dataTypes";
import { CardDetail } from "../../dataTypes";
import { Payment } from "../../dataTypes";

type ReqBody = {
  CardDetail: CardDetail | undefined;
  creditcardnumber: number | undefined;
  event: "add" | "delete";
}

// Function to fetch all customers
export const fetchAllcarddetails = async (): Promise<CardDetail[]> => {
  const res = await fetch(`http://localhost:${config.serverPort}/carddetails`);
  if (!res.ok) throw new Error('Failed to fetch carddetails');
  return res.json();
};

export const fetchAllpayments = async (): Promise<Payment[]> => {
  const res = await fetch(`http://localhost:${config.serverPort}/payments`);
  if (!res.ok) throw new Error('Failed to fetch carddetails');
  return res.json();
};


// Function to add or update a customer
export const addOrUpdatecarddetails = async (CardDetail: CardDetail): Promise<CardDetail> => {
  const res = await fetch(`http://localhost:${config.serverPort}/carddetails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ CardDetail})
  });
  if (!res.ok) throw new Error('Failed to add/update carddetails');
  return res.json();
};

// Function to delete a customer
export const deletecarddetails = async (): Promise<void> => {
  const res = await fetch(`http://localhost:${config.serverPort}/carddetails`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // Specify content type
    body: JSON.stringify({ event: "delete" } as ReqBody) // Provide request body
  });
  if (!res.ok) throw new Error(`Failed to delete payment method`);
};

