import { createSignal, onMount, For } from 'solid-js';
import { fetchCustomer, addOrUpdateCustomer, deleteCustomer } from '../serviceCustomerManagement/customerManagement';
import { useNavigate } from '@solidjs/router';


const CustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = createSignal([]);

  onMount(async () => {
    // Fetch all customers on component mount
    const initialCustomers = await fetchCustomer(); // Ensure your API can handle fetching all customers
    setCustomers(initialCustomers || []);
  });

  const handleAddCustomer = async () => {
    // API call to add a new customer
    const newCustomer = { name: "New Customer", email: "new@example.com", type: "individual", address: "123 Main St", status: true };
    const addedCustomer = await addOrUpdateCustomer(newCustomer);
    setCustomers([...customers(), addedCustomer]);
  };

  const handleDeleteCustomer = async (customerId) => {
    // API call to delete a customer
    await deleteCustomer(customerId);
    setCustomers(customers().filter(customer => customer.id !== customerId));
  };

  const handleEditCustomer = (customerId) => {
    // Navigate to edit customer page with preloaded data
    navigate(`/edit-customer/${customerId}`);
  };

  return (
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Customer Management</h1>
      <button onClick={handleAddCustomer} class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4">
        Add Customer
      </button>
      <div class="space-y-2">
        <For each={customers()}>
          {(customer) => (
            <div class="flex justify-between items-center bg-gray-100 p-2 rounded">
              <div>
                <p class="font-bold">{customer.name}</p>
                <p>{customer.email}</p>
              </div>
              <div>
                <button onClick={() => handleEditCustomer(customer.id)} class="text-blue-500 hover:text-blue-600 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)} class="text-red-500 hover:text-red-600">
                  Delete
                </button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default CustomerManagement;
