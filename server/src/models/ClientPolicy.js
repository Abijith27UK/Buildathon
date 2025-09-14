const mongoose = require("mongoose");

const clientPolicySchema = new mongoose.Schema({
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Client', 
    required: true 
  },
  policyId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Policy', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["Active", "Pending", "Expired", "Cancelled"], 
    default: "Active" 
  },
  purchaseDate: { 
    type: Date, 
    default: Date.now 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  premium: { 
    type: Number, 
    required: true 
  },
  documentsVerified: { 
    type: Boolean, 
    default: false 
  },
  requiredDocuments: [{
    type: { type: String, required: true },
    uploaded: { type: Boolean, default: false },
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client.documents' }
  }]
}, { versionKey: false, timestamps: true });

const ClientPolicy = mongoose.model("ClientPolicy", clientPolicySchema);

module.exports = { ClientPolicy };
