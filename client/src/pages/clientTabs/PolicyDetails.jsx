const PolicyDetails = ({ policy, onClose }) => {
    if (!policy) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✖
          </button>
  
          <h2 className="text-2xl font-bold mb-4">{policy.name}</h2>
          <p className="text-gray-600 mb-6">{policy.description}</p>
  
          <div className="grid grid-cols-2 gap-4">
            <div><b>Policy Type:</b> {policy.type}</div>
            <div><b>Duration:</b> {policy.duration}</div>
            <div><b>Premium:</b> {policy.premium}</div>
            <div><b>Status:</b> {policy.status}</div>
            <div><b>Active Till:</b> {policy.activeTill}</div>
          </div>
  
          <div className="flex justify-end mt-6 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              Close
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-bold">
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PolicyDetails;
  