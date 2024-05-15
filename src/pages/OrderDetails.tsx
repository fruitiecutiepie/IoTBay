import { Component } from "solid-js";
import { useParams } from "@solidjs/router";
import { getOrderDetails } from "../serviceOrderManagement/getOrderDetails";

const OrderDetails: Component = () => {
  const params = useParams();
  const [orderDetails, setOrderDetails] = createSignal(null);

  onMount(async () => {
    const details = await getOrderDetails(params.orderId);
    setOrderDetails(details);
  });

  return (
    <div>
      <h1>Order Details</h1>
      {orderDetails() ? (
        <div>
          <pre>{JSON.stringify(orderDetails(), null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetails;
