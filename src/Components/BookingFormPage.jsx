// src/pages/BookingFormPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore } from "../Service/firebase";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function BookingFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [petType, setPetType] = useState("");
  const [petSize, setPetSize] = useState("");
  const [petNumber, setPetNumber] = useState(1);
  const [service, setService] = useState("");
  const [serviceLength, setServiceLength] = useState("1 hour");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingMethod, setBookingMethod] = useState("custom"); // "custom" or "quick"

  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const [submitting, setSubmitting] = useState(false);

  // Options
  const serviceOptions = ["Pet Boarding", "Dog Walking", "Pet Sitting", "Plant Watering"];
  const petTypeOptions = ["Dog", "Cat", "Bird", "Rabbit", "Other"];
  const petSizeOptions = ["Small", "Medium", "Large"];
  const serviceLengthOptions = ["1 hour", "2 hours", "Half-day", "Full-day"];

  // Fetch provider
  useEffect(() => {
    const fetchProvider = async () => {
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
        console.error(err);
      }
      setLoading(false);
    };
    fetchProvider();
  }, [id, navigate]);

  // Prefill user info
  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "");
      setUserEmail(auth.currentUser.email || "");
    }
  }, []);

  // Submit booking
  const handleSubmitBooking = async () => {
    if (!auth.currentUser) {
      alert("⚠️ Please log in to book.");
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
        petType: petType || provider.petType || "Unknown",
        petSize: petSize || provider.petSize || "Unknown",
        petNumber,
        bookingMethod,
        time,
        fromDate: bookingMethod === "custom" ? dateRange[0].startDate : null,
        toDate: bookingMethod === "custom" ? dateRange[0].endDate : null,
        serviceLength: bookingMethod === "quick" ? serviceLength : null,
        notes,
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      alert(`✅ Booking submitted!\nID: ${docRef.id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit booking.");
    }
    setSubmitting(false);
  };

  if (loading) return <p className="p-10 text-center text-gray-500">Loading form...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 font-poppins">
      <h1 className="text-2xl font-bold mb-6">Booking Form for {provider?.name}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitBooking();
        }}
        className="bg-white border rounded-xl p-6 shadow-sm space-y-5"
      >
        {/* User Info */}
        <div>
          <label className="block font-medium mb-1">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Your Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Contact Number</label>
          <input
            type="text"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
            required
            className="w-full border p-3 rounded outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Pet Info */}
        <div>
          <label className="block font-medium mb-1">Pet Type</label>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Pet Type</option>
            {petTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Pet Size</label>
          <select
            value={petSize}
            onChange={(e) => setPetSize(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Pet Size</option>
            {petSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Number of Pets</label>
          <input
            type="number"
            min="1"
            value={petNumber}
            onChange={(e) => setPetNumber(Number(e.target.value))}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Service Info */}
        <div>
          <label className="block font-medium mb-1">Service Type</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="w-full border p-3 rounded"
          >
            <option value="">Select Service</option>
            {serviceOptions.map((srv) => (
              <option key={srv} value={srv}>
                {srv}
              </option>
            ))}
          </select>
        </div>

        {/* Booking Method */}
        <div>
          <label className="block font-medium mb-2">Booking Method</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={bookingMethod === "custom"}
                onChange={() => setBookingMethod("custom")}
              />
              Custom Dates (Calendar)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={bookingMethod === "quick"}
                onChange={() => setBookingMethod("quick")}
              />
              Quick Booking (Duration + Time)
            </label>
          </div>
        </div>

        {/* Custom Dates */}
        {bookingMethod === "custom" && (
          <div>
            <label className="block font-medium mb-1">Select Booking Dates</label>
            <DateRange
              ranges={dateRange}
              onChange={(item) => setDateRange([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={false}
              className="border rounded-lg"
            />
          </div>
        )}

        {/* Quick Booking */}
        {bookingMethod === "quick" && (
          <div className="space-y-3">
            <div>
              <label className="block font-medium mb-1">Duration</label>
              <select
                value={serviceLength}
                onChange={(e) => setServiceLength(e.target.value)}
                className="w-full border p-3 rounded"
              >
                {serviceLengthOptions.map((len) => (
                  <option key={len} value={len}>
                    {len}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Start Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border p-3 rounded"
              />
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block font-medium mb-1">Additional Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            placeholder="Add special instructions for the sitter..."
            className="w-full border p-3 rounded"
          />
        </div>

        {/* Submit */}
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
