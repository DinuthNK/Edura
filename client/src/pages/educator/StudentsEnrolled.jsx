import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledstudents] = useState(null)

  const fetchEnrolledstudents = async () => {
    setEnrolledstudents(dummyStudentEnrolled)
  }

  useEffect(() => {
    fetchEnrolledstudents()
  }, [])

  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-10 p-6 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200'>
      <div className='max-w-5xl w-full mx-auto overflow-hidden rounded-xl bg-white border border-purple-300 shadow-lg'>
        <table className='w-full table-fixed md:table-auto'>
          <thead className='text-purple-900 border-b border-purple-300 text-sm text-left'>
            <tr>
              <th className='px-6 py-4 font-semibold text-center hidden sm:table-cell'>No.</th>
              <th className='px-6 py-4 font-semibold text-center hidden sm:table-cell'>Learner</th>
              <th className='px-6 py-4 font-semibold text-center hidden sm:table-cell'>Enrolled Course</th>
              <th className='px-6 py-4 font-semibold text-center hidden sm:table-cell'>Enrollment Date</th>
            </tr>
          </thead>
          <tbody className='text-purple-700 text-sm'>
            {enrolledStudents.map((item, index) => (
              <tr
                key={index}
                className='border-b border-purple-200 hover:bg-purple-50 transition-colors duration-200'
              >
                <td className='px-6 py-4 text-center hidden sm:table-cell font-mono'>
                  {index + 1}
                </td>
                <td className='md:px-6 px-3 py-4 flex items-center space-x-4'>
                  <img
                    src={item.student.imageUrl}
                    alt={`${item.student.name} avatar`}
                    className='w-10 h-10 rounded-full border-2 border-purple-300'
                  />
                  <span className='truncate font-semibold'>{item.student.name}</span>
                </td>
                <td className='px-6 py-4 truncate font-medium'>{item.courseTitle}</td>
                <td className='px-6 py-4 text-center hidden sm:table-cell'>
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default StudentsEnrolled
