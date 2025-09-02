import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../Service/firebase";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { FaPhone, FaPaw, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const areas = ["Nicosia", "Limassol", "Larnaca", "Paphos", "Famagusta"];
const serviceTypes = ["Dog Walking", "Pet Sitting", "Pet Boarding"];
const petTypes = ["Dog - Small", "Dog - Medium", "Dog - Large", "Cat", "Bird", "Rabbit", "Other"];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SitterProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    area: areas[0],
    serviceTypes: [],
    petTypes: [],
    petSize: "",
    phone: "",
    email: "",
    plantWatering: false,
    rate: "",
    availabilityDays: [],
    availabilityDates: []
  });

  // 🔹 Fetch sitter profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(firestore, "Providers", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const profileData = {
            ...data,
            availabilityDates: data.availabilityDates
              ? data.availabilityDates.map(
                  (d) => new DateObject(new Date(d.seconds * 1000))
                )
              : []
          };
          setProfile(profileData);
          setFormData(profileData);
        }
      } catch (err) {
        console.error("Error fetching sitter profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  // 🔹 Handle text/boolean change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // 🔹 Toggle array fields
  const handleArrayToggle = (field, value) => {
    setFormData((prev) => {
      const updated = prev[field]?.includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...(prev[field] || []), value];
      return { ...prev, [field]: updated };
    });
  };

  // 🔹 Handle recurring days
  const handleDayToggle = (day) => {
    setFormData((prev) => {
      const days = prev.availabilityDays.includes(day)
        ? prev.availabilityDays.filter((d) => d !== day)
        : [...prev.availabilityDays, day];
      return { ...prev, availabilityDays: days };
    });
  };

  // 🔹 Save updates
  const handleSave = async () => {
    try {
      const docRef = doc(firestore, "Providers", id);
      const dataToSave = {
        ...formData,
        availabilityDates: formData.availabilityDates.map((d) =>
          Timestamp.fromDate(d.toDate())
        )
      };
      await updateDoc(docRef, dataToSave);
      setProfile({ ...formData });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        {profile.photoURL && (
          <img
            src={profile.photoURL}
            alt={profile.name}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-orange-500"
          />
        )}
        <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
        {!editMode ? (
          <p className="text-gray-600">{profile.bio}</p>
        ) : (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="border rounded p-2 w-full mb-2"
          />
        )}
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {/* Area */}
        <div className="flex flex-col">
          <label className="font-semibold">Area:</label>
          {editMode ? (
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="border rounded p-2"
            >
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          ) : (
            <span className="flex items-center">
              <FaMapMarkerAlt className="text-orange-500 mr-2" />
              {profile.area}
            </span>
          )}
        </div>

        {/* Service Types (Array) */}
        <div className="flex flex-col">
          <label className="font-semibold">Services:</label>
          {editMode ? (
            <div className="flex flex-wrap gap-3">
              {serviceTypes.map((s) => (
                <label key={s} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.serviceTypes?.includes(s)}
                    onChange={() => handleArrayToggle("serviceTypes", s)}
                    className="mr-1"
                  />
                  {s}
                </label>
              ))}
            </div>
          ) : (
            <span>{profile.serviceTypes?.join(" · ")}</span>
          )}
        </div>

        {/* Pet Types (Array) */}
        <div className="flex flex-col">
          <label className="font-semibold">Pets Accepted:</label>
          {editMode ? (
            <div className="flex flex-wrap gap-3">
              {petTypes.map((p) => (
                <label key={p} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.petTypes?.includes(p)}
                    onChange={() => handleArrayToggle("petTypes", p)}
                    className="mr-1"
                  />
                  {p}
                </label>
              ))}
            </div>
          ) : (
            <span className="flex items-center">
              <FaPaw className="text-orange-500 mr-2" />
              {profile.petTypes?.join(" · ")}
            </span>
          )}
        </div>

        {/* Pet Size */}
        <div className="flex flex-col">
          <label className="font-semibold">Pet Size:</label>
          {editMode ? (
            <input
              type="text"
              name="petSize"
              value={formData.petSize}
              onChange={handleChange}
              className="border rounded p-2"
            />
          ) : (
            <span>{profile.petSize}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="font-semibold">Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded p-2"
            />
          ) : (
            <span className="flex items-center">
              <FaPhone className="text-orange-500 mr-2" />
              {profile.phone}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-semibold">Email:</label>
          <span className="flex items-center">
            <FaEnvelope className="text-orange-500 mr-2" />
            {profile.email}
          </span>
        </div>

        {/* Recurring Days */}
        <div className="flex flex-col col-span-full">
          <label className="font-semibold mb-2">Recurring Days:</label>
          {daysOfWeek.map((day) => (
            <label key={day} className="inline-flex items-center mr-3">
              <input
                type="checkbox"
                checked={formData.availabilityDays.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="mr-1"
              />
              {day}
            </label>
          ))}
        </div>

        {/* Multi-date picker */}
        <div className="flex flex-col col-span-full">
          <label className="font-semibold mb-2">Availability Dates:</label>
          {editMode ? (
            <DatePicker
              value={formData.availabilityDates}
              onChange={(dates) =>
                setFormData((prev) => ({ ...prev, availabilityDates: dates }))
              }
              multiple
              sort
              format="DD/MM/YYYY"
              placeholder="Select dates"
            />
          ) : (
            <span>
              {formData.availabilityDates
                .map((d) => new Date(d.toDate()).toLocaleDateString())
                .join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditMode(false);
                setFormData(profile);
              }}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
