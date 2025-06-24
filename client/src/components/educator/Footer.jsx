import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 border-t py-1 h-17">
      {/* Left side: Logo and copyright */}
      <div className="flex items-center gap-4">
        <img className="hidden md:block w-20" src={assets.logo3} alt="Logo" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="text-xs md:text-sm text-gray-500">
          © 2025 Edura. All rights reserved.
        </p>
      </div>

      {/* Right side: Social icons */}
      <div className="flex items-center gap-3 mb-4 md:mb-0">
        <a href="#">
          <img src={assets.facebook_icon} alt="Facebook" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="Twitter" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
