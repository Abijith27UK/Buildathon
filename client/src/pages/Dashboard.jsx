import { useApi } from '../hooks/useApi';
import { apiService } from '../services/api';

const Dashboard = () => {
  const { data, loading, error } = useApi(() => apiService.getDashboard());

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  const { stats, charts, recentActivities } = data?.dashboard || {};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Clients</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.totalClients || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Policies</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.totalPolicies || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Policies</h3>
          <p className="text-3xl font-bold text-emerald-600">{stats?.activePolicies || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Clients</h3>
          <p className="text-3xl font-bold text-purple-600">{stats?.recentClients || 0}</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Policies by Type */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Policies by Type</h3>
          <div className="space-y-2">
            {charts?.policiesByType?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item._id}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            )) || <p className="text-gray-500">No data available</p>}
          </div>
        </div>

        {/* Clients by Marital Status */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Clients by Marital Status</h3>
          <div className="space-y-2">
            {charts?.clientsByMaritalStatus?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{item._id}</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            )) || <p className="text-gray-500">No data available</p>}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Clients */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Clients</h3>
          <div className="space-y-3">
            {recentActivities?.clients?.map((client, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(client.createdAt).toLocaleDateString()}
                </p>
              </div>
            )) || <p className="text-gray-500">No recent clients</p>}
          </div>
        </div>

        {/* Recent Policies */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Policies</h3>
          <div className="space-y-3">
            {recentActivities?.policies?.map((policy, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{policy.name}</p>
                  <p className="text-sm text-gray-500">{policy.type}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                  policy.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {policy.status}
                </span>
              </div>
            )) || <p className="text-gray-500">No recent policies</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
  