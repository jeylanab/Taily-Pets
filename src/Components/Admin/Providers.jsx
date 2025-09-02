// src/pages/admin/Providers.jsx
import { useState, useEffect } from "react";
import { firestore } from "../../Service/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, "Providers"));
      setProviders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Error fetching providers:", err);
    }
    setLoading(false);
  };

  const toggleApprove = async (id, approved) => {
    await updateDoc(doc(firestore, "Providers", id), { approved: !approved });
    fetchProviders();
  };

  const deleteProvider = async (id) => {
    if (confirm("Are you sure you want to delete this provider?")) {
      await deleteDoc(doc(firestore, "Providers", id));
      fetchProviders();
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // ✅ Helper: handles array or string
  const renderField = (field) => {
    if (!field) return "-";
    if (Array.isArray(field)) return field.join(", ");
    return field;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">Manage Providers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : providers.length === 0 ? (
        <p>No providers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Services</th>
                <th className="px-3 py-2 text-left">Pet Types</th>
                <th className="px-3 py-2 text-left">Area</th>
                <th className="px-3 py-2 text-left">Approved</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2">{p.name}</td>
                  <td className="px-3 py-2">{renderField(p.serviceTypes || p.serviceType)}</td>
                  <td className="px-3 py-2">{renderField(p.petTypes || p.petType)}</td>
                  <td className="px-3 py-2">{p.area}</td>
                  <td className="px-3 py-2">
                    {p.approved ? (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <FaCheck /> Yes
                      </span>
                    ) : (
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <FaTimes /> No
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 flex gap-1 flex-wrap">
                    <button
                      onClick={() => toggleApprove(p.id, p.approved)}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600 flex items-center gap-1"
                    >
                      {p.approved ? <FaTimes /> : <FaCheck />} {p.approved ? "Revoke" : "Approve"}
                    </button>
                    <button
                      onClick={() => deleteProvider(p.id)}
                      className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
