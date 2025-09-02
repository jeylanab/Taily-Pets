import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import RequestForm from "./Components/RequestForm";
import SitterForm from "./Components/SitterForm";
import BrowseProviders from "./Components/BrowseProviders";
import BookingPage from "./Components/BookingPage";
import Login from "./Components/pages/Login";
import Signup from "./Components/pages/Signup";
import Dashboard from "./Components/pages/Dashboard"; 
import SitterProfile from "./Components/SitterProfile";
import SitterRequests from "./Components/SitterRequests"; 
import Footer from "./Components/Footer";
import BookingFormPage from "./Components/BookingFormPage";
// Admin imports (standalone pages)
import AdminBookings from "./Components/Admin/Bookings";
import AdminProviders from "./Components/Admin/Providers";
import AdminRequests from "./Components/Admin/Requests";
import AdminUsers from "./Components/Admin/Users";

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
          <Route path="/book/:id/form" element={<BookingFormPage />} />


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
      <Footer />
    </>
  );
};

export default App;
