// src/components/Features.jsx
import { motion } from "framer-motion";
import { PawPrint, Calendar, Star, ShieldCheck, MapPin, Users } from "lucide-react";

const features = [
  {
    icon: PawPrint,
    title: "Pet-Friendly Services",
    description:
      "Choose from dog walking, pet sitting, boarding, and more — tailored for every pet type and size.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description:
      "Seamlessly book trusted providers with flexible scheduling that fits your lifestyle.",
  },
  {
    icon: Star,
    title: "Top-Rated Sitters",
    description:
      "Browse sitters with verified reviews and ratings from the Taily community.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Your pet’s safety is our priority — every provider is vetted and approved.",
  },
  {
    icon: MapPin,
    title: "Local & Convenient",
    description:
      "Find trusted providers near your area, ready to care for your pets close to home.",
  },
  {
    icon: Users,
    title: "Community of Pet Lovers",
    description:
      "Join a growing family of pet owners and sitters who truly care.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 ">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-orange-500">Taily</span>?
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We make pet care simple, reliable, and stress-free — for both you and your furry friends.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-orange-200 rounded-2xl shadow-md hover:shadow-xl p-8 flex flex-col items-center text-center transition-all"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-6">
                  <Icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
