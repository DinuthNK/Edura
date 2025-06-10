import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CoursesList from './CoursesList'
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
import FeatureHero from '../../components/student/FeatureHero'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'> 
      <Hero/>
      <FeatureHero/>
      <CoursesSection/>
      <TestimonialsSection/>
      <Companies/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home
