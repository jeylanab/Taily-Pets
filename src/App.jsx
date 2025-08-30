import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RequestForm from "./components/RequestForm";
import SitterForm from "./components/SitterForm";
import BrowseProviders from "./components/BrowseProviders";
import BookingPage from "./components/BookingPage";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Dashboard from "./components/pages/Dashboard"; 
import SitterProfile from "./components/SitterProfile";
import SitterRequests from "./components/SitterRequests"; 

// Admin imports (standalone pages)
import AdminBookings from "./components/Admin/Bookings";
import AdminProviders from "./components/Admin/Providers";
import AdminRequests from "./components/Admin/Requests";
import AdminUsers from "./components/Admin/Users";

const App = () => {
  // Wrapper to pass providerId from URL param to SitterRequests
  const SitterRequestsWrapper = () => {
    const { providerId } = useParams();
    return <SitterRequests providerId={providerId} />;
  };

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/sitters" element={<BrowseProviders />} />
          <Route path="/blogs" element={<div className="p-10">Blogs Coming Soon...</div>} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/join" element={<SitterForm />} />
          <Route path="/book/:id" element={<BookingPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Sitter Pages */}
          <Route path="/sitter-profile/:id" element={<SitterProfile />} />
          <Route path="/sitter-requests/:providerId" element={<SitterRequestsWrapper />} />

          {/* Admin Pages */}
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/providers" element={<AdminProviders />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
