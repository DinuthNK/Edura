import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchCourseData = async () => {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse || null);
    };

    fetchCourseData();
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!courseData) return <Loading />;

  const rating = calculateRating(courseData);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-purple-900/90 to-purple-700/90 text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold">{courseData.courseTitle}</h1>
        <p
          className="md:text-lg text-sm max-w-3xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription?.slice(0, 250) }}
        />
      </div>

      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left bg-purple-50 text-gray-800">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-purple-600/80"></div>

        {/* Left Column */}
        <div className="max-w-xl z-10">
          {/* Course Summary */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-10 border border-purple-300">
            <h2 className="text-2xl font-semibold text-purple-800 mb-3">Course Overview</h2>

            {/* Rating */}
            <div className="flex items-center space-x-3 mb-5 text-purple-700">
              <p className="text-xl font-semibold">{rating.toFixed(1)}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.round(rating) ? assets.star : assets.star_blank}
                    alt=""
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <p className="underline cursor-default">
                {courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? 'reviews' : 'review'}
              </p>
              <p className="ml-auto font-medium">
                {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'learners' : 'learner'}
              </p>
            </div>

            <p className="text-sm text-purple-700 mb-8">
              Created by{' '}
              <span className="text-purple-900 font-semibold underline cursor-pointer">
                Dinuth Nadeepa
              </span>
            </p>

            {/* Course Structure */}
            <h3 className="text-xl font-semibold text-purple-800 mb-5">Course Content</h3>
            <div>
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="mb-4 rounded-md border border-purple-300 bg-white shadow-sm">
                  <button
                    onClick={() => toggleSection(index)}
                    className="w-full flex justify-between items-center px-5 py-3 cursor-pointer select-none font-medium text-purple-800 hover:bg-purple-100 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className={`transform transition-transform duration-300 ${
                          openSections[index] ? 'rotate-180' : ''
                        }`}
                        src={assets.down_arrow_icon}
                        alt="toggle arrow"
                      />
                      <span>{chapter.chapterTitle}</span>
                    </div>
                    <span className="text-sm text-purple-600">
                      {chapter.chapterContent.length} lectures – {calculateChapterTime(chapter)}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openSections[index] ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <ul className="list-disc pl-12 pr-5 py-3 text-gray-700 border-t border-purple-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-xs md:text-sm text-gray-800">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-4 items-center">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl.split('/').pop(),
                                    })
                                  }
                                  className="text-purple-600 cursor-pointer font-semibold hover:underline"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                  units: ['h', 'm'],
                                  round: true,
                                })}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Course Description */}
            <div className="pt-10 text-gray-800">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Detailed Description</h3>
              <p
                className="rich-text leading-relaxed"
                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            maxWidth: '424px',
            minWidth: '300px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 15px 2px rgba(98, 44, 255, 0.25)', // purple tinted shadow
            borderRadius: '0.5rem',
            overflow: 'hidden',
            zIndex: 10,
            border: '1px solid #c4b5fd', // light purple border
          }}
        >
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt={courseData.courseTitle} />
          )}

          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <img
                className="w-4"
                src={assets.time_left_clock_icon}
                alt="time left clock icon"
              />
              <p className="text-purple-700 font-semibold">
                <span className="font-bold">5 days</span> left at this price
              </p>
            </div>
            <div className="flex gap-4 items-center pt-2">
              <p className="text-purple-900 md:text-3xl font-extrabold">
                {currency}{' '}
                {(courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100).toFixed(2)}
              </p>
              <p className="md:text-lg text-purple-500 line-through">
                {currency}{courseData.coursePrice}
              </p>
              <p className="md:text-lg text-purple-600 font-semibold">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-base gap-6 pt-4 text-purple-700">
              <div className="flex items-center gap-2">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-5 w-px bg-purple-300"></div>

              <div className="flex items-center gap-2">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-5 w-px bg-purple-300"></div>

              <div className="flex items-center gap-2">
                <img src={assets.lesson_icon} alt="lessons icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button
              className={`mt-6 w-full py-3 rounded ${
                isAlreadyEnrolled ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
              } text-white font-semibold transition-colors duration-300`}
              disabled={isAlreadyEnrolled}
            >
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>

            <div className="pt-8">
              <h4 className="text-xl font-semibold text-purple-900 mb-3">What You Will Gain</h4>
              <ul className="ml-5 list-disc text-purple-700 text-sm md:text-base space-y-1">
                <li>Unlimited lifetime access with updates</li>
                <li>Expert-led tutorials and guidance</li>
                <li>Downloadable resources and materials</li>
                <li>Certificate of completion</li>
                <li>Access on any device anytime</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetails;
