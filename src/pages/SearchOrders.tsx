import { Component } from "solid-js";
import { searchOrders } from "../serviceOrderManagement/searchOrders";

const SearchOrders: Component = () => {
  const [orders, setOrders] = createSignal(null);

  const handleSearch = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchParams = {
      orderNumber: formData.get("orderNumber"),
      date: formData.get("date"),
    };
    const results = await searchOrders(searchParams);
    setOrders(results);
  };

  return (
    <div>
      <h1>Search Orders</h1>
      <form onSubmit={handleSearch}>
        <label>
          Order Number:
          <input type="text" name="orderNumber" />
        </label>
        <label>
          Date:
          <input type="date" name="date" />
        </label>
        <button type="submit">Search</button>
      </form>
      {orders() ? (
        <ul>
          {orders().map((order) => (
            <li key={order.id}>{order.id} - {order.status}</li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default SearchOrders;
