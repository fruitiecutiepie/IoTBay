export async function fetchCustomers() {
    const response = await fetch('/api/customers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    return await response.json();
  }