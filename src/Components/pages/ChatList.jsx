import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { firestore } from "../../Service/firebase";
import { useNavigate } from "react-router-dom";

export default function ChatList({ currentUser }) {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const field = currentUser.role === "user" ? "userId" : "sitterId";
    const q = query(
      collection(firestore, "bookings"),
      where(field, "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [currentUser.uid, currentUser.role]);

  return (
    <div className="space-y-2">
      {bookings.map((b) => {
        const otherUserId = currentUser.role === "user" ? b.sitterId : b.userId;
        return (
          <div
            key={b.id}
            className="border p-3 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/chat/${b.id}`)}
          >
            <p className="font-medium">Chat with: {otherUserId}</p>
            <p className="text-sm text-gray-500">Booking Status: {b.status}</p>
          </div>
        );
      })}
    </div>
  );
}
