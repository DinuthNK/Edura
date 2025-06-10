import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20
     px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-purple-600/80'>

<h1 className="md:text-5xl text-2xl relative font-bold text-gray-800 max-w-3xl mx-auto">
Learn your way. Grow your future. 
  <span className="text-purple-600"> Only on Edura.</span>
  <img src={assets.sketch} alt="sketch" className=" w-25 lg:w-25 md:block hidden absolute -bottom-10 right-4 left-135" />
</h1>


      <p className='md:block hidden text-neutral-500 max-w-2xl mx-auto'>At Edura, we bring together expert instructors, hands-on learning, and a supportive online community to help you reach your personal and professional goals. Learn at your own pace, anytime, anywhere.</p>
      
      <p className='md:hidden text-neutral-500 max-w-2xl mx-auto'>We bring together world-class instructors,interactive
      content,and a supportive community to help you achieve your persionaland professional goals.</p>
      <SearchBar/>
    </div>
    
  )
}

export default Hero
