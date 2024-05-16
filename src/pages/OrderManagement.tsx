import { createSignal, onMount } from 'solid-js';
import { fetchAllOrders } from '../serviceOrderManagement/authOrders';
import { Order } from '../../dataTypes';

const OrderDetails = () => {
  const [orders, setOrders] = createSignal<Order[]>([]);

  onMount(async () => {
    const fetchedOrders = await fetchAllOrders();
    setOrders(fetchedOrders);
  });

  return (
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">Order Details</h1>
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Order ID</th>
            <th class="py-2 px-4 border-b">User ID</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Created At</th>
            <th class="py-2 px-4 border-b">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders().map((order) => (
            <tr>
              <td class="py-2 px-4 border-b">{order.orderId}</td>
              <td class="py-2 px-4 border-b">{order.userId}</td>
              <td class="py-2 px-4 border-b">{order.status}</td>
              <td class="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleString()}</td>
              <td class="py-2 px-4 border-b">{new Date(order.updatedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
