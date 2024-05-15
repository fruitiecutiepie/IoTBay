import { Component } from "solid-js";
import { createOrder } from "../serviceOrderManagement/createOrder";

const Order: Component = () => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const items = [
      {
        productId: formData.get("productId"),
        quantity: parseInt(formData.get("quantity") as string),
        price: parseFloat(formData.get("price") as string),
      },
    ];
    const response = await createOrder({ items });
    console.log(response);
  };

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product ID:
          <input type="text" name="productId" required />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" required />
        </label>
        <label>
          Price:
          <input type="number" step="0.01" name="price" required />
        </label>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default Order;
