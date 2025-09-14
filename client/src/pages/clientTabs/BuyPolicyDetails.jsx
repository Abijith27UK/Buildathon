import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useApi, useMutation } from "../../hooks/useApi";
import { apiService } from "../../services/api";

const BuyPolicyDetails = () => {
  const { id: policyId } = useParams();
  const { client } = useOutletContext(); // comes from ClientDetails
  const navigate = useNavigate();

  const { data, loading, error } = useApi(() => apiService.getPolicy(policyId), [policyId]);
  const { mutate: purchasePolicy, loading: purchasing } = useMutation();

  if (loading) return <div className="p-6 text-center">Loading policy details...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading policy: {error}</div>;

  const policy = data?.policy;
  if (!policy) return <p className="p-6">Policy not found</p>;

  const handleProceed = async () => {
    try {
      await purchasePolicy(() =>
        apiService.purchasePolicy(client._id, policy._id, {
          premium: policy.premium,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
      );
      alert("Policy purchased successfully!");
      navigate(-1); // go back to policy list
    } catch (err) {
      console.error("Error purchasing policy:", err);
      alert("Error purchasing policy. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{policy.name}</h2>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
          {policy.status}
        </span>
      </div>

      {/* Description */}
      {policy.description && (
        <p className="text-gray-700 mb-6">{policy.description}</p>
      )}

      {/* Basic Details */}
      <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Type</p>
          <p className="font-medium">{policy.type}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Premium</p>
          <p className="font-medium text-green-600">${policy.premium}</p>
        </div>
        {policy.activeTill && (
          <div>
            <p className="text-gray-500 text-sm">Active Till</p>
            <p className="font-medium">{new Date(policy.activeTill).toDateString()}</p>
          </div>
        )}
      </div>

      {/* Coverage */}
      {policy.coverage && (
        <>
          <h3 className="text-lg font-semibold mb-2">Coverage</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {Object.entries(policy.coverage).map(([key, value]) => (
              value && (
                <li key={key} className="text-sm">
                  <span className="font-medium capitalize">{key}:</span> {value}
                </li>
              )
            ))}
          </ul>
        </>
      )}

      {/* Premium Details */}
      {policy.premiumDetails && (
        <>
          <h3 className="text-lg font-semibold mb-2">Premium Details</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {Object.entries(policy.premiumDetails).map(([key, value]) => (
              value && (
                <li key={key} className="text-sm">
                  <span className="font-medium capitalize">{key}:</span> {value}
                </li>
              )
            ))}
          </ul>
        </>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleProceed}
          disabled={purchasing}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {purchasing ? "Processing..." : "Proceed"}
        </button>
      </div>
    </div>
  );
};

export default BuyPolicyDetails;
    