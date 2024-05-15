import { Component } from "solid-js";
import { getOrderHistory } from "../serviceOrderManagement/getOrderHistory";

const OrderHistory: Component = () => {
  const [orderHistory, setOrderHistory] = createSignal(null);

  onMount(async () => {
    const history = await getOrderHistory();
    setOrderHistory(history);
  });

  return (
    <div>
      <h1>Order History</h1>
      {orderHistory() ? (
        <ul>
          {orderHistory().map((order) => (
            <li key={order.id}>{order.id} - {order.status}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderHistory;
