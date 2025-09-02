// src/Components/CookieConsent.jsx
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between shadow-lg z-50">
      <p className="text-sm">
        We use cookies to improve your experience. By continuing, you accept our{" "}
        <a href="/cookies" className="underline text-orange-400">
          cookie policy
        </a>.
      </p>
      <button
        onClick={acceptCookies}
        className="mt-2 sm:mt-0 px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition"
      >
        Accept
      </button>
    </div>
  );
}
