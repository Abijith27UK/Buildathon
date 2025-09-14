const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    premium: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Pending", "Expired"], default: "Active" },
    activeTill: { type: Date },
    description: { type: String },

    coverage: {
      coverageType: String,
      liability: String,
      collision: String,
      comprehensive: String,
      uninsuredMotorist: String,
      medicalPayments: String,
      deductible: String,
      policyLimits: String,
    },

    premiumDetails: {
      paymentFrequency: String,
      lateFee: String,
      cancellationPolicy: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
module.exports = { Policy };
