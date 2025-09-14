// controllers/purchasePolicy.js
const { ClientPolicy } = require("../models/ClientPolicy");
const { Client } = require("../models/user");
const { Policy } = require("../models/Policy");

/**
 * Controller to purchase a policy for a client
 */
const purchasePolicy = async (req, res) => {
  try {
    const { clientId, policyId } = req.params;
    const { startDate, endDate, premium } = req.body;

    // Verify client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Verify policy exists
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Check if client already has this policy
    const existingPolicy = await ClientPolicy.findOne({
      clientId,
      policyId,
      status: { $in: ["Active", "Pending"] }
    });

    if (existingPolicy) {
      return res.status(400).json({ message: "Client already has this policy" });
    }

    // Create client policy association
    const clientPolicy = new ClientPolicy({
      clientId,
      policyId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      premium: premium || policy.premium,
      requiredDocuments: [
        { type: "Aadhar Card", uploaded: false },
        { type: "PAN Card", uploaded: false }
      ]
    });

    const savedClientPolicy = await clientPolicy.save();

    // Populate the response with policy details
    await savedClientPolicy.populate('policyId');

    res.status(201).json({
      message: "Policy purchased successfully",
      clientPolicy: savedClientPolicy
    });
  } catch (error) {
    res.status(500).json({ message: "Error purchasing policy", error: error.message });
  }
};

module.exports = { purchasePolicy };
