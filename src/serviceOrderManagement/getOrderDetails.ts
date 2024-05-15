export const getOrderDetails = async (orderId: string) => {
    const response = await fetch(`/api/orderManagement/getOrderDetails?orderId=${orderId}`);
    return response.json();
  };
  