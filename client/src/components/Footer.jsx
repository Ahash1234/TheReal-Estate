import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaLinkedinIn, FaYoutube } from 'react-icons/fa';//goddspeed

export default function Footer() {
  return (
    <footer className="bg-slate-200 text-slate-700 py-6 mt-10 border-t border-slate-300">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <p className="text-sm">&copy; TheRealEstate All Rights Reserved.</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/terms-of-use" className="hover:underline">Terms of Use</Link>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/license" className="hover:underline">License</Link>
          <Link to="/imprint" className="hover:underline">Imprint</Link>
          <Link to="/cookies-policy" className="hover:underline">Cookies Policy</Link>
        </div>
        <div className="flex space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600">
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500">
            <FaInstagram size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:text-blue-400">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="hover:text-red-600">
            <FaPinterestP size={20} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-700">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-600">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
