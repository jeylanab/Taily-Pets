import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, firestore } from "../../Service/firebase";

export default function ChatRoom({ chatId, participants }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef();

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(firestore, "Chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    await addDoc(collection(firestore, "Chats", chatId, "messages"), {
      senderId: auth.currentUser.uid,
      text: newMsg,
      timestamp: serverTimestamp(),
      readBy: [auth.currentUser.uid],
    });

    setNewMsg("");
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-full border p-3 rounded">
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.senderId === auth.currentUser.uid ? "bg-blue-100 self-end" : "bg-gray-200 self-start"
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
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
}
