import React, { useState } from "react";

export default function CookiesPolicy() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white text-gray-800 font-sans leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">Cookies Policy</h1>
      <p className="mb-4"><strong>Last updated:</strong> May 22nd, 2024</p>

      <p className="mb-4">
        We are <strong>TheReal Estate</strong>, a digital real estate platform (“TheReal Estate”). This cookies policy applies to our website (<a href="https://www.therealestate.com" className="text-blue-600 hover:underline">www.therealestate.com</a>) and all related websites, apps and services (together, the “Service”).
      </p>

      <p className="mb-4">
        To provide a great product experience and for certain features, we use cookies and similar technologies. Cookies are small text files stored on your device. Below you’ll find an overview of the categories of cookies we use, their purposes, and retention periods.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. What are cookies &amp; similar technologies?</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>SDKs:</strong> Used in our mobile apps to gather app-specific data.</li>
        <li><strong>Log files:</strong> Collected from your browser/device to improve services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Categories of cookies</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Session cookies</strong> – deleted when you close your browser.</li>
        <li><strong>Persistent cookies</strong> – stay after the browser is closed.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. What cookies do we use?</h2>
      <ul className="list-disc list-inside mb-6 space-y-3">
        <li><strong>Strictly Necessary:</strong> login, privacy preferences, form access.</li>
        <li><strong>Performance:</strong> track visits & improve site performance.</li>
        <li><strong>Functional:</strong> enable personalization and enhanced UX.</li>
        <li><strong>Targeting:</strong> deliver relevant ads, avoid duplicates.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Targeted advertising</h2>
      <p className="mb-4">
        Advertising partners may use cookies to show you relevant ads across the web. These cookies don’t contain personal identifiers unless you’ve provided them.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. How to control cookies</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        onClick={() => setShowSettings(!showSettings)}
      >
        {showSettings ? "Hide Cookie Settings" : "Show Cookie Settings"}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showSettings ? "max-h-[500px] mt-4" : "max-h-0"
        }`}
      >
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
          <li>Manage cookies through your browser (Chrome, Firefox, Safari, etc).</li>
          <li>Use opt-out tools like <a className="text-blue-600 hover:underline" href="https://www.aboutads.info/choices">AboutAds</a> or <a className="text-blue-600 hover:underline" href="https://youronlinechoices.com">YourOnlineChoices</a>.</li>
          <li>Disable personalized ads on your mobile device via system settings.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Changes to this policy</h2>
      <p className="mb-4">
        We may update this policy occasionally. Check this page for the latest version.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact us</h2>
      <p className="mb-1">Email: <a href="mailto:privacy@therealestate.com" className="text-blue-600 hover:underline">privacy@therealestate.com</a></p>
      <p>Address: TheReal Estate HQ, 123 Main Street, Chennai, Tamil Nadu, India</p>
    </div>
  );
}
