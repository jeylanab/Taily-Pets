// src/components/Admin/Users.jsx
import React, { useEffect, useState } from "react";
import { firestore } from "../../Service/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, "users"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Badge color mapping
  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return (
          <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs font-medium">
            Admin
          </span>
        );
      case "provider":
        return (
          <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs font-medium">
            Provider
          </span>
        );
      default:
        return (
          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium">
            User
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-poppins">
      <h1 className="text-2xl font-bold mb-6 text-orange-500">All Users</h1>

      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead className="bg-orange-100">
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Role</th>
                <th className="text-left px-4 py-2">Joined At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  whileHover={{ backgroundColor: "#fff7ed" }}
                  className="border-t"
                >
                  <td className="px-4 py-2">{user.fullName || user.displayName || "N/A"}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{getRoleBadge(user.role)}</td>
                  <td className="px-4 py-2">
                    {user.createdAt?.seconds
                      ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                      : "N/A"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
