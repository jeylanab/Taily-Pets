import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import axios from "axios";
import { FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export default function SitterForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [area, setArea] = useState("");
  const [petType, setPetType] = useState("");
  const [petSize, setPetSize] = useState("");
  const [plantWatering, setPlantWatering] = useState(false);
  const [availabilityDays, setAvailabilityDays] = useState([]); // recurring days
  const [availabilityDates, setAvailabilityDates] = useState([]); // specific dates
  const [rate, setRate] = useState("");
  const [photo, setPhoto] = useState(null);

  // Options
  const serviceOptions = ["Dog Walking", "Pet Sitting", "Pet Boarding"];
  const petTypeOptions = ["Dog", "Cat", "Bird", "Other"];
  const petSizeOptions = ["Small", "Medium", "Large"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Cloudinary config
  const CLOUD_NAME = "dire6mcvq";
  const UPLOAD_PRESET = "Providers";

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // Toggle recurring day
  const toggleDay = (day) => {
    setAvailabilityDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return alert("Please upload a photo!");
    setLoading(true);

    try {
      // Upload photo
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const photoURL = cloudinaryResponse.data.secure_url;

      // Save to Firestore
      await addDoc(collection(firestore, "Providers"), {
        name, email, phone, bio,
        serviceType, petType, petSize, area,
        plantWatering, availabilityDays, availabilityDates, rate,
        photoURL,
        averageRating: 0, reviewsCount: 0,
        approved: false, createdAt: serverTimestamp(),
      });

      alert("✅ Thank you! We’ll review your info and get in touch soon.");
      setStep(1);
      setName(""); setEmail(""); setPhone(""); setBio("");
      setServiceType(""); setArea(""); setPetType(""); setPetSize("");
      setPlantWatering(false); setAvailabilityDays([]); setAvailabilityDates([]);
      setRate(""); setPhoto(null);

    } catch (err) {
      console.error("Cloudinary / Firestore error:", err.response || err.message || err);
      alert("❌ Error submitting sitter registration.");
    }

    setLoading(false);
  };

  return (
    <form className="mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 max-w-2xl">
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-4">
        {[1,2,3,4,5].map((s) => (
          <div key={s} className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= s ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}>
            {step === s ? <FaArrowRight /> : <span>{s}</span>}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Personal Info</h2>
          <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required className="w-full border p-2 rounded mb-2"/>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full border p-2 rounded mb-2"/>
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} required className="w-full border p-2 rounded mb-2"/>
          <textarea placeholder="Short Bio" value={bio} onChange={(e)=>setBio(e.target.value)} className="w-full border p-2 rounded mb-2" rows={3}></textarea>
          <div className="flex justify-end">
            <button type="button" onClick={handleNext} className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Next <FaArrowRight className="ml-2"/>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Service Selection */}
      {step === 2 && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Service Info</h2>
          <select value={serviceType} onChange={(e)=>setServiceType(e.target.value)} required className="w-full border p-2 rounded mb-2">
            <option value="">Select Service</option>
            {serviceOptions.map((s)=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={petType} onChange={(e)=>setPetType(e.target.value)} className="w-full border p-2 rounded mb-2">
            <option value="">Select Pet Type</option>
            {petTypeOptions.map((p)=> <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={petSize} onChange={(e)=>setPetSize(e.target.value)} className="w-full border p-2 rounded mb-2">
            <option value="">Select Pet Size</option>
            {petSizeOptions.map((p)=> <option key={p} value={p}>{p}</option>)}
          </select>
          <div className="flex justify-between">
            <button type="button" onClick={handleBack} className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              <FaArrowLeft className="mr-2"/> Back
            </button>
            <button type="button" onClick={handleNext} className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Next <FaArrowRight className="ml-2"/>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Location & Extras */}
      {step === 3 && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Location & Extras</h2>
          <input type="text" placeholder="Area" value={area} onChange={(e)=>setArea(e.target.value)} required className="w-full border p-2 rounded mb-2"/>
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" checked={plantWatering} onChange={(e)=>setPlantWatering(e.target.checked)} className="w-4 h-4"/>
            <span>Offer Plant Watering</span>
          </label>
          <div className="flex justify-between">
            <button type="button" onClick={handleBack} className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              <FaArrowLeft className="mr-2"/> Back
            </button>
            <button type="button" onClick={handleNext} className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Next <FaArrowRight className="ml-2"/>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Availability & Rates (with calendar) */}
      {step === 4 && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Availability & Rates</h2>
          <div className="mb-2">
            <span className="font-medium mb-1 block">Recurring Days:</span>
            <div className="flex space-x-2">
              {weekdays.map(day => (
                <button type="button" key={day} onClick={()=>toggleDay(day)}
                  className={`px-3 py-1 rounded ${availabilityDays.includes(day) ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <span className="font-medium mb-1 block">Specific Dates:</span>
            <DayPicker
              mode="multiple"
              selected={availabilityDates}
              onSelect={setAvailabilityDates}
              numberOfMonths={2}
              className="border rounded p-2"
            />
          </div>

          <input type="text" placeholder="Rate (e.g., $15/hour)" value={rate} onChange={(e)=>setRate(e.target.value)} className="w-full border p-2 rounded mb-2"/>

          <div className="flex justify-between">
            <button type="button" onClick={handleBack} className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              <FaArrowLeft className="mr-2"/> Back
            </button>
            <button type="button" onClick={handleNext} className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Next <FaArrowRight className="ml-2"/>
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 5: Upload Photo & Submit */}
      {step === 5 && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Profile Photo</h2>
          <input type="file" accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} required className="w-full mb-4"/>
          <div className="flex justify-between">
            <button type="button" onClick={handleBack} className="flex items-center bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
              <FaArrowLeft className="mr-2"/> Back
            </button>
            <button onClick={handleSubmit} disabled={loading} className="flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              {loading ? "Submitting..." : "Submit"} <FaCheck className="ml-2"/>
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
