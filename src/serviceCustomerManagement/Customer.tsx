import { createSignal, For, onMount } from 'solid-js';
import { fetchAllCustomers, addOrUpdateCustomer, deleteCustomer } from '../serviceCustomerManagement/customerManagement';
import { createStore } from 'solid-js/store';
import { Customer } from "../../dataTypes";

const defaultStore = {
  customers: [] as Customer[],
  selectedCustomer: undefined as Customer | undefined,
  searchName: "",
  searchType: ""
};

const CustomerManagement = () => {
  const [store, setStore] = createStore(defaultStore);
  const [searchName, setSearchName] = createSignal("");
  const [searchType, setSearchType] = createSignal("");
  const [editingCustomer, setEditingCustomer] = createSignal<Customer | undefined>();
  const [addingCustomer, setAddingCustomer] = createSignal<boolean>(false);
  const [newCustomer, setNewCustomer] = createSignal<Partial<Customer>>({
    name: "New Customer",
    email: "new@example.com",
    type: "individual",
    address: "123 Main St",
    status: true,
  });

  onMount(async () => {
    await fetchCustomers();
  });

  const fetchCustomers = async () => {
    try {
      const customers = await fetchAllCustomers();
      setStore('customers', customers);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const addedCustomer = await addOrUpdateCustomer(newCustomer());
      await fetchCustomers();  // Refetch customer data after adding
      setAddingCustomer(false);  // Close add customer form
      setNewCustomer({
        name: "New Customer",
        email: "new@example.com",
        type: "individual",
        address: "123 Main St",
        status: true,
      });  // Reset new customer form
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const toggleStatus = async (customer: Customer) => {
    const updatedCustomer = { ...customer, status: !customer.status };
    try {
      await addOrUpdateCustomer(updatedCustomer);
      await fetchCustomers();  // Refetch customer data after toggling status
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      await fetchCustomers();  // Refetch customer data after deletion
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const handleSaveCustomer = async () => {
    if (!editingCustomer()) return;

    try {
      await addOrUpdateCustomer(editingCustomer()!);
      setEditingCustomer(undefined);
      await fetchCustomers();  // Refetch customer data after saving
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleInputChange = (field: keyof Customer, value: string | boolean) => {
    setEditingCustomer({ ...editingCustomer()!, [field]: value });
  };

  const handleNewCustomerInputChange = (field: keyof Customer, value: string | boolean) => {
    setNewCustomer({ ...newCustomer()!, [field]: value });
  };

  const filteredCustomers = () => store.customers.filter(customer =>
    customer.name.toLowerCase().includes(searchName().toLowerCase()) &&
    customer.type.toLowerCase().includes(searchType().toLowerCase())
  );

  return (
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Customer Management</h1>
      <div class="mb-4">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchName()}
          onInput={(e) => setSearchName(e.currentTarget.value)}
          class="p-2 border rounded mr-2 mb-2"
        />
        <input 
          type="text" 
          placeholder="Search by type..." 
          value={searchType()}
          onInput={(e) => setSearchType(e.currentTarget.value)}
          class="p-2 border rounded mr-2 mb-2"
        />
        <button onClick={() => setAddingCustomer(!addingCustomer())} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
          {addingCustomer() ? "Cancel" : "Add Customer"}
        </button>
      </div>
      {addingCustomer() && (
        <div class="mt-4 p-4 border rounded bg-gray-50">
          <h2 class="text-lg font-bold mb-4">Add New Customer</h2>
          <label class="block mb-2">
            Name:
            <input
              type="text"
              value={newCustomer().name}
              onInput={(e) => handleNewCustomerInputChange('name', (e.target as HTMLInputElement).value)}
              class="p-2 border rounded w-full"
            />
          </label>
          <label class="block mb-2">
            Email:
            <input
              type="text"
              value={newCustomer().email}
              onInput={(e) => handleNewCustomerInputChange('email', (e.target as HTMLInputElement).value)}
              class="p-2 border rounded w-full"
            />
          </label>
          <label class="block mb-2">
            Type:
            <select
              value={newCustomer().type}
              onChange={(e) => handleNewCustomerInputChange('type', (e.target as HTMLSelectElement).value)}
              class="p-2 border rounded w-full"
            >
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </label>
          <label class="block mb-2">
            Address:
            <input
              type="text"
              value={newCustomer().address}
              onInput={(e) => handleNewCustomerInputChange('address', (e.target as HTMLInputElement).value)}
              class="p-2 border rounded w-full"
            />
          </label>
          <label class="block mb-4">
            Status:
            <input
              type="checkbox"
              checked={newCustomer().status}
              onChange={(e) => handleNewCustomerInputChange('status', (e.target as HTMLInputElement).checked)}
              class="mr-2 ml-2"
            />
            Active
          </label>
          <button onClick={handleAddCustomer} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Save
          </button>
        </div>
      )}
      <For each={filteredCustomers()}>
        {(customer) => (
          <div class="mt-4 p-2 border rounded hover:bg-gray-100">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-bold">Name: {customer.name}</p>
                <p>Email: {customer.email}</p>
                <p>Type: {customer.type}</p>
                <p>Address: {customer.address}</p>
                <p>Status: {customer.status ? 'Active' : 'Inactive'}</p>
              </div>
              <div class="flex space-x-2">
                <button onClick={() => handleEditCustomer(customer)} class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                  Edit
                </button>
                <button onClick={() => toggleStatus(customer)} class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded">
                  {customer.status ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDeleteCustomer(customer.id)} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Delete
                </button>
              </div>
            </div>
            {editingCustomer()?.id === customer.id && (
              <div class="mt-4 p-4 border rounded bg-gray-50">
                <h2 class="text-lg font-bold mb-4">Edit Customer</h2>
                <label class="block mb-2">
                  Name:
                  <input
                    type="text"
                    value={editingCustomer()?.name || ''}
                    onInput={(e) => handleInputChange('name', (e.target as HTMLInputElement).value)}
                    class="p-2 border rounded w-full"
                  />
                </label>
                <label class="block mb-2">
                  Email:
                  <input
                    type="text"
                    value={editingCustomer()?.email || ''}
                    onInput={(e) => handleInputChange('email', (e.target as HTMLInputElement).value)}
                    class="p-2 border rounded w-full"
                  />
                </label>
                <label class="block mb-2">
                  Type:
                  <select
                    value={editingCustomer()?.type || ''}
                    onChange={(e) => handleInputChange('type', (e.target as HTMLSelectElement).value)}
                    class="p-2 border rounded w-full"
                  >
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                  </select>
                </label>
                <label class="block mb-2">
                  Address:
                  <input
                    type="text"
                    value={editingCustomer()?.address || ''}
                    onInput={(e) => handleInputChange('address', (e.target as HTMLInputElement).value)}
                    class="p-2 border rounded w-full"
                  />
                </label>
                <label class="block mb-4">
                  Status:
                  <input
                    type="checkbox"
                    checked={editingCustomer()?.status || false}
                    onChange={(e) => handleInputChange('status', (e.target as HTMLInputElement).checked)}
                    class="mr-2 ml-2"
                  />
                  Active
                </label>
                <button onClick={handleSaveCustomer} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Save
                </button>
                <button onClick={() => setEditingCustomer(undefined)} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </For>
    </div>
  );
};

export default CustomerManagement;
