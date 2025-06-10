import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
      
      {/* Section Heading */}
      <h2 className='text-3x1 font-medium text-gray-800'>Learner Reviews</h2>

      {/* Section Description */}
      <p className='md:text-base text-gray-500 mt-3'>
        Hear directly from our learners as they share their experiences,
        achievements, and how <br /> 
        Edura has helped them grow personally and professionally.
      </p>

      {/* Testimonials Grid */}
      <div className='grid gap-8 mt-14 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
        {dummyTestimonial.map((testimonial, index) => (
          
          // Each Testimonial Card
          <div 
            key={index} 
            className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg
            bg-white shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)] overflow-hidden' // fixed typo in shadow
          > 

            {/* Top section: Profile picture, name, role */}
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
              <img className='h-12 w-12 rounded-full' src={testimonial.image} alt={testimonial.name} />
              <div>
                <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                <p className='text-gray-800/80'>{testimonial.role}</p>
              </div>
            </div>

            {/* Middle section: Star rating and feedback */}
            <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <img 
                    className='h-5' 
                    key={i} 
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
                    alt="Star" 
                  />
                ))}
              </div>

              <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
            </div>

            {/* Read More Link */}
            <a href="#" className='text-blue-500 underline px-5'>Read more</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
