import { useParams, NavLink, Outlet } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { apiService } from "../services/api";

const tabs = [
  { to: "overview", label: "Overview" },
  { to: "policies", label: "Policies" },
  { to: "documents", label: "Documents" },
  { to: "claims", label: "Claims" },
];

const ClientDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useApi(() => apiService.getClient(id), [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading client details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading client: {error}
        </div>
      </div>
    );
  }

  const client = data?.client;
  if (!client) return <p className="p-6">Client not found</p>;

  return (
    <div className="flex-1">
      {/* Breadcrumb */}
      <div className="flex gap-2 p-4 text-gray-600 text-sm">
        <span>Clients</span>
        <span>/</span>
        <span className="text-black font-medium">{client.name}</span>
      </div>

      {/* Client Info Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center">
          <div
            className="w-32 h-32 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${client.avatar || "https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg?w=360"})`,
            }}
          ></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <p className="text-gray-500">Client ID: {client.id}</p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-lg bg-gray-100 font-bold text-sm">
          Edit
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-4 gap-8">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `pb-3 pt-4 text-sm font-bold ${
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Render tab content */}
      <div className="p-4">
        <Outlet context={{ client }} />
      </div>
    </div>
  );
};

export default ClientDetails;
