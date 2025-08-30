// src/components/Hero.jsx
import React from "react";
import heroImg from "../assets/hero.png"; // adjust path if needed
import { Link } from "react-router-dom"; // ✅ use react-router-dom for navigation

const Hero = () => {
  return (
    <section className="bg-orange-50 pt-28 pb-20 font-poppins"> {/* matches navbar height */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Find{" "}
            <span className="text-orange-500">trusted pet lovers</span>{" "}
            near you.
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Taily connects you with caring pet sitters and walkers all over Cyprus.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex space-x-4">
            <Link
              to="/sitters"
              className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition"
            >
              Find Caregiver
            </Link>
            <Link
              to="/request"
              className="px-6 py-3 border border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition"
            >
              Post a Request
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] rounded-full overflow-hidden bg-orange-100 flex items-center justify-center shadow-lg">
            <img
              src={heroImg}
              alt="Dog and Cat"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
