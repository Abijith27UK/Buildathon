// controllers/createClient.js
const { Client } = require("../models/user");

/**
 * Controller to create a new client
 */
const createClient = async (req, res) => {
  try {
    const {
      name,
      dateOfBirth,
      address,
      phone,
      email,
      occupation,
      maritalStatus,
      dependents,
      documents
    } = req.body;

    // Create new client object
    const client = new Client({
      name,
      dateOfBirth,
      address,
      phone,
      email,
      occupation,
      maritalStatus,
      dependents,
      documents
    });

    // Save to DB
    const savedClient = await client.save();

    res.status(201).json({
      message: "Client created successfully",
      client: savedClient
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Error creating client", error: error.message });
  }
};

module.exports = { createClient };
