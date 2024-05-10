export async function addCustomer(customerData) {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });
    if (!response.ok) {
      throw new Error('Failed to add customer');
    }
    return await response.json();
  }