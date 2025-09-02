// src/components/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
  getDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, firestore } from "../../Service/firebase";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaPaw,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaListUl,
  FaCommentDots,
} from "react-icons/fa";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("user");
  const [activeChat, setActiveChat] = useState(null); // bookingId of active chat
  const [messages, setMessages] = useState([]); // messages for active chat
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef();

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!auth.currentUser) return;
      try {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role || "user");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
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

        const data = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const bookingData = { id: docSnap.id, ...docSnap.data(), rating: 0, comment: "" };

            // Check if a review already exists for this booking
            const reviewQuery = query(
              collection(firestore, "Reviews"),
              where("bookingId", "==", docSnap.id)
            );
            const reviewSnap = await getDocs(reviewQuery);

            bookingData.showReview = bookingData.status === "Completed" && reviewSnap.empty;

            return bookingData;
          })
        );

        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }

      setLoading(false);
    };

    fetchBookings();
  }, [userRole]);

  // Fetch chat messages in real-time when activeChat changes
  useEffect(() => {
    if (!activeChat) return;

    const messagesRef = collection(firestore, "Chats", activeChat, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [activeChat]);

  const isBookingCompletable = (booking) => {
    const now = new Date();
    const toDate = booking.toDate?.toDate
      ? booking.toDate.toDate()
      : new Date(booking.toDate);

    return now >= toDate && booking.status === "Accepted";
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(firestore, "Bookings", bookingId);
      await updateDoc(bookingRef, { status: newStatus });

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: newStatus, showReview: newStatus === "Completed" } : b
        )
      );
    } catch (err) {
      console.error("Error updating booking status:", err);
    }
  };

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
        prev.map((b) => (b.id === bookingId ? { ...b, showReview: false } : b))
      );
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const sendMessage = async (booking) => {
    if (!newMsg.trim()) return;

    // Create chat document if doesn't exist
    const chatRef = doc(firestore, "Chats", booking.id);
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await addDoc(collection(firestore, "Chats"), {
        id: booking.id,
        participants: [booking.userId, booking.providerId],
      });
    }

    await addDoc(collection(firestore, "Chats", booking.id, "messages"), {
      senderId: auth.currentUser.uid,
      text: newMsg,
      timestamp: serverTimestamp(),
      readBy: [auth.currentUser.uid],
    });

    setNewMsg("");
  };

  if (loading) {
    return (
      <p className="p-10 text-center text-gray-500">Loading dashboard...</p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 font-poppins space-y-6">
      <h1 className="text-3xl font-bold text-orange-500">
        Dashboard ({userRole.toUpperCase()})
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="border border-orange-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            {/* Booking Info & Status */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-orange-500">
                <FaPaw /> {b.serviceType}
              </h2>

              <p className="flex items-center gap-2 text-gray-700">
                <FaCalendarAlt />{" "}
                {b.fromDate?.toDate
                  ? b.fromDate.toDate().toLocaleDateString()
                  : new Date(b.fromDate).toLocaleDateString()}{" "}
                →{" "}
                {b.toDate?.toDate
                  ? b.toDate.toDate().toLocaleDateString()
                  : new Date(b.toDate).toLocaleDateString()}
              </p>

              <p className="flex items-center gap-2 text-gray-700">
                <FaClock /> {b.time} ({b.serviceLength})
              </p>

              {b.bookingMethod && (
                <p className="flex items-center gap-2 text-gray-700">
                  <FaListUl /> Method: {b.bookingMethod}
                </p>
              )}

              <p className="flex items-center gap-2 text-gray-700">
                <FaPaw /> {b.petType} / {b.petSize} ({b.petNumber || 1} pets)
              </p>

              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <span
                  className={`font-semibold ${
                    b.status === "Pending"
                      ? "text-yellow-500"
                      : b.status === "Accepted"
                      ? "text-green-500"
                      : b.status === "Completed"
                      ? "text-blue-500"
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
                </>
              )}
            </div>

            {/* Actions */}
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

              {userRole !== "user" &&
                isBookingCompletable(b) &&
                b.status === "Accepted" && (
                  <button
                    onClick={() => updateStatus(b.id, "Completed")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold"
                  >
                    <FaCheckCircle /> Complete
                  </button>
                )}

              {/* Chat toggle button */}
              {(b.status === "Accepted" || b.status === "Completed") && (
                <button
                  onClick={() =>
                    setActiveChat(activeChat === b.id ? null : b.id)
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
                >
                  <FaCommentDots /> Chat
                </button>
              )}
            </div>

            {/* Chat Room */}
            {activeChat === b.id && (
              <div className="mt-4 p-3 border-t border-gray-200 flex flex-col h-64">
                <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded max-w-xs ${
                        msg.senderId === auth.currentUser.uid
                          ? "bg-blue-100 self-end"
                          : "bg-gray-200 self-start"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
                <div className="flex gap-2">
                  <input
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={() => sendMessage(b)}
                    className="px-4 py-2 bg-orange-500 text-white rounded"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Review Form */}
            {b.showReview && (
              <div className="mt-4 p-3 border-t border-gray-200">
                <p className="font-semibold text-gray-700 mb-2">
                  Leave a Review & Rating:
                </p>
                <div className="flex items-center gap-1 text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer hover:scale-110 transition ${
                        star <= b.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() =>
                        setBookings((prev) =>
                          prev.map((booking) =>
                            booking.id === b.id
                              ? { ...booking, rating: star }
                              : booking
                          )
                        )
                      }
                    />
                  ))}
                </div>
                <textarea
                  value={b.comment}
                  onChange={(e) =>
                    setBookings((prev) =>
                      prev.map((booking) =>
                        booking.id === b.id
                          ? { ...booking, comment: e.target.value }
                          : booking
                      )
                    )
                  }
                  placeholder="Write your review..."
                  className="w-full mt-2 p-2 border rounded"
                />
                <button
                  onClick={() =>
                    submitReview(b.id, b.providerId, b.rating, b.comment)
                  }
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
