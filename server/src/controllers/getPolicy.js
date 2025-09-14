// controllers/getPolicy.js
const  Policy  = require("../models/Policy");

/**
 * Controller to get a single policy by ID
 */
const getPolicy = async (req, res) => {
  try {
    const { id } = req.params;
    
    const policy = await Policy.findById(id);
    
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json({
      message: "Policy retrieved successfully",
      policy
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving policy", error: error.message });
  }
};

module.exports = { getPolicy };
