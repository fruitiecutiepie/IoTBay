export const getOrderHistory = async () => {
    const response = await fetch("/api/orderManagement/getOrderHistory");
    return response.json();
  };
  