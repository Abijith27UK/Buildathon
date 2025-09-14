import { useState } from "react";
import { useMutation } from "../hooks/useApi";
import { apiService } from "../services/api";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("client");

  // state for client form
  const [clientData, setClientData] = useState({
    name: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    occupation: "",
    maritalStatus: "Single",
    dependents: 0,
  });

  // state for policy form
  const [policyData, setPolicyData] = useState({
    name: "",
    type: "",
    premium: 0,
    status: "Available",
    activeTill: "",
    description: "",
    coverage: {
      coverageType: "",
      liability: "",
      collision: "",
      comprehensive: "",
      uninsuredMotorist: "",
      medicalPayments: "",
      deductible: "",
      policyLimits: "",
    },
    premiumDetails: {
      paymentFrequency: "",
      lateFee: "",
      cancellationPolicy: "",
    },
  });

  // Use mutation hooks for API calls
  const { mutate: createClient, loading: clientLoading, error: clientError } = useMutation();
  const { mutate: createPolicy, loading: policyLoading, error: policyError } = useMutation();

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: clientData.name,
        dateOfBirth: new Date(clientData.dob), // Convert to Date object
        address: clientData.address,
        phone: clientData.phone,
        email: clientData.email,
        occupation: clientData.occupation,
        maritalStatus: clientData.maritalStatus,
        dependents: parseInt(clientData.dependents) || 0,
      };

      await createClient(() => apiService.createClient(data));
      alert("Client created successfully!");
      
      // Reset form
      setClientData({
        name: "",
        dob: "",
        address: "",
        phone: "",
        email: "",
        occupation: "",
        maritalStatus: "Single",
        dependents: 0,
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating client");
    }
  };

  const handlePolicySubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...policyData,
        premium: parseFloat(policyData.premium) || 0,
        activeTill: policyData.activeTill ? new Date(policyData.activeTill) : null,
      };

      await createPolicy(() => apiService.createPolicy(data));
      alert("Policy created successfully!");
      
      // Reset form
      setPolicyData({
        name: "",
        type: "",
        premium: 0,
        status: "Available",
        activeTill: "",
        description: "",
        coverage: {
          coverageType: "",
          liability: "",
          collision: "",
          comprehensive: "",
          uninsuredMotorist: "",
          medicalPayments: "",
          deductible: "",
          policyLimits: "",
        },
        premiumDetails: {
          paymentFrequency: "",
          lateFee: "",
          cancellationPolicy: "",
        },
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating policy");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {/* Error Messages */}
      {clientError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Client Error: {clientError}
        </div>
      )}
      {policyError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Policy Error: {policyError}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("client")}
          className={`px-4 py-2 rounded ${
            activeTab === "client"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Client
        </button>
        <button
          onClick={() => setActiveTab("policy")}
          className={`px-4 py-2 rounded ${
            activeTab === "policy"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Create Policy
        </button>
      </div>

      {/* Create Client Form */}
      {activeTab === "client" && (
        <form
          onSubmit={handleClientSubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4">New Client</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={clientData.name}
              onChange={(e) =>
                setClientData({ ...clientData, name: e.target.value })
              }
              className="border rounded p-2"
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={clientData.dob}
              onChange={(e) =>
                setClientData({ ...clientData, dob: e.target.value })
              }
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={clientData.address}
              onChange={(e) =>
                setClientData({ ...clientData, address: e.target.value })
              }
              className="border rounded p-2 col-span-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={clientData.phone}
              onChange={(e) =>
                setClientData({ ...clientData, phone: e.target.value })
              }
              className="border rounded p-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={clientData.email}
              onChange={(e) =>
                setClientData({ ...clientData, email: e.target.value })
              }
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Occupation"
              value={clientData.occupation}
              onChange={(e) =>
                setClientData({ ...clientData, occupation: e.target.value })
              }
              className="border rounded p-2"
            />
            <select
              value={clientData.maritalStatus}
              onChange={(e) =>
                setClientData({
                  ...clientData,
                  maritalStatus: e.target.value,
                })
              }
              className="border rounded p-2"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            <input
              type="number"
              placeholder="Dependents"
              value={clientData.dependents}
              onChange={(e) =>
                setClientData({
                  ...clientData,
                  dependents: parseInt(e.target.value) || 0,
                })
              }
              className="border rounded p-2"
              min="0"
            />
          </div>
          <button
            type="submit"
            disabled={clientLoading}
            className="bg-blue-600 text-white px-5 py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {clientLoading ? "Creating..." : "Create Client"}
          </button>
        </form>
      )}

      {/* Create Policy Form */}
      {activeTab === "policy" && (
        <form
          onSubmit={handlePolicySubmit}
          className="bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4">New Policy</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Policy Name"
              value={policyData.name}
              onChange={(e) =>
                setPolicyData({ ...policyData, name: e.target.value })
              }
              className="border rounded p-2"
              required
            />
            <input
              type="text"
              placeholder="Policy Type"
              value={policyData.type}
              onChange={(e) =>
                setPolicyData({ ...policyData, type: e.target.value })
              }
              className="border rounded p-2"
              required
            />
            <input
              type="number"
              placeholder="Premium Amount"
              value={policyData.premium}
              onChange={(e) =>
                setPolicyData({ ...policyData, premium: e.target.value })
              }
              className="border rounded p-2"
            />
            <select
              value={policyData.status}
              onChange={(e) =>
                setPolicyData({ ...policyData, status: e.target.value })
              }
              className="border rounded p-2"
            >
              <option value="Available">Available</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
            </select>
            <input
              type="date"
              placeholder="Active Till"
              value={policyData.activeTill}
              onChange={(e) =>
                setPolicyData({ ...policyData, activeTill: e.target.value })
              }
              className="border rounded p-2"
            />
            <textarea
              placeholder="Description"
              value={policyData.description}
              onChange={(e) =>
                setPolicyData({ ...policyData, description: e.target.value })
              }
              className="border rounded p-2 col-span-2"
            />

            {/* Coverage Details */}
            <h4 className="col-span-2 font-semibold mt-4">Coverage Details</h4>
            {Object.keys(policyData.coverage).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={policyData.coverage[key]}
                onChange={(e) =>
                  setPolicyData({
                    ...policyData,
                    coverage: {
                      ...policyData.coverage,
                      [key]: e.target.value,
                    },
                  })
                }
                className="border rounded p-2"
              />
            ))}

            {/* Premium Details */}
            <h4 className="col-span-2 font-semibold mt-4">Premium Details</h4>
            {Object.keys(policyData.premiumDetails).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={policyData.premiumDetails[key]}
                onChange={(e) =>
                  setPolicyData({
                    ...policyData,
                    premiumDetails: {
                      ...policyData.premiumDetails,
                      [key]: e.target.value,
                    },
                  })
                }
                className="border rounded p-2"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={policyLoading}
            className="bg-blue-600 text-white px-5 py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {policyLoading ? "Creating..." : "Create Policy"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
