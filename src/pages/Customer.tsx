import { createSignal, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = createSignal([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ]);

  const handleAddCustomer = () => {
    // Placeholder for adding a customer
    const newCustomer = { id: customers().length + 1, name: "New Customer", email: "new@example.com" };
    setCustomers([...customers(), newCustomer]);
  };

  const handleDeleteCustomer = (customerId) => {
    // Placeholder for deleting a customer
    setCustomers(customers().filter(customer => customer.id !== customerId));
  };

  const handleEditCustomer = (customerId) => {
    // Navigate to edit customer page, this is a placeholder
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
