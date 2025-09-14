import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { apiService } from "../../services/api";
import PolicyDetails from "./PolicyDetails";
import { Phone, Mail, MessageSquare, Smartphone } from "lucide-react"; // icons
import { FaWhatsapp } from "react-icons/fa";

// helper: calculate months till expiry
const getMonthsLeft = (dateStr) => {
  const today = new Date();
  const expiry = new Date(dateStr);
  const years = expiry.getFullYear() - today.getFullYear();
  const months = expiry.getMonth() - today.getMonth();
  return years * 12 + months + (expiry.getDate() >= today.getDate() ? 0 : -1);
};

const Policies = () => {
  const { client } = useOutletContext(); // ✅ get client from parent context
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const navigate = useNavigate();

  // Fetch client's purchased policies
  const { data: clientPoliciesData, loading: policiesLoading, error: policiesError, refetch } = useApi(
    () => apiService.getClientPolicies(client._id),
    [client._id]
  );

  const handleRenew = (policy) => {
    alert(`Renewal process started for policy: ${policy.name}`);
  };

  if (policiesLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Policies</h3>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-600">Loading policies...</div>
        </div>
      </div>
    );
  }

  if (policiesError) {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-4">Policies</h3>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading policies: {policiesError}
        </div>
      </div>
    );
  }

  const clientPolicies = clientPoliciesData?.policies || [];

  return (
    <div>
      {/* Header with Buy button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Policies</h3>
        <button
          onClick={() => navigate("buy")}
          className="rounded-lg bg-blue-600 text-white px-5 py-2 font-bold"
        >
          + Buy a Policy
        </button>
      </div>

      {/* Policy Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Policy Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Premium</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Months Left</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Renew</th>
              <th className="px-4 py-2 text-left">Remind</th>
            </tr>
          </thead>
          <tbody>
            {clientPolicies.length > 0 ? (
              clientPolicies.map((clientPolicy) => {
                const policy = clientPolicy.policyId;
                const monthsLeft = getMonthsLeft(clientPolicy.endDate);
                return (
                  <tr
                    key={clientPolicy._id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedPolicy({ ...policy, clientPolicy })}
                  >
                    <td className="px-4 py-2">{policy.name}</td>
                    <td className="px-4 py-2 text-gray-500">{policy.type}</td>
                    <td className="px-4 py-2 text-gray-500">${clientPolicy.premium}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          clientPolicy.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : clientPolicy.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {clientPolicy.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      {monthsLeft >= 0 ? `${monthsLeft} months` : "Expired"}
                    </td>
                    <td
                      className="px-4 py-2 text-blue-600 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPolicy({ ...policy, clientPolicy });
                      }}
                    >
                      View Details
                    </td>
                    <td className="px-4 py-2">
                      {monthsLeft <= 3 ? (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRenew(policy);
                          }}
                          className="text-indigo-600 font-bold cursor-pointer"
                        >
                          Renew
                        </span>
                      ) : (
                        <span className="text-gray-400 font-bold cursor-not-allowed">
                          Renew
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-3 text-gray-600">
                      {/* Call */}
                      <a
                        href={`tel:${client?.phone || ""}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone size={18} className="cursor-pointer hover:text-blue-600" />
                      </a>

                      {/* WhatsApp */}
                      <a
                      href={`https://wa.me/${client?.phone || ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      >   
                      <FaWhatsapp
                          size={20}
                          className="cursor-pointer hover:text-green-600"
                      />
                      </a>

                      {/* Email */}
                      <a
                        href={`mailto:${client?.email || ""}?subject=Policy%20Reminder&body=Hello%20${
                          client?.name || ""
                        },%20this%20is%20a%20reminder%20regarding%20your%20policy.`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail size={18} className="cursor-pointer hover:text-red-600" />
                      </a>

                      {/* SMS */}
                      <a
                        href={`sms:${client?.phone || ""}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Smartphone
                          size={18}
                          className="cursor-pointer hover:text-purple-600"
                        />
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-500">
                  <div className="py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 mb-4">No policies purchased yet</p>
                    <button
                      onClick={() => navigate("buy")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Buy Your First Policy
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <PolicyDetails
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </div>
  );
};

export default Policies;
