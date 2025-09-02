// src/pages/BookingPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import { Star, MapPin, PawPrint, Clock, Info } from "lucide-react";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loadingProvider, setLoadingProvider] = useState(true);
  const [showAllDetails, setShowAllDetails] = useState(false);

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
              {/* Service Types */}
              <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                <PawPrint size={14} />
                {Array.isArray(provider.serviceType) && provider.serviceType.length > 0
                  ? provider.serviceType.join(" • ")
                  : "Service"}
              </span>

              {/* Pet Types */}
              <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                <PawPrint size={14} />
                {Array.isArray(provider.petType) && provider.petType.length > 0
                  ? provider.petType.join(" • ")
                  : "Pet"}{" "}
                ({provider.petSize || "Size"})
              </span>

              {/* Area */}
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Button → Go to Booking Form */}
      <button
        onClick={() => navigate(`/book/${provider.id}/form`)}
        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
      >
        Proceed to Booking
      </button>
    </div>
  );
}
