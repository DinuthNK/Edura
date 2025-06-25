import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const FeatureHero = () => {
  const images = [
    assets.course_1_thumbnail,
    assets.course_2_thumbnail,
    assets.course_3_thumbnail,
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
    <div className="relative w-full flex flex-col md:flex-row items-center justify-center bg-white py-14 px-6 md:px-24 gap-10">

      {/* Text Section */}
      <div className="w-full md:w-1/2">
        <div className="bg-white border-2 border-purple-500 rounded-xl p-10 max-w-md md:max-w-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
            Skills that drive you forward
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Technology and the world of work change fast — with us, you're faster. Get the skills to achieve goals and stay competitive.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center group max-w-lg">
        <img 
          src={images[currentIndex]} 
          alt="Learning" 
          className="max-w-full rounded-xl transition-shadow duration-500 group-hover:shadow-[0_0_20px_rgba(128,90,213,0.6)]"
        />

        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          aria-label="Previous Image"
          className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-10 bg-purple-100 text-purple-700 hover:bg-purple-300 hover:text-purple-900 p-3 rounded-full shadow-md transition"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          aria-label="Next Image"
          className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-10 bg-purple-100 text-purple-700 hover:bg-purple-300 hover:text-purple-900 p-3 rounded-full shadow-md transition"
        >
          &#8594;
        </button>
      </div>

    </div>
  );
};

export default FeatureHero;
