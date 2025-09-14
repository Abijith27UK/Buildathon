// controllers/getClient.js
const { Client } = require("../models/user");

/**
 * Controller to get a single client by ID
 */
const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await Client.findById(id);
    
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client retrieved successfully",
      client
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving client", error: error.message });
  }
};

module.exports = { getClient };
