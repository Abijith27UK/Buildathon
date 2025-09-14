import { useState } from "react";
import axios from "axios";

const DocumentUploader = ({ clientId, onUpload }) => {
  const [form, setForm] = useState({ name: "", type: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/clients/${clientId}/documents`, form);
      alert("Document uploaded!");
      onUpload && onUpload(res.data.documents);
      setForm({ name: "", type: "", image: "" });
    } catch (error) {
      console.error(error);
      alert("Error uploading document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-3 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Upload Document</h3>
      <input
        type="text"
        placeholder="Document Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Document Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        placeholder="Image URL (or base64)"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
};

export default DocumentUploader;
