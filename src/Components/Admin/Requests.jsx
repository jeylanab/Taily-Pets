// src/pages/admin/Requests.jsx
import { useEffect, useState } from "react";
import { firestore } from "../../Service/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, "Requests"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
    setLoading(false);
  };

  // Update request status
  const updateStatus = async (id, status) => {
    await updateDoc(doc(firestore, "Requests", id), { status });
    fetchRequests();
  };

  // Delete request
  const deleteRequest = async (id) => {
    if (confirm("Are you sure you want to delete this request?")) {
      await deleteDoc(doc(firestore, "Requests", id));
      fetchRequests();
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">Manage Requests</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-3 py-2 text-left">Requester</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Pet Type</th>
                <th className="px-3 py-2 text-left">Service Type</th>
                <th className="px-3 py-2 text-left">Preferred Date</th>
                <th className="px-3 py-2 text-left">Notes</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2">{r.fullName || r.userName}</td>
                  <td className="px-3 py-2">{r.email || r.userEmail}</td>
                  <td className="px-3 py-2">{r.petType}</td>
                  <td className="px-3 py-2">{r.serviceType}</td>
                  <td className="px-3 py-2">
                    {r.preferredDates
                      ? new Date(r.preferredDates).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2">{r.notes || "-"}</td>
                  <td className="px-3 py-2">
                    {r.status === "Approved" ? (
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <FaCheck /> Approved
                      </span>
                    ) : r.status === "Rejected" ? (
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        <FaTimes /> Rejected
                      </span>
                    ) : (
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 flex gap-1 flex-wrap">
                    {r.status !== "Approved" && (
                      <button
                        onClick={() => updateStatus(r.id, "Approved")}
                        className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600 flex items-center gap-1"
                      >
                        <FaCheck /> Approve
                      </button>
                    )}
                    {r.status !== "Rejected" && (
                      <button
                        onClick={() => updateStatus(r.id, "Rejected")}
                        className="bg-orange-400 text-white px-2 py-1 rounded text-xs hover:bg-orange-500 flex items-center gap-1"
                      >
                        <FaTimes /> Reject
                      </button>
                    )}
                    <button
                      onClick={() => deleteRequest(r.id)}
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
