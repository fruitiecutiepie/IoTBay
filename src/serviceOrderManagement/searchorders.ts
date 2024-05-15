export const searchOrders = async (searchParams: { orderNumber?: string; date?: string }) => {
    const response = await fetch("/api/orderManagement/searchOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });
    return response.json();
  };
  