import { useOutletContext } from "react-router-dom";

const Overview = () => {
  const { client } = useOutletContext();

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Client Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-3">Personal Information</h4>
          <div className="space-y-2">
            <div><b>Name:</b> {client.name}</div>
            <div><b>Date of Birth:</b> {formatDate(client.dateOfBirth)}</div>
            <div><b>Email:</b> {client.email}</div>
            <div><b>Phone:</b> {client.phone}</div>
            <div><b>Marital Status:</b> {client.maritalStatus}</div>
            <div><b>Dependents:</b> {client.dependents}</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-3">Additional Information</h4>
          <div className="space-y-2">
            <div><b>Occupation:</b> {client.occupation || "N/A"}</div>
            <div><b>Address:</b> {client.address}</div>
            <div><b>Client Since:</b> {formatDate(client.createdAt)}</div>
            <div><b>Last Updated:</b> {formatDate(client.updatedAt)}</div>
          </div>
        </div>
      </div>

      {/* Documents Summary */}
      {client.documents && client.documents.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-3">Documents ({client.documents.length})</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {client.documents.map((doc, index) => (
              <div key={index} className="text-sm text-gray-600">
                • {doc.name} ({doc.type})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
