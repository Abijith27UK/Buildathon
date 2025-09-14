// controllers/getClients.js
const { Client } = require("../models/user");

/**
 * Controller to get all clients with optional search and pagination
 */
const getClients = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    
    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get clients with pagination
    const clients = await Client.find(query)
      .select('-documents') // Exclude documents for list view
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Client.countDocuments(query);

    res.status(200).json({
      message: "Clients retrieved successfully",
      clients,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalClients: total,
        hasNext: skip + clients.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving clients", error: error.message });
  }
};

module.exports = { getClients };
