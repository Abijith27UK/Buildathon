// controllers/getPolicies.js
const { Policy } = require("../models/Policy");

/**
 * Controller to get all policies with optional search and pagination
 */
const getPolicies = async (req, res) => {
  try {
    const { search, type, status, page = 1, limit = 10 } = req.query;
    
    // Build search query
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get policies with pagination
    const policies = await Policy.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Policy.countDocuments(query);

    res.status(200).json({
      message: "Policies retrieved successfully",
      policies,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalPolicies: total,
        hasNext: skip + policies.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving policies", error: error.message });
  }
};

module.exports = { getPolicies };
