// controllers/updatePolicy.js
const { Policy } = require("../models/Policy");

const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPolicy = await Policy.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json({ message: "Policy updated successfully", policy: updatedPolicy });
  } catch (error) {
    res.status(500).json({ message: "Error updating policy", error: error.message });
  }
};

module.exports = { updatePolicy };
