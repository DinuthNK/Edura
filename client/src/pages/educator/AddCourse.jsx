import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [courseDescription, setCourseDescription] = useState('');
  const [Image, setImage] = useState(null);
  const [chapters, setChapter] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
    googleQuizUrl: '',  // new
    pdfNote: null,      // new
  });

  // Handle chapter add/remove/toggle
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: true,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapter([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapter(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapter(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  // Handle lecture add/remove
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapter(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((_, idx) => idx !== lectureIndex),
            };
          }
          return chapter;
        })
      );
    }
  };

  const handleAddLecture = () => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.chapterId === currentChapterId) {
        return {
          ...chapter,
          chapterContent: [
            ...chapter.chapterContent,
            {
              ...lectureDetails,
              lectureOrder: chapter.chapterContent.length + 1,
              lectureId: uniqid(),
            },
          ],
        };
      }
      return chapter;
    });

    setChapter(updatedChapters);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
      googleQuizUrl: '',  // reset
      pdfNote: null,      // reset
    });
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      price: coursePrice,
      discount,
      image: Image,
      chapters,
    };

    console.log('Course Submitted:', courseData);
    // Here you’d usually send courseData to your backend
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write course description...',
      });

      quillRef.current.on('text-change', () => {
        setCourseDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-purple-50 p-6 md:p-10">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto text-purple-900">
        <h2 className="text-3xl font-bold mb-6 text-purple-700">Create a New Course</h2>

        {/* Course Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-purple-400 rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Course Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Course Description</label>
          <div ref={editorRef} className="bg-white border border-purple-400 rounded-md min-h-[150px] p-2" />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-1">Course Price</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
              className="w-full px-4 py-2 border border-purple-400 rounded-md"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Discount (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
              className="w-full px-4 py-2 border border-purple-400 rounded-md"
            />
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">Course Thumbnail</label>
          <label className="flex items-center gap-3 cursor-pointer w-max">
            <img src={assets.file_upload_icon} className="w-10 h-10 bg-purple-500 p-2 rounded" />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              hidden
            />
            {Image && (
              <img src={URL.createObjectURL(Image)} className="h-12 rounded-md" alt="Preview" />
            )}
          </label>
        </div>

        {/* Chapters Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-3">Chapters</h3>
          <button
            type="button"
            onClick={() => handleChapter('add')}
            className="mb-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add Chapter
          </button>
          {chapters.map((chapter, idx) => (
            <div key={chapter.chapterId} className="mb-3 border border-purple-300 rounded p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-purple-800">{chapter.chapterTitle}</h4>
                <div>
                  <button
                    type="button"
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    className="mr-2 text-purple-600 hover:underline"
                  >
                    {chapter.collapsed ? 'Expand' : 'Collapse'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {!chapter.collapsed && (
                <>
                  <button
                    type="button"
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    className="mb-3 px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Add Lecture
                  </button>

                  {chapter.chapterContent.map((lecture, i) => (
                    <div
                      key={lecture.lectureId}
                      className="flex justify-between items-center border border-purple-200 rounded p-2 mb-2"
                    >
                      <p>{lecture.lectureTitle}</p>
                      <button
                        type="button"
                        onClick={() => handleLecture('remove', chapter.chapterId, i)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Lecture Add Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Add Lecture</h3>

              <label className="block mb-2">
                <span className="font-semibold">Lecture Title</span>
                <input
                  type="text"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-purple-300 rounded"
                />
              </label>

              <label className="block mb-2">
                <span className="font-semibold">Duration (minutes)</span>
                <input
                  type="number"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-purple-300 rounded"
                />
              </label>

              <label className="block mb-2">
                <span className="font-semibold">Lecture Video URL (YouTube)</span>
                <input
                  type="text"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
                  }
                  placeholder="https://www.youtube.com/watch?v=example"
                  className="w-full px-3 py-2 border border-purple-300 rounded"
                />
              </label>

              <label className=" mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })
                  }
                />
                <span className="font-semibold">Is Preview Free?</span>
              </label>

              {/* New: Google Quiz URL */}
              <label className="block mb-2">
                <span className="font-semibold">Google Quiz URL</span>
                <input
                  type="text"
                  value={lectureDetails.googleQuizUrl}
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, googleQuizUrl: e.target.value })
                  }
                  placeholder="https://docs.google.com/forms/d/your-form-id"
                  className="w-full px-3 py-2 border border-purple-300 rounded"
                />
              </label>

              {/* New: PDF Note Upload */}
              <label className="block mb-4">
                <span className="font-semibold">Upload PDF Note</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setLectureDetails({ ...lectureDetails, pdfNote: e.target.files[0] })
                  }
                  className="w-full"
                />
                {lectureDetails.pdfNote && (
                  <p className="mt-1 text-sm text-purple-600">{lectureDetails.pdfNote.name}</p>
                )}
              </label>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border border-purple-500 rounded hover:bg-purple-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddLecture}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-8 bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
