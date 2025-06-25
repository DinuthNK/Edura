import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <section className="pb-16 px-6 md:px-0 max-w-7xl mx-auto rounded-lg">
      
      <h2 className="text-4xl font-semibold text-gray-900 mb-3">
        Learner Reviews
      </h2>

      <p className='md:text-base text-gray-500 mt-12 text-center'>
        Hear directly from our learners as they share their experiences,
        achievements, and how <br /> 
        Edura has helped them grow personally and professionally.
      </p>

      <div className="grid gap-10 mt-10 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {dummyTestimonial.map((testimonial, index) => (
          <article
            key={index}
            className="
              relative bg-white rounded-xl shadow-lg border border-purple-300 
              overflow-hidden flex flex-col
              transition-transform duration-300 ease-in-out
              hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(128,90,213,0.3)]
              group
            "
          >
            <div
              className="
                pointer-events-none
                absolute inset-0
                bg-gradient-to-t from-purple-600 via-purple-400 to-transparent
                opacity-0
                group-hover:opacity-30
                transition-opacity duration-500
                rounded-xl
              "
            ></div>

            <div className="flex items-center gap-4 px-6 py-5 bg-purple-50 relative z-10 rounded-t-xl">
              <img
                className="h-14 w-14 rounded-full object-cover border-2 border-purple-400"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h3 className="text-lg font-semibold text-purple-900">{testimonial.name}</h3>
                <p className="text-purple-700 text-sm">{testimonial.role}</p>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col relative z-10">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5 w-5"
                    key={i}
                    src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                    alt="Star"
                  />
                ))}
              </div>

              <p className="text-purple-900 mt-5 flex-grow">{testimonial.feedback}</p>
            </div>

            <div className="px-6 pb-6 relative z-10">
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 font-medium underline transition-colors duration-200"
              >
                Read more
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
