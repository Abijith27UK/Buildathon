// controllers/createPolicy.js
const { Policy } = require("../models/Policy");

const createPolicy = async (req, res) => {
  try {
    const policy = new Policy(req.body);
    const savedPolicy = await policy.save();
    res.status(201).json({ message: "Policy created successfully", policy: savedPolicy });
  } catch (error) {
    res.status(500).json({ message: "Error creating policy", error: error.message });
  }
};

module.exports = { createPolicy };
