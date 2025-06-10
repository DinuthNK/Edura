import React, { useEffect, useState } from 'react'

/**
 * Rating Component
 * Props:
 * - initialRating: number (initial star rating value)
 * - onRate: function (callback when a star is clicked)
 */
const Rating = ({ initialRating, onRate }) => {
  // State to manage current rating
  const [rating, setRating] = useState(initialRating || 0)

  // Handle click on a star
  const handleRating = (value) => {
    setRating(value)
    if (onRate) onRate(value)
  }

  // Update rating when initialRating changes
  useEffect(() => {
    if (initialRating) {
      setRating(initialRating)
    }
  }, [initialRating])

  return (
    <div>
      {/* Render 5 stars */}
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? 'text-yellow-500' : 'text-gray-400'
            }`}
            onClick={() => handleRating(starValue)}
          >
            &#9733; {/* Unicode star character */}
          </span>
        )
      })}
    </div>
  )
}

export default Rating
