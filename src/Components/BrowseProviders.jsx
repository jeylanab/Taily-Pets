// src/components/BrowseProviders.jsx
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import { motion } from "framer-motion";
import { Star, Calendar, MapPin, PawPrint, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BrowseProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterPetType, setFilterPetType] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const navigate = useNavigate();

  const serviceOptions = ["Dog Walking", "Pet Sitting", "Pet Boarding", "Plant Watering"];
  const petTypeOptions = ["Dog", "Cat", "Bird", "Rabbit"];
  const areaOptions = ["Nicosia", "Larnaca", "Limassol", "Paphos", "Famagusta"];

  const fetchProviders = async () => {
    setLoading(true);
    try {
      // Fetch approved providers
      const q = query(collection(firestore, "Providers"), where("approved", "==", true));
      const snapshot = await getDocs(q);
      let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Fetch all reviews
      const reviewsSnapshot = await getDocs(collection(firestore, "Reviews"));
      const reviews = reviewsSnapshot.docs.map((doc) => doc.data());

      // Calculate average rating for each provider
      data = data.map((provider) => {
        const providerReviews = reviews.filter((r) => r.providerId === provider.id);
        const avgRating =
          providerReviews.length > 0
            ? providerReviews.reduce((acc, r) => acc + r.rating, 0) / providerReviews.length
            : 0;
        return { ...provider, averageRating: avgRating };
      });

      // Apply filters
      if (search) {
        data = data.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.area?.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (filterArea) {
        data = data.filter((p) => p.area?.toLowerCase() === filterArea.toLowerCase());
      }
      if (filterService) {
        data = data.filter(
          (p) => p.serviceType?.some((s) => s.toLowerCase() === filterService.toLowerCase())
        );
      }
      if (filterPetType) {
        data = data.filter(
          (p) => p.petType?.some((pt) => pt.toLowerCase() === filterPetType.toLowerCase())
        );
      }
      if (filterDate) {
        const selectedDate = new Date(filterDate).toDateString();
        data = data.filter((p) =>
          p.availabilityDates?.some(
            (d) => new Date(d.seconds * 1000).toDateString() === selectedDate
          )
        );
      }

      setProviders(data);
    } catch (err) {
      console.error("Error fetching providers:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterArea, filterService, filterPetType, filterDate]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20 font-poppins">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 text-orange-500 leading-tight">
        Browse Trusted Pet Sitters
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-16">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by sitter name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
          />
          <PawPrint className="absolute top-4 right-4 text-gray-400" size={20} />
        </div>

        <select
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
        >
          <option value="">All Areas</option>
          {areaOptions.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
        >
          <option value="">All Services</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={filterPetType}
          onChange={(e) => setFilterPetType(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
        >
          <option value="">All Pet Types</option>
          {petTypeOptions.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-4 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400 outline-none transition"
        />
      </div>

      {/* Providers */}
      {loading ? (
        <p className="text-gray-500 text-center py-16">Loading sitters...</p>
      ) : providers.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No sitters found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {providers.map((p) => {
            const nextDate = p.availabilityDates?.length
              ? new Date(Math.min(...p.availabilityDates.map((d) => d.seconds * 1000)))
              : null;

            return (
              <motion.div
                key={p.id}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-orange-200 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all"
              >
                <img
                  src={p.photoURL || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-6 flex flex-col gap-3">
                  <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <PawPrint size={14} />{" "}
                    {Array.isArray(p.serviceType) ? p.serviceType.join(" • ") : p.serviceType || "Service"} •{" "}
                    {Array.isArray(p.petType) ? p.petType.join(" • ") : p.petType || "Pet"}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin size={14} /> {p.area}
                  </p>

                  {nextDate && (
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Clock size={14} /> Next Available: {nextDate.toLocaleDateString()}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          p.averageRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-600 ml-2">
                      {p.averageRating?.toFixed(1) || "0.0"}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/book/${p.id}`)}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold transition"
                  >
                    <Calendar size={16} /> See Slots
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
