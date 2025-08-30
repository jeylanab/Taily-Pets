// src/components/Hero.jsx
import React from "react";
import heroImg from "../assets/hero.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="py-10 font-poppins">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">

        {/* Left Content */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-800"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Find{" "}
            <span className="text-orange-500">trusted pet lovers</span> near you.
          </motion.h1>

          <motion.p
            className="mt-4 text-base sm:text-lg text-gray-600 max-w-md mx-auto md:mx-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Taily connects you with caring pet sitters and walkers all over Cyprus.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row sm:justify-start gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
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
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[400px] md:h-[400px] rounded-full overflow-hidden bg-orange-100 flex items-center justify-center shadow-lg">
            <img
              src={heroImg}
              alt="Dog and Cat"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
