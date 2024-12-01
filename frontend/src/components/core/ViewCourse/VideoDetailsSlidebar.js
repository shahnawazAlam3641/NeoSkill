import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import IconBtn from "../../common/IconBtn";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack, IoIosClose, IoMdCloseCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";

const VideoDetailsSlidebar = ({
  setReviewModal,
  isVideoSidebar,
  setIsVideoSidebar,
}) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id;
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div
        className={` absolute z-10 overflow-hidden shadow-[rgba(0,0,15,0.5)_100px_5px_40px_10px] flex h-[calc(100vh-3.5rem)] transition-all duration-200  w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 ${
          isVideoSidebar ? "flex" : "w-0"
        }`}
      >
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                setIsVideoSidebar(false);
                // navigate(`/dashboard/enrolled-courses`);
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 transition-all duration-200 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosClose size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() =>
                setActiveStatus((prev) =>
                  prev === course?._id ? null : course?._id
                )
              }
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] font-medium">
                    {course?.subSection.length} Lesson(s)
                  </span>
                  <span
                    className={`${
                      activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-100`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out`}
                style={{
                  maxHeight: activeStatus === course?._id ? "200px" : "0px",
                }}
              >
                {course?.subSection.map((topic, i) => (
                  <div
                    className={`flex gap-3 px-5 py-2 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                    key={i}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    {topic.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSlidebar;
