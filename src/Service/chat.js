import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "./firebase";

export const sendMessage = async (bookingId, senderId, text, userIds) => {
  const chatRef = doc(firestore, "chats", bookingId);

  // Create chat if it doesn't exist
  await setDoc(
    chatRef,
    { bookingId, users: userIds, lastMessage: text, lastTimestamp: serverTimestamp() },
    { merge: true }
  );

  // Add message to messages subcollection
  await addDoc(collection(firestore, "chats", bookingId, "messages"), {
    senderId,
    text,
    timestamp: serverTimestamp(),
    read: false,
  });
};
