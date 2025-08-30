// src/components/BookingPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "../Service/firebase";
import { Star, MapPin, PawPrint, Clock, Info } from "lucide-react";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(true);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [serviceLength, setServiceLength] = useState("1 hour");
  const [submitting, setSubmitting] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);

  const serviceOptions = ["Pet Boarding", "Dog Walking", "Pet Sitting", "Plant Watering"];
  const serviceLengthOptions = ["30 minutes", "1 hour", "2 hours", "Half-day", "Full-day"];

  // Fetch provider/sitter data
  useEffect(() => {
    const fetchProvider = async () => {
      setLoadingProvider(true);
      try {
        const docRef = doc(firestore, "Providers", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProvider({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("❌ Sitter not found.");
          navigate("/sitters");
        }
      } catch (err) {
        console.error("Error fetching sitter:", err);
        alert("❌ Failed to fetch sitter.");
      }
      setLoadingProvider(false);
    };

    fetchProvider();
  }, [id, navigate]);

  // Pre-fill logged-in user info
  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "");
      setUserEmail(auth.currentUser.email || "");
    }
  }, []);

  // Submit booking
  const handleSubmitBooking = async () => {
    if (!auth.currentUser) {
      alert("⚠️ Please log in to make a booking.");
      navigate("/login");
      return;
    }

    if (!provider) return;

    setSubmitting(true);
    try {
      const docRef = await addDoc(collection(firestore, "Bookings"), {
        userId: auth.currentUser.uid,
        userName: userName || auth.currentUser.displayName || "Guest",
        userEmail: userEmail || auth.currentUser.email,
        userContact,
        providerId: provider.id,
        providerName: provider.name,
        serviceType: service,
        petType: provider.petType || "Unknown",
        petSize: provider.petSize || "Unknown",
        date: new Date(date),
        time,
        serviceLength,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert(`✅ Booking request submitted!\nBooking ID: ${docRef.id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Failed to submit booking.");
    }
    setSubmitting(false);
  };

  if (loadingProvider) return <p className="p-10 text-center text-gray-500">Loading sitter...</p>;
  if (!provider) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 font-poppins space-y-8">
      <h1 className="text-3xl font-bold mb-6">{provider.name} — Book This Sitter</h1>

      {/* Sitter Info Card */}
      <div className="bg-white rounded-xl shadow-lg border mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <img
            src={provider.photoURL || "/placeholder.png"}
            alt={provider.name}
            className="w-full md:w-48 h-48 object-cover"
          />
          <div className="flex-1 p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">{provider.name}</h2>
            <p className="text-gray-600">{provider.bio}</p>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                <PawPrint size={14} /> {provider.serviceType || "Service"}
              </span>
              <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                <PawPrint size={14} /> {provider.petType || "Pet"} ({provider.petSize || "Size"})
              </span>
              <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                <MapPin size={14} /> {provider.area || "Area"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-yellow-500 mt-2">
              <Star size={16} className="fill-yellow-400" />
              <span className="font-medium">{provider.averageRating?.toFixed(1) || "0.0"}</span>
              <span className="text-gray-400 text-sm">({provider.reviewsCount || 0} reviews)</span>
            </div>

            <div className="mt-2">
              <h4 className="font-semibold text-gray-700 text-sm flex items-center gap-1">
                <Clock size={14} /> Days Available
              </h4>
              <p className="text-gray-600 text-sm">
                {provider.availabilityDays?.join(", ") || "Flexible"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllDetails(!showAllDetails)}
              className="mt-2 text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <Info size={16} /> {showAllDetails ? "Hide Details" : "View All Details"}
            </button>

            {showAllDetails && (
              <div className="mt-3 text-sm text-gray-700 space-y-2">
                <p><span className="font-semibold">Rate:</span> {provider.rate || "Rate on request"}</p>
                <p>
                  <span className="font-semibold">All Available Dates:</span>{" "}
                  {provider.availabilityDates
                    ?.map((d) => new Date(d.seconds * 1000).toLocaleDateString())
                    .join(", ")}
                </p>
                <p><span className="font-semibold">Phone:</span> {provider.phone || "N/A"}</p>
                <p><span className="font-semibold">Email:</span> {provider.email || "N/A"}</p>
                {provider.createdAt && (
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {new Date(provider.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitBooking();
        }}
        className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-900">Your Booking Details</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
          className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
        />

        <input
          type="text"
          placeholder="Contact Number"
          value={userContact}
          onChange={(e) => setUserContact(e.target.value)}
          required
          className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="">Select Service</option>
          {serviceOptions.map((srv, idx) => (
            <option key={idx} value={srv}>{srv}</option>
          ))}
        </select>

        <select
          value={serviceLength}
          onChange={(e) => setServiceLength(e.target.value)}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-orange-400 outline-none"
        >
          {serviceLengthOptions.map((len, idx) => (
            <option key={idx} value={len}>{len}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
        >
          {submitting ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}
