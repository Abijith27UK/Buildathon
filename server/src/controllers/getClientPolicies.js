// controllers/getClientPolicies.js
const { ClientPolicy } = require("../models/ClientPolicy");

/**
 * Controller to get all policies for a specific client
 */
const getClientPolicies = async (req, res) => {
  try {
    const { clientId } = req.params;

    const clientPolicies = await ClientPolicy.find({ clientId })
      .populate('policyId')
      .sort({ purchaseDate: -1 });

    res.status(200).json({
      message: "Client policies retrieved successfully",
      policies: clientPolicies
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving client policies", error: error.message });
  }
};

module.exports = { getClientPolicies };
