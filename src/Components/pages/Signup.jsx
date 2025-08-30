import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../Service/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowRight, FaArrowLeft, FaCheck, FaUser, FaEnvelope, FaLock, FaDog, FaMapMarkerAlt, FaPhone, FaInfoCircle, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- Step 1: Account Info ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  // --- Sitter Info ---
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [area, setArea] = useState("");
  const [petType, setPetType] = useState("");
  const [petSize, setPetSize] = useState("");
  const [plantWatering, setPlantWatering] = useState(false);
  const [availabilityDays, setAvailabilityDays] = useState([]);
  const [availabilityDates, setAvailabilityDates] = useState([]);
  const [rate, setRate] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  // Cloudinary
  const CLOUD_NAME = "dire6mcvq";
  const UPLOAD_PRESET = "Providers";

  const serviceOptions = ["Dog Walking", "Pet Sitting", "Pet Boarding"];
  const petTypeOptions = ["Dog", "Cat", "Bird", "Rabbit"];
  const areaOptions = ["Nicosia", "Larnaca", "Limassol", "Paphos", "Famagusta"];
  const petSizeOptions = ["Small", "Medium", "Large"];
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // --- Navigation ---
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const toggleDay = day =>
    setAvailabilityDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role,
        sitterProfileCompleted: role === "user",
        createdAt: serverTimestamp(),
      });

      if (role === "sitter") {
        if (!photo) {
          setLoading(false);
          return alert("Please upload a profile photo!");
        }

        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", UPLOAD_PRESET);
        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        const photoURL = cloudinaryRes.data.secure_url;

        const providerRef = await addDoc(collection(db, "Providers"), {
          userId: user.uid,
          name,
          phone,
          bio,
          serviceType,
          area,
          petType,
          petSize,
          plantWatering,
          availabilityDays,
          availabilityDates,
          rate,
          photoURL,
          averageRating: 0,
          reviewsCount: 0,
          approved: false,
          createdAt: serverTimestamp(),
        });

        await setDoc(
          doc(db, "users", user.uid),
          { sitterProfileCompleted: true, providerId: providerRef.id },
          { merge: true }
        );
      }

      alert("✅ Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-xl space-y-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Step 1: Account Info */}
        {step === 1 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaUser /> Account Info</h2>
            <div className="space-y-3">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full outline-none"/>
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full outline-none"/>
              </div>
              <select value={role} onChange={e=>setRole(e.target.value)} className="w-full border p-2 rounded">
                <option value="user">User</option>
                <option value="sitter">Sitter</option>
              </select>
            </div>
            <button type="button" onClick={handleNext} className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Personal Info */}
        {role === "sitter" && step === 2 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaUser /> Personal Info</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} required className="w-full border p-2 rounded"/>
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaPhone className="text-gray-500 mr-2" />
                <input type="tel" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full outline-none"/>
              </div>
              <textarea placeholder="Short Bio" value={bio} onChange={e=>setBio(e.target.value)} className="w-full border p-2 rounded" rows={3}></textarea>
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded"><FaArrowLeft className="inline mr-2"/> Back</button>
              <button type="button" onClick={handleNext} className="bg-orange-500 text-white px-4 py-2 rounded">Next <FaArrowRight className="inline ml-2"/></button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Service Info */}
        {role === "sitter" && step === 3 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaDog /> Service Info</h2>
            <div className="space-y-3">
              <select value={serviceType} onChange={e=>setServiceType(e.target.value)} required className="w-full border p-2 rounded">
                <option value="">Select Service</option>
                {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={petType} onChange={e=>setPetType(e.target.value)} className="w-full border p-2 rounded">
                <option value="">Select Pet Type</option>
                {petTypeOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={petSize} onChange={e=>setPetSize(e.target.value)} className="w-full border p-2 rounded">
                <option value="">Select Pet Size</option>
                {petSizeOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <select value={area} onChange={e=>setArea(e.target.value)} required className="w-full border p-2 rounded">
                <option value="">Select Area</option>
                {areaOptions.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={plantWatering} onChange={e=>setPlantWatering(e.target.checked)} className="w-4 h-4"/>
                <span>Offer Plant Watering</span>
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded"><FaArrowLeft className="inline mr-2"/> Back</button>
              <button type="button" onClick={handleNext} className="bg-orange-500 text-white px-4 py-2 rounded">Next <FaArrowRight className="inline ml-2"/></button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Availability & Rates */}
        {role === "sitter" && step === 4 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaInfoCircle /> Availability & Rates</h2>
            <div className="mb-2">
              <span className="font-medium block">Recurring Days:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {weekdays.map(day => (
                  <button type="button" key={day} onClick={()=>toggleDay(day)} className={`px-3 py-1 rounded ${availabilityDays.includes(day) ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}>{day}</button>
                ))}
              </div>
            </div>
            <div className="mb-2">
              <span className="font-medium block">Specific Dates:</span>
              <DayPicker mode="multiple" selected={availabilityDates} onSelect={setAvailabilityDates} numberOfMonths={2} className="border rounded p-2"/>
            </div>
            <input type="text" placeholder="Rate (e.g., $15/hour)" value={rate} onChange={e=>setRate(e.target.value)} className="w-full border p-2 rounded"/>
            <div className="flex justify-between mt-4">
              <button type="button" onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded"><FaArrowLeft className="inline mr-2"/> Back</button>
              <button type="button" onClick={handleNext} className="bg-orange-500 text-white px-4 py-2 rounded">Next <FaArrowRight className="inline ml-2"/></button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Photo Upload */}
        {role === "sitter" && step === 5 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FaCamera /> Profile Photo</h2>
            <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files[0])} required className="mb-4"/>
            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded"><FaArrowLeft className="inline mr-2"/> Back</button>
              <button type="submit" disabled={loading} className="bg-orange-500 text-white px-4 py-2 rounded flex items-center justify-center">
                {loading ? "Submitting..." : "Submit"} <FaCheck className="ml-2"/>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 for normal users */}
        {role === "user" && step === 2 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
              {loading ? "Signing up..." : "Signup"}
            </button>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}
