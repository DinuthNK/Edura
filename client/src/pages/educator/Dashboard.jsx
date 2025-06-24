import React, { useContext, useEffect, useState } from 'react';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setDashboardData(dummyDashboardData);
  }, []);

  if (!dashboardData) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 p-6 md:p-10">
      {/* === Dashboard Stats Section === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* Enrollments */}
        <div className="bg-white shadow-lg border-l-8 border-purple-600 p-7 rounded-xl flex items-center gap-5 hover:shadow-purple-400 transition-shadow duration-300">
          <div className="bg-purple-200 p-4 rounded-full">
            <img src={assets.patients_icon} alt="enrollments" className="w-9 h-9" />
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-800">
              {dashboardData.enrolledStudentsData.length}
            </p>
            <p className="text-purple-700 font-semibold tracking-wide">Active Student Enrollments</p>
          </div>
        </div>

        {/* Courses */}
        <div className="bg-white shadow-lg border-l-8 border-purple-500 p-7 rounded-xl flex items-center gap-5 hover:shadow-purple-300 transition-shadow duration-300">
          <div className="bg-purple-300 p-4 rounded-full">
            <img src={assets.appointments_icon} alt="courses" className="w-9 h-9" />
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-700">
              {dashboardData.totalCourses}
            </p>
            <p className="text-purple-600 font-semibold tracking-wide">Published Courses</p>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white shadow-lg border-l-8 border-purple-400 p-7 rounded-xl flex items-center gap-5 hover:shadow-purple-200 transition-shadow duration-300">
          <div className="bg-purple-100 p-4 rounded-full">
            <img src={assets.earning_icon} alt="earnings" className="w-9 h-9" />
          </div>
          <div>
            <p className="text-4xl font-extrabold text-purple-600">
              {currency}{dashboardData.totalEarnings}
            </p>
            <p className="text-purple-500 font-semibold tracking-wide">Overall Revenue</p>
          </div>
        </div>
      </div>

      {/* === Latest Enrollments Section === */}
      <div className="bg-white shadow-lg rounded-xl p-8 border border-purple-300">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Recent Student Registrations</h2>

        <div className="divide-y divide-purple-200">
          {dashboardData.enrolledStudentsData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 py-5 hover:bg-purple-50 rounded-lg transition-colors duration-200"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={item.student.imageUrl}
                  alt="Student Avatar"
                  className="w-14 h-14 rounded-full border-2 border-purple-300"
                />
              </div>

              {/* Name and Course */}
              <div className="flex-grow">
                <p className="font-semibold text-purple-700 text-lg">{item.student.name}</p>
                <p className="text-purple-500 text-sm">{item.courseTitle}</p>
              </div>

              {/* Index */}
              <div className="hidden sm:block text-sm text-purple-400 font-mono">#{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
