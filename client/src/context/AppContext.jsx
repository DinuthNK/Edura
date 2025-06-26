import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets"; 
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {  
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();

  const {getToken} = useAuth()
  const {user}  = useUser()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  // Fetch all courses

  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Calculate average rating of a course
  const calculateRating = (course) => {
    if (!course || !course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    const totalRating = course.courseRatings.reduce((sum, r) => sum + r.rating, 0);
    return totalRating / course.courseRatings.length;
  }

  // Calculate course chaptertime

  const calculateChapterTime = (chapter)=>{
    let time = 0
    chapter.chapterContent.map((lecture)=> time += lecture.lectureDuration)
    return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
  }

  //calculate Course Duration
  const calculateCourseDuration = (course)=> {
    let time = 0
    course.courseContent.map((chapter)=> chapter.chapterContent.map((lecture) => time += lecture.lectureDuration ))
    return humanizeDuration(time * 60 * 1000, {units: ["h","m"]})
  }

  // function to No of lecture in the course

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0
    course.courseContent.forEach(chapter => {
      if(Array.isArray(chapter.chapterContent)){
        totalLectures += chapter.chapterContent.length
      }
    });
    return totalLectures;
  }

// fetch user enrolled courses
const fetchUserEnrolledCourses = async () => {
  setEnrolledCourses(dummyCourses);
};


  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);


  const logToken = async ()=>{
    console.log(await getToken());
  } 

  useEffect(() => {
    if (user) {
      logToken();
  
      const role = user.publicMetadata?.role;
      if (role === 'educator') {
        setIsEducator(true);
      } else {
        setIsEducator(false);
      }
    }
  }, [user]);
  

  const value = {
    currency,
    allCourses,
    navigate,
    isEducator,
    setIsEducator,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses, 
    fetchUserEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
