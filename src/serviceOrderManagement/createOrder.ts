export const createOrder = async (orderData: { items: any[] }) => {
    const response = await fetch("/api/orderManagement/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  };
  