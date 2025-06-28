import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, Navigate, useLocation } from 'react-router-dom';  // Import useLocation
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const {navigate,isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext)
  
  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn,openSignUp,} = useClerk();
  const { user } = useUser();

  const becomeEducator = async ()=>{
        try {
          if(isEducator){
            navigate('/educator')
            return;
          }
          const token = await getToken()
          const {data} = await axios.get(backendUrl + '/api/educator/update-role',
          {headers: {Authorization: `Bearer ${token}`}})

          if(data.success){
            setIsEducator(true)
            toast.success(data.message)
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
  }

      
  return (
    <div className={`h-16 flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-6 border-b border-black-20 py-6 ${isCourseListPage ? 'bg-white' : 'bg-purple-600/80'}`}>
       <img onClick={()=> navigate('/')} src={assets.logo3} alt="Logo"
       className="w-25 lg:w- cursor-pointer" />
      <div className="hidden md:flex items-center gap-3 text-black-1000">
        <div className="flex items-center gap-1">
          {user && (
            <>
              <button className="bg-gray-700 text-white px-5 py-2 rounded-full" onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <Link to='/my-enrollments' className="bg-gray-700 text-white px-5 py-2 rounded-full">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : ( <>
          <button onClick={() => openSignIn()} className="bg-gray-900 text-white px-5 py-2 rounded-full">
            Login
          </button>
          
          <button onClick={() => openSignUp()} className="bg-gray-300 border-bg-gray-600 text-black px-5 py-2 rounded-full">
          SignUp
        </button>
        </>
  
        )}
            </div>
      {/* For Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500/80">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={becomeEducator}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="User Icon" />
          </button>
        )}
      </div>
    </div>

    
  );
};

export default Navbar;
