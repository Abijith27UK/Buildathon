// import { documents } from "../data/mockData";

// const DocumentViewer = () => {
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Documents</h2>
//       <table className="w-full border rounded-lg overflow-hidden">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="px-4 py-2 text-left">Name</th>
//             <th className="px-4 py-2 text-left">Type</th>
//             <th className="px-4 py-2 text-left">Date</th>
//             <th className="px-4 py-2 text-left">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {documents.map((doc, idx) => (
//             <tr key={idx} className="border-t">
//               <td className="px-4 py-2">{doc.name}</td>
//               <td className="px-4 py-2">{doc.type}</td>
//               <td className="px-4 py-2">{doc.date}</td>
//               <td className="px-4 py-2">
//                 <span
//                   className={`px-3 py-1 rounded-lg text-sm ${
//                     doc.status === "Completed"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-yellow-100 text-yellow-800"
//                   }`}
//                 >
//                   {doc.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DocumentViewer;



import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { apiService } from "../services/api";
import DocumentUploader from "../components/DocumentUploader";

const DocumentViewer = ({ clientId }) => {
  const [showUploader, setShowUploader] = useState(false);
  
  const { data, loading, error, refetch } = useApi(
    () => apiService.getClientDocuments(clientId),
    [clientId]
  );

  const documents = data?.documents || [];

  const handleDelete = async (docId) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await apiService.deleteDocument(clientId, docId);
      refetch(); // Refresh the documents list
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Error deleting document. Please try again.");
    }
  };

  const handleUploadSuccess = () => {
    setShowUploader(false);
    refetch(); // Refresh the documents list
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-600">Loading documents...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading documents: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Documents</h2>
        <button
          onClick={() => setShowUploader(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Document
        </button>
      </div>

      {documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <div key={doc._id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.type}</p>
                </div>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-red-600 hover:text-red-800 p-1"
                  title="Delete document"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {doc.image ? (
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => window.open(doc.image, '_blank')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {doc.type === 'PDF' ? 'PDF Document' : 'Image Document'}
                </span>
                {doc.image && (
                  <button
                    onClick={() => window.open(doc.image, '_blank')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Full Size
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
          <p className="text-gray-500 mb-4">Upload documents like Aadhar Card, PAN Card, etc.</p>
          <button
            onClick={() => setShowUploader(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload First Document
          </button>
        </div>
      )}

      {/* Document Uploader Modal */}
      {showUploader && (
        <DocumentUploader
          clientId={clientId}
          onSuccess={handleUploadSuccess}
          onCancel={() => setShowUploader(false)}
        />
      )}
    </div>
  );
};

export default DocumentViewer;

