// controllers/updateClient.js
const { Client } = require("../models/user");

/**
 * Controller to update an existing client
 */
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // return updated doc & validate fields
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error updating client", error: error.message });
  }
};

module.exports = { updateClient };
