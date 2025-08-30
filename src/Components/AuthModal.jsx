import React, { useState } from "react";
import { auth, firestore } from "../Service/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "./Context/UserContext";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role: user
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // signup
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(firestore, "users", userCred.user.uid), {
          email,
          role,
        });
      }
      onClose(); // close modal
    } catch (err) {
      console.error("Auth error:", err.message);
      alert(err.message);
    }
  };

  if (user) return null; // don't show if already logged in

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="user">User</option>
              <option value="sitter">Sitter</option>
            </select>
          )}

          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p
          className="text-sm text-center mt-3 cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </p>
        <button
          onClick={onClose}
          className="mt-3 w-full bg-gray-200 p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
