import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div
  className='flex flex-col items-center justify-left w-full  h-200 md:pt-25 pt-20
    px- md:px-0 space-y-7 text-center   bg-gradient-to-b from-purple-600/80
    min-h-screen relative '
  style={{
    backgroundImage: `url(${assets.ime})`,
    backgroundSize: '90% 90%',
    backgroundPosition: '300% 20%',  // shows the bottom of the image
    backgroundRepeat: 'no-repeat',
  }}
>
<SearchBar />
      <h1 className="md:text-5xl md:px-0 text-2xl relative font-bold text-gray-800 max-w-3xl mx-auto">
        Unlock Your Potential.  
        <span className="text-purple-600 space-y-7 "> Learn, Grow, and Succeed with Edura.</span> 
      </h1>
      <p className='md:block hidden text-neutral-500 max-w-2xl mx-auto'>
        Join thousands of learners worldwide who trust Edura for expert guidance, flexible learning, and real-world skills. Start your journey today!
      </p>
      
      <p className='md:hidden  text-neutral-500 max-w-2xl mx-auto  '>
        Join learners worldwide who trust Edura for expert guidance, flexible learning, and real-world skills.
      </p>
      
      
    </div>
  )
}

export default Hero
