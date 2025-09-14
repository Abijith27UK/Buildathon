// controllers/verifyDocuments.js
const { ClientPolicy } = require("../models/ClientPolicy");
const { Client } = require("../models/user");

/**
 * Controller to verify documents for a client policy
 */
const verifyDocuments = async (req, res) => {
  try {
    const { clientPolicyId } = req.params;

    const clientPolicy = await ClientPolicy.findById(clientPolicyId);
    if (!clientPolicy) {
      return res.status(404).json({ message: "Client policy not found" });
    }

    // Get client documents
    const client = await Client.findById(clientPolicy.clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Check if required documents are uploaded
    const requiredDocs = clientPolicy.requiredDocuments;
    const clientDocs = client.documents;

    const updatedRequiredDocs = requiredDocs.map(reqDoc => {
      const uploadedDoc = clientDocs.find(doc => 
        doc.type === reqDoc.type && doc.name.toLowerCase().includes(reqDoc.type.toLowerCase())
      );
      
      return {
        ...reqDoc,
        uploaded: !!uploadedDoc,
        documentId: uploadedDoc?._id || null
      };
    });

    // Update the client policy with document status
    clientPolicy.requiredDocuments = updatedRequiredDocs;
    clientPolicy.documentsVerified = updatedRequiredDocs.every(doc => doc.uploaded);
    
    await clientPolicy.save();

    res.status(200).json({
      message: "Documents verification completed",
      clientPolicy,
      documentsStatus: updatedRequiredDocs
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying documents", error: error.message });
  }
};

module.exports = { verifyDocuments };
