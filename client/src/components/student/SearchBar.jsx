import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    if(input.trim()) {
      navigate('/course-list/' + input.trim());
    }
  };

  return (
    <form 
      onSubmit={onSearchHandler} 
      className="max-w-xl w-full flex items-center bg-gradient-to-r from-purple-500 to-purple-700 rounded-full shadow-lg overflow-hidden"
    >
      {/* Search Icon */}
      <img 
        src={assets.search_icon} 
        alt="Search Icon" 
        className="w-12 h-12 p-3 bg-purple-800 rounded-l-full"
      />

      {/* Input Field */}
      <input 
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search your courses"
        className="flex-grow h-12 px-4 text-white placeholder-purple-300 bg-transparent outline-none"
      />

      {/* Search Button */}
      <button 
        type="submit" 
        className="bg-white text-purple-700 font-semibold rounded-r-full px-6 py-3 hover:bg-purple-100 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
