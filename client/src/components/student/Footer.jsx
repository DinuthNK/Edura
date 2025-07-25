import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
   <footer className=' bg-gray-900 md:px-36 text-left w-full mt-10 bg-gradient-to-b from-purple-900/30'>
    <div className='flex flex-col md:flex-row items-start px-8 md-px-0 justify-center
    gap-10 md:gap-32 py-10 border-b border-white/30'>
      <div className='flex  flex-col md:items-start items-center w-full'>
        <img src={assets.logo_dark} alt="logo " className="w-25 lg:w-25 cursor-pointer" />
        <p className='mt--10 text-center md:text-left text-sm text-white/80'>Edura symbolizes growth, learning, and endless possibilities. 
        We are committed to making education accessible and inspiring learners worldwide.</p>
      </div>
      <div className='flex flex-col md:items-start items-center w-full'>
        <h2 className='font-semibold text-white mb-5'>Company</h2>
        <ul className='flex md:flex-col w-full justify-betweent text-sm text-white/80 md:space-y-2'>
          <li><a href="#">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="..">Contact us</a></li>
          <li><a href="#">Privacy policy</a></li>
        </ul>
      </div>
      <div className='hidden md:flex flex-col items-start w-full'>
      <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
      <p className='text-sm text-white/80'>The latest news, Articles, and resources, sent to your inbox weekly</p>
      <div className='flex items-center gap-2 pt-4'>
        <input type="email" placeholder='Enter your Email' className='border border-gray-500/30bg-gray-8-- text-gray-500
        placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' />
        <button className='bg-purple-600 w-24 h-9 text-white rounded'>Subscribe</button>
      </div>
      </div>
    </div>
    <p className='py-4 text-center text-xs md:text-sm text-white/60'>© 2025 Edura. Empowering learners worldwide. Learn, grow, and succeed with us.</p>
   </footer>
  )
}

export default Footer
