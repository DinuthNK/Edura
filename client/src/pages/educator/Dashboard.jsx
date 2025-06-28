import React, { useContext, useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '../../assets/assets'; 
import Loading from '../../components/student/Loading'; 
import { AppContext } from '../../context/AppContext'; 
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {

  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  // Simulate fetching dashboard data (replace with API call in production)
  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/educator/dashboard',
      {headers: {Authorization: `Bearer ${token}`}} )

      if(data.success){
        setDashboardData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if(isEducator){
      fetchDashboardData()
    }
    fetchDashboardData();
  }, [isEducator]);

  // If data is loading, show loading spinner
  if (!dashboardData) return <Loading />;

  return (
    <div className='min-h-screen flex flex-col items-start gap-8 md:p-8 p-4 pt-8'>

      {/* === Statistic Cards Section === */}
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>

          {/* Total Enrollments */}
          <div className='flex items-center gap-3 shadow-card border border-purple-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt="enrollments icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className='text-base text-gray-500'>Total Enrolments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className='flex items-center gap-3 shadow-card border border-purple-500 p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt="courses icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboardData.totalCourses}
              </p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className='flex items-center gap-3 shadow-card border border-purple-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="earnings icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {currency}{dashboardData.totalEarnings}
              </p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>

        </div>

        {/* === Latest Enrollments Table === */}
        <div>
          <h2 className="pb-4 text-lg font-medium">Latest Enrolments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>

            <table className="table-fixed md:table-auto w-full overflow-hidden">
              <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>

              <tbody className="text-sm text-gray-500">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-500/20">
                    {/* Serial Number (only visible on sm and above) */}
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      {index + 1}
                    </td>

                    {/* Student Name with Avatar */}
                    <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                      <img
                        src={item.student.imageUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="truncate">{item.student.name}</span>
                    </td>

                    {/* Course Title */}
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
