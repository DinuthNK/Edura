import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const MyCourses = () => {

  const {currency, allCourses} = useContext(AppContext)

  const [courses, setCourses] = useState(null)
  const fetchEducatorCourses = async() => {
    setCourses(allCourses)
  }

  useEffect(() => {
    fetchEducatorCourses()
  }, [])

  return  courses ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-10 p-6 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200'>
      <div className='w-full max-w-6xl mx-auto'>
        <h2 className="pb-6 text-2xl font-bold text-purple-800 border-b border-purple-300 mb-6">
          My Courses
        </h2>

        <div className='overflow-x-auto bg-white rounded-xl border border-purple-300 shadow-lg'>
          <table className='w-full table-fixed md:table-auto'>
            <thead className="text-purple-900 border-b border-purple-300 text-sm text-left">
              <tr>
                <th className='px-6 py-4 font-semibold truncate'>All courses</th>
                <th className='px-6 py-4 font-semibold truncate'>Earnings</th>
                <th className='px-6 py-4 font-semibold truncate'>Students</th>
                <th className='px-6 py-4 font-semibold truncate'>Published On</th>
              </tr>
            </thead>
            
            <tbody className="text-purple-700 text-sm">
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-purple-200 hover:bg-purple-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 flex items-center space-x-4 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="Course Image"
                      className="w-16 h-10 rounded-md object-cover border border-purple-300"
                    />
                    <span className="truncate hidden md:block font-medium">{course.courseTitle}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                      (course.coursePrice - (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-6 py-4">{course.enrolledStudents.length}</td>
                  <td className="px-6 py-4">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses
