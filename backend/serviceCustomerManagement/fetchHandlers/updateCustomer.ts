const { updateCustomer } = require('../sql/customerQueries');

exports.handleUpdateCustomer = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    if (!id || !name || !email) {
      res.status(400).json({ message: "ID, name, and email are required." });
      return;
    }
    const result = await updateCustomer(id, name, email);
    if (result.changes > 0) {
      res.status(200).json({ message: "Customer updated successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update customer", error: error.message });
  }
};