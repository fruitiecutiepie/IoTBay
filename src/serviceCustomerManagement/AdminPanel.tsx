import { useNavigate, useRoutes } from '@solidjs/router';
import { createSignal } from 'solid-js';



const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <div class="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
      <h1 class="font-bold text-3xl text-center mb-4 w-full">Admin Dashboard</h1>
      <div class="bg-white shadow-md rounded-lg p-4 w-full max-w-4xl">
        <h2 class="text-xl font-semibold text-gray-700 mb-4 text-left">Admin Tools</h2>
        <div class="flex flex-wrap justify-start items-center space-x-4 mb-4">
          <button onClick={() => navigate('/customer')} class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Customer Information Management
          </button>
        </div>
      </div>
      {/* Logout button visible without scrolling */}
      <button onClick={handleLogout} class="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
