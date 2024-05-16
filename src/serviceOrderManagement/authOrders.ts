import config from "../../config.json";
import { Order } from "../../dataTypes";
import { OrderItem } from "../../dataTypes";

type ReqBody = {
    Order: Order | undefined;
    orderId: number | undefined;
    event: "add" | "delete";
  }
  
  // Function to fetch all Order
  export const fetchAllOrders = async (): Promise<Order[]> => {
    const res = await fetch(`http://localhost:${config.serverPort}/order`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  };
  
  export const fetchAllOrderItems = async (): Promise<OrderItem[]> => {
    const res = await fetch(`http://localhost:${config.serverPort}/orderitems`);
    if (!res.ok) throw new Error('Failed to fetch orderitemss');
    return res.json();
  };
  
  
  // Function to add or update a Order
  export const addOrUpdateOrder = async (Order: Order): Promise<Order> => {
    const res = await fetch(`http://localhost:${config.serverPort}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Order: Order})
    });
    if (!res.ok) throw new Error('Failed to add/update order');
    return res.json();
  };
  
  // Function to delete a Order
  export const deletecarddetails = async (): Promise<void> => {
    const res = await fetch(`http://localhost:${config.serverPort}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Specify content type
      body: JSON.stringify({ event: "delete" } as ReqBody) // Provide request body
    });
    if (!res.ok) throw new Error(`Failed to delete order`);
  };