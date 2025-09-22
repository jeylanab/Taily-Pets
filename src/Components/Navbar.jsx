// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../Service/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfileMenu from "./ProfileMenu";
import logo from "../assets/logoe.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Caregiver", href: "/sitters" },
    { name: "Request", href: "/request" },
    { name: "Blogs", href: "/blogs" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.exists() ? docSnap.data() : {};
        setCurrentUser({ ...user, role: userData.role });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed w-full top-0 z-50 py-4 font-poppins">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center bg-white rounded-2xl shadow-md px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Taily Logo" className="h-12 w-auto" />
            <span className="text-xl font-semibold text-gray-800">Taily</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                className="text-gray-600 hover:text-orange-500 transition font-medium"
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex space-x-4">
            {currentUser ? (
              <ProfileMenu user={currentUser} />
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white rounded-xl shadow-md mx-4 mt-2">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                to={href}
                className="block text-gray-600 hover:text-orange-500 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </Link>
            ))}

            {currentUser ? (
              <ProfileMenu user={currentUser} />
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center border border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
