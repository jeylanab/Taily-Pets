import React, { useEffect, useState } from "react";
import { firestore } from "../Service/firebase";
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import {
  FaUser,
  FaPhone,
  FaPaw,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

export default function SitterRequests({ providerId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!providerId) return;

    const q = query(collection(firestore, "Bookings"), where("providerId", "==", providerId));
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by createdAt descending (latest requests first)
        bookings.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        setRequests(bookings);
        setLoading(false);
      },
      err => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [providerId]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      const docRef = doc(firestore, "Bookings", bookingId);
      await updateDoc(docRef, { status });
    } catch (err) {
      console.error("Error updating booking status:", err);
    }
  };

  if (loading) return <p className="text-center mt-6 text-orange-500 font-semibold">Loading booking requests...</p>;
  if (requests.length === 0) return <p className="text-center mt-6 text-gray-500 font-medium">No booking requests yet.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      {requests.map(req => (
        <div
          key={req.id}
          className="p-6 border border-orange-200 rounded-xl shadow-md hover:shadow-lg transition flex flex-col md:flex-row justify-between bg-white"
        >
          <div className="space-y-2 flex-1">
            <p className="flex items-center gap-2 text-gray-700">
              <FaUser className="text-orange-500" /> <span className="font-semibold">{req.userName}</span> ({req.userEmail})
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaPhone className="text-orange-500" /> {req.userContact}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaPaw className="text-orange-500" /> {req.petType} / {req.petSize}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaClock className="text-orange-500" /> {req.serviceType} ({req.serviceLength})
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaCalendarAlt className="text-orange-500" /> 
              {` From ${new Date(req.fromDate.seconds * 1000).toLocaleDateString()} 
                 To ${new Date(req.toDate.seconds * 1000).toLocaleDateString()} at ${req.time}`}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">Status:</span>
              <span
                className={`font-semibold ${
                  req.status === "Pending"
                    ? "text-yellow-500"
                    : req.status === "Accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {req.status}
              </span>
            </p>
          </div>

          {req.status === "Pending" && (
            <div className="flex md:flex-col mt-4 md:mt-0 md:ml-6 gap-3">
              <button
                onClick={() => handleStatusChange(req.id, "Accepted")}
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                <FaCheckCircle /> Accept
              </button>
              <button
                onClick={() => handleStatusChange(req.id, "Rejected")}
                className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-red-600 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                <FaTimesCircle /> Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
