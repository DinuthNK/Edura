import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const FeatureHero = () => {
  const images = [
    assets.course_1_thumbnail,
    assets.course_2_thumbnail,
    assets.course_3_thumbnail,
    // Add more images if you want
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full flex flex-col md:flex-row items-center justify-center bg-white py-12 px-6 md:px-20">

      {/* Text Section */}
      <div className="w-full md:w-1/2 mb-10 md:mb-0">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md md:max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            Skills that drive you forward
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            Technology and the world of work change fast — with us, you're faster. Get the skills to achieve goals and stay competitive.
          </p>

        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center">
        <img 
          src={images[currentIndex]} 
          alt="Learning" 
          className="max-w-full md:max-w-lg rounded-md transition-all duration-500"
        />

        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="hidden md:flex absolute left-0 -translate-x-14 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="hidden md:flex absolute right-0 translate-x-14 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          &#8594;
        </button>
      </div>

    </div>
  );
}

export default FeatureHero;
