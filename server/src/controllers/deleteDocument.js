// controllers/deleteDocument.js
const { Client } = require("../models/user");

const deleteDocument = async (req, res) => {
  try {
    const { clientId, docId } = req.params;

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.documents = client.documents.filter((doc) => doc._id.toString() !== docId);
    await client.save();

    res.status(200).json({ message: "Document deleted", documents: client.documents });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error: error.message });
  }
};

module.exports = { deleteDocument };
