import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/logo.png"; // Make sure logo.png is in src/assets/

const Footer = () => {
  return (
    <footer className="text-black">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center py-12">
        
        {/* Left Section: Logo + Description + Social */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Taily Logo" className="h-10 w-10 object-contain" />
            <h2 className="text-2xl font-bold">Taily</h2>
          </div>
          <p className="text-slate-950 text-sm">
            Connecting caring pet sitters and loving pet owners across Cyprus. Trusted, reliable, and fun!
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/profile.php?id=61578942467670" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com/tailypetlovers/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-500 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-500 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="grid grid-cols-2 gap-8">
          {/* Company */}
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-950 mb-2">Company</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:text-gray-500 transition">Home</a></li>
              <li><a href="/sitters" className="hover:text-gray-500 transition">Browse Sitters</a></li>
              <li><a href="/request" className="hover:text-gray-500 transition">Request Help</a></li>
              <li><a href="/join" className="hover:text-gray-500 transition">Join as Provider</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-950 mb-2">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="/terms" className="hover:text-gray-500 transition">Terms & Conditions</a></li>
                <li><a href="/privacy" className="hover:text-gray-500 transition">Privacy Policy</a></li>
                <li><a href="/cookie" className="hover:text-gray-500 transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-950 mb-2">Contact</h3>
              <ul className="space-y-1 text-sm">
                <li>Email: <a href="mailto:hello@taily.com" className="hover:text-gray-500 transition">hello@taily.com</a></li>
                <li>Phone: <a href="tel:+35712345678" className="hover:text-gray-500 transition">+357 123 456 78</a></li>
                <li>Location: Cyprus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 mt-6 py-4 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Taily. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
