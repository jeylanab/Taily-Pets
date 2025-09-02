import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "../Service/firebase";

export const useChatMessages = (bookingId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, "chats", bookingId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [bookingId]);

  return messages;
};
