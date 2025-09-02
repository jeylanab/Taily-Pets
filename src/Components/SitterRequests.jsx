import React, { useEffect, useState, useRef } from "react";
import { firestore } from "../Service/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  orderBy,
  getDoc,
  addDoc,
} from "firebase/firestore";
import {
  FaUser,
  FaPhone,
  FaPaw,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCommentDots,
} from "react-icons/fa";
import { auth } from "../Service/firebase";

export default function SitterRequests({ providerId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // bookingId of active chat
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef();

  // Fetch bookings
  useEffect(() => {
    if (!providerId) return;

    const q = query(collection(firestore, "Bookings"), where("providerId", "==", providerId));
    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        bookings.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds); // latest first
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

  // Fetch chat messages for active booking
  useEffect(() => {
    if (!activeChat) return;

    const messagesRef = collection(firestore, "Chats", activeChat, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [activeChat]);

  const handleStatusChange = async (bookingId, status) => {
    try {
      const docRef = doc(firestore, "Bookings", bookingId);
      await updateDoc(docRef, { status });
    } catch (err) {
      console.error("Error updating booking status:", err);
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
      timestamp: new Date(),
      readBy: [auth.currentUser.uid],
    });

    setNewMsg("");
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

          {/* Actions */}
          <div className="flex md:flex-col mt-4 md:mt-0 md:ml-6 gap-3">
            {req.status === "Pending" && (
              <>
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
              </>
            )}

            {/* Chat toggle for accepted bookings */}
            {req.status === "Accepted" && (
              <button
                onClick={() =>
                  setActiveChat(activeChat === req.id ? null : req.id)
                }
                className="flex items-center gap-2 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                <FaCommentDots /> Chat
              </button>
            )}
          </div>

          {/* Chat window */}
          {activeChat === req.id && (
            <div className="mt-4 p-3 border-t border-gray-200 flex flex-col h-64 w-full">
              <div className="flex-1 overflow-y-auto space-y-2 mb-2">
                {messages.map(msg => (
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
                  onChange={e => setNewMsg(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Type a message..."
                />
                <button
                  onClick={() => sendMessage(req)}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
