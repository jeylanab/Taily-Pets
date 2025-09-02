import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../Service/firebase";

export default function ChatList({ onSelectChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(firestore, "Chats"),
        where("participants", "array-contains", auth.currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatData);
    };

    fetchChats();
  }, []);

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectChat(chat.id, chat.participants)}
        >
          Chat with {chat.participants.filter(id => id !== auth.currentUser.uid)[0]}
        </div>
      ))}
    </div>
  );
}
