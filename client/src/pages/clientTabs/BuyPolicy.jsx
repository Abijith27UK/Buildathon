import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { apiService } from "../../services/api";

const BuyPolicy = () => {
  const { data, loading, error, refetch } = useApi(() => apiService.getPolicies());

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading    ...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading policies: {error}
        </div>
      </div>
    );
  }

  const policies = data?.policies || [];

  // Debug information
  console.log('BuyPolicy - API Response:', data);
  console.log('BuyPolicy - Policies:', policies);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Available Policies</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {policies.length} policies available
          </div>
          <button
            onClick={() => refetch()}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Debug information - remove this after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
          <strong>Debug Info:</strong> API returned {policies.length} policies
          {policies.length > 0 && (
            <div className="mt-2">
              <strong>Policy Statuses:</strong> {policies.map(p => p.status).join(', ')}
            </div>
          )}
        </div>
      )}

      {policies.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Policy Name</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Premium</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{policy.name}</td>
                  <td className="px-4 py-2 text-gray-500">{policy.type}</td>
                  <td className="px-4 py-2 text-gray-500">${policy.premium}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {policy.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`${policy._id}`}
                      className="text-blue-600 font-bold hover:text-blue-800"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No policies available</h3>
          <p className="text-gray-500 mb-4">No policies found in the database.</p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">To add policies:</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.open('/settings', '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Go to Settings
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPolicy;
