export const cancelOrder = async (orderId: string) => {
    const response = await fetch(`/api/orderManagement/cancelOrder?orderId=${orderId}`, {
      method: "DELETE",
    });
    return response.json();
  };
  