import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { apiService } from "../services/api";
import ClientForm from "../components/ClientForm";

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({});
  const [showClientForm, setShowClientForm] = useState(false);

  const { data, loading, error, refetch } = useApi(
    () => apiService.getClients({ ...searchParams, page: currentPage }),
    [searchParams, currentPage]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm });
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Clients</h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading clients...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Clients</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading clients: {error}
        </div>
      </div>
    );
  }

  const { clients = [], pagination = {} } = data || {};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Clients</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowClientForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Client
          </button>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Search
          </button>
          {searchParams.search && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSearchParams({});
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Clients Table */}
      <div className="overflow-hidden border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Occupation</th>
              <th className="px-4 py-2 text-left">Marital Status</th>
              <th className="px-4 py-2 text-left">Dependents</th>
            </tr>
          </thead>
          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <Link to={`/clients/${client._id}`} className="text-blue-600 hover:underline">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{client.email}</td>
                  <td className="px-4 py-2">{client.phone}</td>
                  <td className="px-4 py-2">{client.occupation || "N/A"}</td>
                  <td className="px-4 py-2">{client.maritalStatus}</td>
                  <td className="px-4 py-2">{client.dependents}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          
          <span className="px-4 py-2">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext}
            className="px-3 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {/* Total count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {clients.length} of {pagination.totalClients} clients
      </div>

      {/* Client Form Modal */}
      {showClientForm && (
        <ClientForm
          onSuccess={() => {
            setShowClientForm(false);
            refetch();
          }}
          onCancel={() => setShowClientForm(false)}
        />
      )}
    </div>
  );
};

export default ClientList;
