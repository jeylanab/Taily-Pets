// src/components/BookingCard.jsx
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaPaw,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
  FaListUl,
} from "react-icons/fa";

export default function BookingCard({
  booking,
  role,
  updateStatus,
  handleComplete,
  submitReview,
  setBookings,
}) {
  const isBookingCompletable = (b) => {
    const now = new Date();
    const toDate = b.toDate?.toDate
      ? b.toDate.toDate()
      : new Date(b.toDate);
    return now >= toDate && b.status === "Accepted";
  };

  return (
    <div
      key={booking.id}
      className="border border-orange-200 rounded-xl p-5 bg-white shadow-md hover:shadow-lg transition flex flex-col justify-between"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-orange-500">
          <FaPaw /> {booking.serviceType}
        </h2>

        {/* Booking Dates */}
        <p className="flex items-center gap-2 text-gray-700">
          <FaCalendarAlt />{" "}
          {booking.fromDate?.toDate
            ? booking.fromDate.toDate().toLocaleDateString()
            : new Date(booking.fromDate).toLocaleDateString()}{" "}
          →{" "}
          {booking.toDate?.toDate
            ? booking.toDate.toDate().toLocaleDateString()
            : new Date(booking.toDate).toLocaleDateString()}
        </p>

        {/* Time */}
        <p className="flex items-center gap-2 text-gray-700">
          <FaClock /> {booking.time} ({booking.serviceLength})
        </p>

        {/* Booking Method */}
        {booking.bookingMethod && (
          <p className="flex items-center gap-2 text-gray-700">
            <FaListUl /> Method: {booking.bookingMethod}
          </p>
        )}

        {/* Pet Info */}
        <p className="flex items-center gap-2 text-gray-700">
          <FaPaw /> {booking.petType} / {booking.petSize} ({booking.petNumber || 1} pets)
        </p>

        {/* Status */}
        <p className="flex items-center gap-2">
          <span className="font-semibold">Status:</span>
          <span
            className={`font-semibold ${
              booking.status === "Pending"
                ? "text-yellow-500"
                : booking.status === "Accepted"
                ? "text-green-500"
                : booking.status === "Completed"
                ? "text-blue-500"
                : "text-red-500"
            }`}
          >
            {booking.status}
          </span>
        </p>

        {/* User details for sitter/admin */}
        {role !== "user" && (
          <>
            <p className="flex items-center gap-2 text-gray-700">
              <FaUser /> {booking.userName} ({booking.userEmail})
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaPhone /> {booking.userContact}
            </p>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {role !== "user" && booking.status === "Pending" && (
          <>
            <button
              onClick={() => updateStatus(booking.id, "Accepted")}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
            >
              <FaCheckCircle /> Accept
            </button>
            <button
              onClick={() => updateStatus(booking.id, "Rejected")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-red-600 rounded hover:bg-gray-400 transition font-semibold"
            >
              <FaTimesCircle /> Reject
            </button>
          </>
        )}

        {role !== "user" &&
          isBookingCompletable(booking) &&
          booking.status === "Accepted" && (
            <button
              onClick={() => handleComplete(booking.id)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-semibold"
            >
              <FaCheckCircle /> Complete
            </button>
          )}
      </div>

      {/* Review Form */}
      {booking.showReview && (
        <div className="mt-4 p-3 border-t border-gray-200">
          <p className="font-semibold text-gray-700 mb-2">
            Leave a Review & Rating:
          </p>
          <div className="flex items-center gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer hover:scale-110 transition ${
                  star <= booking.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() =>
                  setBookings((prev) =>
                    prev.map((b) =>
                      b.id === booking.id ? { ...b, rating: star } : b
                    )
                  )
                }
              />
            ))}
          </div>
          <textarea
            value={booking.comment}
            onChange={(e) =>
              setBookings((prev) =>
                prev.map((b) =>
                  b.id === booking.id ? { ...b, comment: e.target.value } : b
                )
              )
            }
            placeholder="Write your review..."
            className="w-full mt-2 p-2 border rounded"
          />
          <button
            onClick={() =>
              submitReview(
                booking.id,
                booking.providerId,
                booking.rating,
                booking.comment
              )
            }
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}
