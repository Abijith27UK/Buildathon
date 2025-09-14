// controllers/deletePolicy.js
const { Policy } = require("../models/Policy");

/**
 * Controller to delete a policy
 */
const deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPolicy = await Policy.findByIdAndDelete(id);
    
    if (!deletedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json({
      message: "Policy deleted successfully",
      policy: deletedPolicy
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting policy", error: error.message });
  }
};

module.exports = { deletePolicy };
