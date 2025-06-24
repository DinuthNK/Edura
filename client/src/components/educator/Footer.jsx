import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 border-t border-purple-600 py-3 bg-purple-50">
      
      {/* Left side: Logo and copyright */}
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo3} alt="Logo" />
        <div className="hidden md:block h-7 w-px bg-purple-400/70"></div>
        <p className="text-xs md:text-sm text-purple-700">
          © 2025 Edura. All rights reserved.
        </p>
      </div>
      
      {/* Right side: Social icons */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity duration-200">
          <img src={assets.facebook_icon} alt="Facebook" className="filter-purple" />
        </a>
        <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity duration-200">
          <img src={assets.twitter_icon} alt="Twitter" className="filter-purple" />
        </a>
        <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity duration-200">
          <img src={assets.instagram_icon} alt="Instagram" className="filter-purple" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
