import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import { motion } from "framer-motion";
import { User, Mail, PawPrint, MapPin, Calendar, FileText, Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RequestForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [petType, setPetType] = useState("");
  const [area, setArea] = useState("");
  const [preferredDates, setPreferredDates] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = ["Pet Boarding", "Dog Walking", "Pet Sitting", "Plant Watering"];
  const petOptions = ["Dog", "Cat", "Bird", "Other"];
  const areaOptions = ["Nicosia", "Larnaca", "Limassol", "Paphos", "Famagusta"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(firestore, "Requests"), {
        fullName,
        email,
        serviceType,
        petType,
        area,
        preferredDates: preferredDates ? preferredDates.toISOString() : "",
        notes,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);

      setTimeout(() => {
        setFullName("");
        setEmail("");
        setServiceType("");
        setPetType("");
        setArea("");
        setPreferredDates(null);
        setNotes("");
        setSubmitted(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting request. Please try again.");
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-black/20 space-y-4 font-poppins"
    >
      <h2 className="text-2xl font-bold text-black mb-4 text-center">Request a Sitter</h2>

      {/* Full Name */}
      <div className="relative">
        <User className="absolute left-3 top-3 text-orange-500" size={20} />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-orange-500" size={20} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
        />
      </div>

      {/* Service Type Dropdown */}
      <div className="relative">
        <PawPrint className="absolute left-3 top-3 text-orange-500" size={20} />
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          required
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition bg-white"
        >
          <option value="">Select Service Type</option>
          {serviceOptions.map((srv, idx) => (
            <option key={idx} value={srv}>{srv}</option>
          ))}
        </select>
      </div>

      {/* Pet Type Dropdown */}
      <div className="relative">
        <PawPrint className="absolute left-3 top-3 text-orange-500" size={20} />
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          required
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition bg-white"
        >
          <option value="">Select Pet Type</option>
          {petOptions.map((pet, idx) => (
            <option key={idx} value={pet}>{pet}</option>
          ))}
        </select>
      </div>

      {/* Area / Location Dropdown */}
      <div className="relative">
        <MapPin className="absolute left-3 top-3 text-orange-500" size={20} />
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition bg-white"
        >
          <option value="">Select Area</option>
          {areaOptions.map((loc, idx) => (
            <option key={idx} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Preferred Dates */}
      <div className="relative">
        <Calendar className="absolute left-3 top-3 text-orange-500" size={20} />
        <DatePicker
          selected={preferredDates}
          onChange={(date) => setPreferredDates(date)}
          placeholderText="Select Preferred Date"
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
        />
      </div>

      {/* Notes */}
      <div className="relative">
        <FileText className="absolute left-3 top-3 text-orange-500" size={20} />
        <textarea
          placeholder="Additional Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || submitted}
        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2 font-semibold"
      >
        {loading ? "Submitting..." : submitted ? <><Check size={18} /> Submitted</> : "Submit Request"}
      </button>
    </motion.form>
  );
}
