import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  PawPrint,
  MapPin,
  FileText,
  Check,
  Clock,
  Calendar,
} from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function RequestForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [petType, setPetType] = useState("");
  const [petSize, setPetSize] = useState("");
  const [area, setArea] = useState("");
  const [useCustomRange, setUseCustomRange] = useState(false);
  const [customRange, setCustomRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [accepted, setAccepted] = useState(false); // ✅ terms checkbox
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    "Pet Boarding",
    "Dog Walking",
    "Pet Sitting",
    "Plant Watering",
  ];
  const petOptions = ["Dog", "Cat", "Bird", "Rabbit", "Other"];
  const areaOptions = ["Nicosia", "Larnaca", "Limassol", "Paphos", "Famagusta"];
  const durationOptions = ["1 Hour", "Half Day", "Full Day"];
  const petSizeOptions = ["Small", "Medium", "Large"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepted) {
      alert("⚠️ You must accept the Terms & Conditions before submitting.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(firestore, "Requests"), {
        fullName,
        email,
        serviceType,
        petType,
        petSize,
        area,
        dateInfo: useCustomRange
          ? {
              type: "Custom Range",
              start: customRange[0].startDate.toISOString(),
              end: customRange[0].endDate.toISOString(),
            }
          : {
              type: "Duration",
              value: duration,
            },
        notes,
        createdAt: serverTimestamp(),
        acceptedTerms: true, // ✅ stored in Firestore
      });

      setSubmitted(true);
      setTimeout(() => {
        setFullName("");
        setEmail("");
        setServiceType("");
        setPetType("");
        setPetSize("");
        setArea("");
        setDuration("");
        setCustomRange([
          { startDate: new Date(), endDate: new Date(), key: "selection" },
        ]);
        setUseCustomRange(false);
        setNotes("");
        setAccepted(false);
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
      <h2 className="text-2xl font-bold text-black mb-4 text-center">
        Request a Sitter
      </h2>

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

      {/* Service Type */}
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
            <option key={idx} value={srv}>
              {srv}
            </option>
          ))}
        </select>
      </div>

      {/* Pet Type */}
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
            <option key={idx} value={pet}>
              {pet}
            </option>
          ))}
        </select>
      </div>

      {/* Pet Size */}
      <div className="relative">
        <PawPrint className="absolute left-3 top-3 text-orange-500" size={20} />
        <select
          value={petSize}
          onChange={(e) => setPetSize(e.target.value)}
          required
          className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition bg-white"
        >
          <option value="">Select Pet Size</option>
          {petSizeOptions.map((size, idx) => (
            <option key={idx} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Area */}
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
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Toggle: Custom Range or Duration */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={!useCustomRange}
            onChange={() => setUseCustomRange(false)}
          />
          Predefined Duration
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={useCustomRange}
            onChange={() => setUseCustomRange(true)}
          />
          Custom Date Range
        </label>
      </div>

      {/* Duration or Date Picker */}
      {useCustomRange ? (
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-orange-500" size={20} />
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setCustomRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={customRange}
            className="mt-2"
          />
        </div>
      ) : (
        <div className="relative">
          <Clock className="absolute left-3 top-3 text-orange-500" size={20} />
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full pl-10 p-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition bg-white"
          >
            <option value="">Select Duration</option>
            {durationOptions.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      )}

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

      {/* ✅ Terms & Conditions Checkbox */}
      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-1 w-4 h-4"
        />
        <span>
          I accept the{" "}
          <a href="/terms" target="_blank" className="text-orange-500 underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-orange-500 underline"
          >
            Privacy Policy
          </a>
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || submitted || !accepted}
        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold text-white ${
          loading || submitted || !accepted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading
          ? "Submitting..."
          : submitted
          ? (
            <>
              <Check size={18} /> Submitted
            </>
            )
          : "Submit Request"}
      </button>
    </motion.form>
  );
}
