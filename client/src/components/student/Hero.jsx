import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20
     px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-purple-600/80'>

      <h1 className="md:text-5xl text-2xl relative font-bold text-gray-800 max-w-3xl mx-auto">
        Unlock Your Potential.  
        <span className="text-purple-600"> Learn, Grow, and Succeed with Edura.</span>
        <img src={assets.sketch} alt="sketch" className=" w-25 lg:w-25 md:block hidden absolute -bottom-10 top-1.5 right-4 left-180" />
      </h1>

      <p className='md:block hidden text-neutral-500 max-w-2xl mx-auto'>
        Join thousands of learners worldwide who trust Edura for expert guidance, flexible learning, and real-world skills. Start your journey today!
      </p>
      
      <p className='md:hidden text-neutral-500 max-w-2xl mx-auto'>
        Join learners worldwide who trust Edura for expert guidance, flexible learning, and real-world skills.
      </p>
      
      <SearchBar />
    </div>
  )
}

export default Hero
