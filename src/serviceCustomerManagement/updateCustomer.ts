export async function updateCustomer(customerData) {
    const response = await fetch('/api/customers', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });
    if (!response.ok) {
      throw new Error('Failed to update customer');
    }
    return await response.json();
  }