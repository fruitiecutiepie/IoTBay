export async function deleteCustomer(customerId) {
    const response = await fetch('/api/customers', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: customerId })
    });
    if (!response.ok) {
      throw new Error('Failed to delete customer');
    }
    return await response.json();
  }