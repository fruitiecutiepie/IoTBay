const { deleteCustomer } = require('../sql/customerQueries');

exports.handleDeleteCustomer = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: "Customer ID is required." });
      return;
    }
    const result = await deleteCustomer(id);
    if (result.changes > 0) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete customer", error: error.message });
  }
};