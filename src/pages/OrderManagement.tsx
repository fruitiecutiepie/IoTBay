// src/pages/OrderManagement.tsx

import { createSignal, onMount } from 'solid-js';
import { Order, createOrder, getOrdersByUserId, updateOrder, deleteOrder } from '../models/Order';
import { fetchOrders, addOrder, updateOrderStatus, removeOrder } from '../services/orderService';

export default function OrderManagement(props: { userId: string }) {
  const [orders, setOrders] = createSignal<Order[]>([]);
  const [newOrderItems, setNewOrderItems] = createSignal<string>('');
  const [newOrderPrice, setNewOrderPrice] = createSignal<number>(0);

  onMount(async () => {
    const userOrders = await fetchOrders(props.userId);
    setOrders(userOrders);
  });

  const handleAddOrder = async () => {
    await addOrder(props.userId, newOrderItems().split(','), newOrderPrice());
    const userOrders = await fetchOrders(props.userId);
    setOrders(userOrders);
    setNewOrderItems('');
    setNewOrderPrice(0);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: 'saved' | 'submitted') => {
    await updateOrderStatus(orderId, status);
    const userOrders = await fetchOrders(props.userId);
    setOrders(userOrders);
  };

  const handleRemoveOrder = async (orderId: string) => {
    await removeOrder(orderId);
    const userOrders = await fetchOrders(props.userId);
    setOrders(userOrders);
  };

  return (
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Order Management</h2>
      <div class="mb-4">
        <input
          type="text"
          placeholder="Items (comma separated)"
          value={newOrderItems()}
          onInput={(e) => setNewOrderItems(e.currentTarget.value)}
          class="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newOrderPrice()}
          onInput={(e) => setNewOrderPrice(parseFloat(e.currentTarget.value))}
          class="border p-2 mr-2"
        />
        <button onClick={handleAddOrder} class="bg-blue-500 text-white p-2 rounded">
          Add Order
        </button>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-2">Saved Orders</h3>
        {orders().filter(order => order.status === 'saved').map(order => (
        <div class="border p-2 mb-2 rounded shadow">
            <p>Items: {order.items.join(', ')}</p>
            <p>Price: ${order.price.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <button
            onClick={() => handleUpdateOrderStatus(order.id, 'submitted')}
            class="bg-green-500 text-white p-1 rounded mr-2"
            >
            Submit
            </button>
            <button onClick={() => handleRemoveOrder(order.id)} class="bg-red-500 text-white p-1 rounded">
            Delete
            </button>
        </div>
        ))}
      </div>
      <div>
        <h3 class="text-xl font-bold mb-2">Submitted Orders</h3>
        {orders().filter(order => order.status === 'submitted').map(order => (
            <div class="border p-2 mb-2 rounded shadow">
            <p>Items: {order.items.join(', ')}</p>
            <p>Price: ${order.price.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            </div>
        ))}
    </div>
</div>
)}