// controllers/addDocument.js
const { Client } = require("../models/user");

const addDocument = async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, type, image } = req.body; // `image` can be a base64 string

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Handle base64 image data
    let picData = null;
    if (image) {
      // Extract base64 data and content type
      const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        picData = {
          data: Buffer.from(matches[2], 'base64'),
          contentType: matches[1]
        };
      }
    }

    const newDocument = {
      name,
      type,
      pic: picData
    };

    client.documents.push(newDocument);
    await client.save();

    res.status(201).json({ 
      message: "Document added successfully", 
      documents: client.documents 
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding document", error: error.message });
  }
};

module.exports = { addDocument };
