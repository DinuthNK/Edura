import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24px-8 md:px-0'>
     <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Empower your mind, anytime, anywhere</h1>
     <p className='text-gray-500 sm:text-sm'>At Edura, we make learning easy and flexible. Access a wide range of courses from anywhere in the world, 
      on your own schedule. Whether you're starting a new career or improving your skills, 
      <br />Edura is here to support your journey — anytime, anywhere.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-purple-600'>Get started</button>
        <button className='flex items-center gap-2'>Learn more <img src={assets.arrow_icon} alt="arrow_icon" />  </button>
      </div>

    </div>
  )
}

export default CallToAction
