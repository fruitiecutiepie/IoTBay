const { getCustomers } = require('../sql/customerQueries');

exports.handleGetCustomers = async (req, res) => {
  try {
    const customers = await getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve customers", error: error.message });
  }
};