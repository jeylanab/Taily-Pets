import { useState, useRef, useEffect } from "react";
import { sendMessage, useChatMessages } from "../Service/chat";

export default function ChatWindow({ currentUser, bookingId, otherUser }) {
  const messages = useChatMessages(bookingId);
  const [text, setText] = useState("");
  const bottomRef = useRef();

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(bookingId, currentUser.uid, text, [currentUser.uid, otherUser.uid]);
    setText("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] border rounded p-4">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-[70%] ${
              msg.senderId === currentUser.uid ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="bg-orange-500 text-white px-4 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
