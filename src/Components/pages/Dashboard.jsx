// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "../../Service/firebase";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaPaw,
  FaCheckCircle,
  FaTimesCircle,
  FaStar
} from "react-icons/fa";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      const userSnap = await getDocs(userRef);
      if (userSnap.exists()) {
        setUserRole(userSnap.data().role || "user");
      }
    };
    fetchUserRole();
  }, []);

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!auth.currentUser) return;
      setLoading(true);

      try {
        let q;
        if (userRole === "user") {
          q = query(
            collection(firestore, "Bookings"),
            where("userId", "==", auth.currentUser.uid)
          );
        } else if (userRole === "sitter") {
          q = query(
            collection(firestore, "Bookings"),
            where("providerId", "==", auth.currentUser.uid)
          );
        } else if (userRole === "admin") {
          q = collection(firestore, "Bookings");
        }

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          showReview: false,
          rating: 0,
          comment: "",
        }));
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }

      setLoading(false);
    };

    fetchBookings();
  }, [userRole]);

  // Check if booking time has passed
  const isBookingCompletable = (booking) => {
    const now = new Date();
    const bookingDate = booking.date?.toDate ? booking.date.toDate() : new Date(booking.date);
    let bookingEnd = new Date(bookingDate);

    switch (booking.serviceLength) {
      case "30min":
        bookingEnd.setMinutes(bookingEnd.getMinutes() + 30);
        break;
      case "Half-day":
        bookingEnd.setHours(bookingEnd.getHours() + 4);
        break;
      case "Full-day":
        bookingEnd.setHours(bookingEnd.getHours() + 8);
        break;
      default:
        bookingEnd.setHours(bookingEnd.getHours() + 1);
    }

    return now >= bookingEnd && booking.status === "Accepted";
  };

  // Update booking status
  const updateStatus = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(firestore, "Bookings", bookingId);
      await updateDoc(bookingRef, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
    }
  };

  // Complete booking and show review
  const handleComplete = async (bookingId) => {
    try {
      const bookingRef = doc(firestore, "Bookings", bookingId);
      await updateDoc(bookingRef, { status: "Completed" });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "Completed", showReview: true } : b
        )
      );
    } catch (err) {
      console.error("Error completing booking:", err);
    }
  };

  // Submit review to Firestore
  const submitReview = async (bookingId, providerId, rating, comment) => {
    if (!rating || !comment) {
      alert("Please provide both rating and comment.");
      return;
    }

    try {
      await addDoc(collection(firestore, "Reviews"), {
        bookingId,
        providerId,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || auth.currentUser.email,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      alert("Review submitted successfully!");
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, showReview: false } : b
        )
      );
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (!auth.currentUser)
    return <p className="p-10 text-center text-red-500">Please log in to view your dashboard.</p>;
  if (loading) return <p className="p-10 text-center text-gray-500">Loading dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins space-y-6">
      <h1 className="text-3xl font-bold text-orange-500">Dashboard ({userRole.toUpperCase()})</h1>

      {bookings.length === 0 && <p className="text-gray-500">No bookings found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border border-orange-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-orange-500">
                <FaPaw /> {b.serviceType}
              </h2>
              <p className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt /> {b.date?.toDate ? b.date.toDate().toLocaleDateString() : new Date(b.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <FaClock /> {b.time}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`font-semibold ${
                    b.status === "Pending"
                      ? "text-yellow-500"
                      : b.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {b.status}
                </span>
              </p>

              {userRole !== "user" && (
                <>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaUser /> {b.userName} ({b.userEmail})
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaPhone /> {b.userContact}
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaPaw /> {b.petType} / {b.petSize}
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              {userRole !== "user" && b.status === "Pending" && (
                <>
                  <button
                    onClick={() => updateStatus(b.id, "Accepted")}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
                  >
                    <FaCheckCircle /> Accept
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, "Rejected")}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-red-600 rounded hover:bg-gray-400 transition font-semibold"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </>
              )}

              {/* Complete button after booking time */}
              {userRole !== "user" && isBookingCompletable(b) && b.status === "Accepted" && (
                <button
                  onClick={() => handleComplete(b.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold"
                >
                  <FaCheckCircle /> Complete
                </button>
              )}
            </div>

            {/* Review / Rating Form */}
            {b.showReview && (
              <div className="mt-4 p-3 border-t border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">Leave a Review & Rating:</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer hover:scale-110 transition ${star <= b.rating ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setBookings(prev =>
                        prev.map(booking =>
                          booking.id === b.id ? { ...booking, rating: star } : booking
                        )
                      )}
                    />
                  ))}
                </div>
                <textarea
                  value={b.comment}
                  onChange={(e) => setBookings(prev =>
                    prev.map(booking =>
                      booking.id === b.id ? { ...booking, comment: e.target.value } : booking
                    )
                  )}
                  placeholder="Write your review..."
                  className="w-full mt-2 p-2 border rounded"
                />
                <button
                  onClick={() => submitReview(b.id, b.providerId, b.rating, b.comment)}
                  className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
