import { Component, onMount, createSignal } from 'solid-js';
import { fetchCartItems, deleteCartItem } from './services'; // Replace with your actual service functions

const Cart: Component = () => {
  const [cartItems, setCartItems] = createSignal([]);

  onMount(async () => {
    // Fetch cart items when the component mounts
    const items = await fetchCartItems();
    setCartItems(items);
  });

  const handleDeleteItem = async (itemId) => {
    await deleteCartItem(itemId);
    // Update cart items after deletion
    const updatedItems = await fetchCartItems();
    setCartItems(updatedItems);
  };

  return (
    <div class="container mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Display cart items */}
      <div>
        {cartItems().length === 0 ? (
          <p class="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul class="divide-y divide-gray-200">
            {cartItems().map(item => (
              <li class="flex items-center justify-between py-4">
                <div class="flex items-center">
                  <img class="h-10 w-10 rounded-full" src={item.image} alt={item.name} />
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{item.name}</div>
                    <div class="text-sm text-gray-500">${item.price}</div>
                  </div>
                </div>
                <div>
                  <button class="text-red-500" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
