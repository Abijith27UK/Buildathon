// controllers/getClientDocuments.js
const { Client } = require("../models/user");

/**
 * Controller to get documents of a specific client
 */
const getClientDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    // Find client by ID and select only documents
    const client = await Client.findById(id).select("documents");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Format documents for response
    const documents = client.documents.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      type: doc.type,
      // Convert image buffer to base64 so frontend can render it
      image: doc.pic?.data
        ? `data:${doc.pic.contentType};base64,${doc.pic.data.toString("base64")}`
        : null,
    }));

    res.status(200).json({
      message: "Client documents fetched successfully",
      documents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching client documents", error: error.message });
  }
};

module.exports = { getClientDocuments };
