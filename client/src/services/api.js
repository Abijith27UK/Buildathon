import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Dashboard
  getDashboard: () => api.get('/dashboard'),

  // Clients
  getClients: (params = {}) => api.get('/clients', { params }),
  getClient: (id) => api.get(`/clients/${id}`),
  createClient: (data) => api.post('/clients', data),
  updateClient: (id, data) => api.put(`/clients/${id}`, data),
  deleteClient: (id) => api.delete(`/clients/${id}`),

  // Client Documents
  getClientDocuments: (id) => api.get(`/clients/${id}/documents`),
  addDocument: (clientId, data) => api.post(`/clients/${clientId}/documents`, data),
  deleteDocument: (clientId, docId) => api.delete(`/clients/${clientId}/documents/${docId}`),

  // Policies
  getPolicies: (params = {}) => api.get('/policies', { params }),
  getPolicy: (id) => api.get(`/policies/${id}`),
  createPolicy: (data) => api.post('/policies', data),
  updatePolicy: (id, data) => api.put(`/policies/${id}`, data),
  deletePolicy: (id) => api.delete(`/policies/${id}`),

  // Client Policies
  getClientPolicies: (clientId) => api.get(`/clients/${clientId}/policies`),
  purchasePolicy: (clientId, policyId, data) => api.post(`/clients/${clientId}/policies/${policyId}/purchase`, data),
  verifyDocuments: (clientPolicyId) => api.post(`/client-policies/${clientPolicyId}/verify-documents`),
};

export default api;
