const { addCustomer } = require('../sql/customerQueries');

exports.handleAddCustomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required." });
      return;
    }
    const result = await addCustomer(name, email);
    res.status(201).json({ message: "Customer added successfully", customerId: result.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to add customer", error: error.message });
  }
};