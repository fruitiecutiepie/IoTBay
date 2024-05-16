import { createSignal, onMount } from 'solid-js';
import { fetchAllOrders, deleteSpecificOrder, addOrUpdateOrder } from '../serviceOrderManagement/authOrders';
import { Order } from '../../dataTypes';

const OrderDetails = () => {
  const [orders, setOrders] = createSignal<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = createSignal<Order[]>([]);
  const [searchQuery, setSearchQuery] = createSignal('');
  const [newOrder, setNewOrder] = createSignal<Order>({ orderId: '', userId: '', status: '', createdAt: '', updatedAt: '' });
  const [selectedOrder, setSelectedOrder] = createSignal<Order | undefined>();

  onMount(async () => {
    const fetchedOrders = await fetchAllOrders();
    setOrders(fetchedOrders);
    setFilteredOrders(fetchedOrders);
  });
  //DELETES DATA ADDED TO THE TABLE
  const handleDelete = async (orderId: string) => {
    await deleteSpecificOrder(orderId);
    const updatedOrders = orders().filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };
  //ADDS ENTERED DATA TO THE TABLE
  const handleAdd = async () => {
    await addOrUpdateOrder(newOrder());
    const fetchedOrders = await fetchAllOrders();
    setOrders(fetchedOrders);
    setFilteredOrders(fetchedOrders);
  };
  //SEARCHES DATA FROM THE TABLE
  const handleSearch = () => {
    const query = searchQuery().toLowerCase();
    const filtered = orders().filter(order =>
      order.orderId.toLowerCase().includes(query) ||
      new Date(order.createdAt).toLocaleDateString().includes(query)
    );
    setFilteredOrders(filtered);
  };

  //HTML TABLE SHOWING DATA FROM THE DATABASE
  return (
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold mb-4">Order Details</h1>
      <div class="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID or Date"
          class="border p-2 mr-2"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
        />
        <button class="bg-blue-500 text-white px-4 py-2" onClick={handleSearch}>Search</button>
      </div>
      <div class="mb-4">
        <input
          type="text"
          placeholder="New Order ID"
          class="border p-2 mr-2"
          onInput={(e) => setNewOrder({ ...newOrder(), orderId: e.currentTarget.value })}
        />
        <input
          type="text"
          placeholder="User ID"
          class="border p-2 mr-2"
          onInput={(e) => setNewOrder({ ...newOrder(), userId: e.currentTarget.value })}
        />
        <input
          type="text"
          placeholder="Status"
          class="border p-2 mr-2"
          onInput={(e) => setNewOrder({ ...newOrder(), status: e.currentTarget.value })}
        />
        <input
          type="date"
          placeholder="Creation Date"
          class="border p-2 mr-2"
          onInput={(e) => setNewOrder({ ...newOrder(), createdAt: e.currentTarget.value })}
        />
        <button class="bg-green-500 text-white px-4 py-2" onClick={handleAdd}>Add Order</button>
      </div>
      <table class="min-w-full bg-white border border-gray-200 text-center">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Order ID</th>
            <th class="py-2 px-4 border-b">User ID</th>
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Created At</th>
            <th class="py-2 px-4 border-b">Updated At</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders().map((order) => (
            <tr onClick={() => setSelectedOrder(order)}>
              <td class="py-2 px-4 border-b">{order.orderId}</td>
              <td class="py-2 px-4 border-b">{order.userId}</td>
              <td class="py-2 px-4 border-b">{order.status}</td>
              <td class="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleString()}</td>
              <td class="py-2 px-4 border-b">{new Date(order.updatedAt).toLocaleString()}</td>
              <td class="py-2 px-4 border-b">
                <button class="bg-red-500 text-white px-4 py-2" onClick={() => handleDelete(order.orderId)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
