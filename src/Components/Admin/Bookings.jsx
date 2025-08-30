// src/pages/admin/Bookings.jsx
import { useEffect, useState } from "react";
import { firestore } from "../../Service/firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings from Firestore
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, "Bookings"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
    setLoading(false);
  };

  // Update booking status
  const updateStatus = async (id, status) => {
    await updateDoc(doc(firestore, "Bookings", id), { status });
    fetchBookings();
  };

  // Delete booking
  const deleteBooking = async (id) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      await deleteDoc(doc(firestore, "Bookings", id));
      fetchBookings();
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">Manage Bookings</h1>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-3 py-2 text-left">User Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Provider</th>
                <th className="px-3 py-2 text-left">Service</th>
                <th className="px-3 py-2 text-left">Length</th>
                <th className="px-3 py-2 text-left">Pet Type</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Time</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-t">
                  <td className="px-3 py-2">{b.userName}</td>
                  <td className="px-3 py-2">{b.userEmail}</td>
                  <td className="px-3 py-2">{b.providerName}</td>
                  <td className="px-3 py-2">{b.serviceType}</td>
                  <td className="px-3 py-2">{b.serviceLength || "N/A"}</td>
                  <td className="px-3 py-2">{b.petType}</td>
                  <td className="px-3 py-2">{new Date(b.date.seconds * 1000).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{b.time}</td>
                  <td className="px-3 py-2">{b.status}</td>
                  <td className="px-3 py-2 flex gap-1 flex-wrap">
                    {/* Very small buttons with orange scheme */}
                    <button
                      onClick={() => updateStatus(b.id, "Accepted")}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600 flex items-center gap-1"
                    >
                      <FaCheck /> Accept
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "Completed")}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600 flex items-center gap-1"
                    >
                      <FaCheck /> Complete
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "Rejected")}
                      className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600 flex items-center gap-1"
                    >
                      <FaTimes /> Reject
                    </button>
                    <button
                      onClick={() => deleteBooking(b.id)}
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
