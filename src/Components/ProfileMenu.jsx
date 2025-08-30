// src/components/ProfileMenu.jsx
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../Service/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {
  Crown,
  Dog,
  User,
  LogOut,
  BookOpen,
  PawPrint,
  Mail,
  Users,
} from "lucide-react";

const ProfileMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const navigate = useNavigate();

  // Check sitter profile
  useEffect(() => {
    const checkSitterProfile = async () => {
      if (user?.role === "sitter") {
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (!data.sitterProfileCompleted) {
            navigate("/sitter-form");
          } else if (data.providerId) {
            setProviderId(data.providerId);
          }
        }
      }
    };
    checkSitterProfile();
  }, [user, navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };

  // Icon Avatar by role
  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case "sitter":
        return <Dog className="w-6 h-6 text-orange-500" />;
      default:
        return <User className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      {/* Top button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 border border-orange-500 px-3 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition duration-200"
      >
        <span className="font-medium truncate max-w-[100px]">
          {user.displayName || user.email}
        </span>
        {getRoleIcon(user.role)}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-200">
          <p className="px-4 py-2 text-gray-700 text-sm flex items-center gap-2">
            Role:{" "}
            <span className="font-medium capitalize">{user.role || "user"}</span>
          </p>

          {/* User Links (normal users can see their bookings) */}
          {user.role === "user" && (
            <button
              onClick={() => navigate("/my-bookings")}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              <BookOpen className="w-4 h-4" /> My Bookings
            </button>
          )}

          {/* Sitter Links */}
          {user.role === "sitter" && providerId && (
            <>
              <button
                onClick={() => navigate(`/sitter-profile/${providerId}`)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <User className="w-4 h-4" /> My Sitter Profile
              </button>
              <button
                onClick={() => navigate(`/sitter-requests/${providerId}`)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <BookOpen className="w-4 h-4" /> Booking Requests
              </button>
            </>
          )}

          {/* Admin Links */}
          {user.role === "admin" && (
            <>
              <button
                onClick={() => navigate("/admin/bookings")}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <BookOpen className="w-4 h-4" /> Manage Bookings
              </button>
              <button
                onClick={() => navigate("/admin/providers")}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <PawPrint className="w-4 h-4" /> Manage Providers
              </button>
              <button
                onClick={() => navigate("/admin/requests")}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <Mail className="w-4 h-4" /> Manage Requests
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <Users className="w-4 h-4" /> Manage Users
              </button>
            </>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
