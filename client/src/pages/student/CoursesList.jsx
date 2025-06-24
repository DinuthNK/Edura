import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext)
  const { input } = useParams()
  const [filteredCourse, setFilteredCourse] = useState([])

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses)
    }
  }, [allCourses, input])

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 min-h-screen'>
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-extrabold text-purple-800'>Available Courses</h1>
            <p className='text-purple-600 mt-1'>
              <span
                className='cursor-pointer font-semibold hover:underline'
                onClick={() => navigate('/')}
              >
                Dashboard
              </span>{' '}
              / <span className='text-purple-400'>Course Catalog</span>
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {input && (
          <div className='inline-flex items-center gap-3 px-4 py-2 mt-8 mb-8 border border-purple-300 rounded-md text-purple-700 font-medium shadow-sm'>
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt='Clear search'
              className='cursor-pointer w-5 h-5'
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-6 px-2 md:px-0'>
          {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CoursesList
