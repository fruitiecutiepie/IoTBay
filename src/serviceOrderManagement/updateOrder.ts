export const updateOrder = async (orderId: string, updates: { items?: any[] }) => {
    const response = await fetch(`/api/orderManagement/updateOrder?orderId=${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  };
  