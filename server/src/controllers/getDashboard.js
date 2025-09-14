// controllers/getDashboard.js
const { Client } = require("../models/user");
const { Policy } = require("../models/Policy");

/**
 * Controller to get dashboard analytics
 */
const getDashboard = async (req, res) => {
  try {
    // Get total counts
    const totalClients = await Client.countDocuments();
    const totalPolicies = await Policy.countDocuments();
    
    // Get active policies count
    const activePolicies = await Policy.countDocuments({ status: "Active" });
    
    // Get pending policies count
    const pendingPolicies = await Policy.countDocuments({ status: "Pending" });
    
    // Get expired policies count
    const expiredPolicies = await Policy.countDocuments({ status: "Expired" });
    
    // Get recent clients (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentClients = await Client.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });
    
    // Get policies by type
    const policiesByType = await Policy.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get clients by marital status
    const clientsByMaritalStatus = await Client.aggregate([
      {
        $group: {
          _id: "$maritalStatus",
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get recent activities (last 10 clients and policies)
    const recentClientsList = await Client.find()
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(10);
    
    const recentPoliciesList = await Policy.find()
      .select('name type status createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      message: "Dashboard data retrieved successfully",
      dashboard: {
        stats: {
          totalClients,
          totalPolicies,
          activePolicies,
          pendingPolicies,
          expiredPolicies,
          recentClients
        },
        charts: {
          policiesByType,
          clientsByMaritalStatus
        },
        recentActivities: {
          clients: recentClientsList,
          policies: recentPoliciesList
        }
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard data", error: error.message });
  }
};

module.exports = { getDashboard };
