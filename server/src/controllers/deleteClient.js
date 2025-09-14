// controllers/deleteClient.js
const { Client } = require("../models/user");

/**
 * Controller to delete a client
 */
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedClient = await Client.findByIdAndDelete(id);
    
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client deleted successfully",
      client: deletedClient
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting client", error: error.message });
  }
};

module.exports = { deleteClient };
