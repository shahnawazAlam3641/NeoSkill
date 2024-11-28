// {/* <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
// {courseSectionData.map((course, index) => (
//   <div
//     className="mt-2 cursor-pointer text-sm text-richblack-5"
//     onClick={() => setActiveStatus(course?._id)}
//     key={index}
//   >
//     {/* Section */}
//     <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
//       <div className="w-[70%] font-semibold">
//         {course?.sectionName}
//       </div>
//       <div className="flex items-center gap-1">
//         <span className="text-[12px] font-medium">
//           {course?.subSection.length} Lesson(s)
//         </span>
//         <span
//           className={`${
//             activeStatus === course?._id ? "rotate-0" : "rotate-180"
//           } transition-all duration-100`}
//         >
//           {console.log("activeStatus------------->", course)}
//           <BsChevronDown />
//         </span>
//       </div>
//     </div>

//     {/* Sub Sections */}
//     {activeStatus === course?._id && (
//       <div
//         className={`transition-[max-height] duration-500 ease-in-out ${
//           activeStatus === course?._id ? "max-h-[200px]" : "max-h-0"
//         }`}
//       >
//         {course?.subSection.map((topic, i) => (
//           <div
//             className={`flex gap-3  px-5 py-2 ${
//               videoBarActive === topic._id
//                 ? "bg-yellow-200 font-semibold text-richblack-800"
//                 : "hover:bg-richblack-900"
//             } `}
//             key={i}
//             onClick={() => {
//               navigate(
//                 `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//               );
//               setVideoBarActive(topic._id);
//             }}
//           >
//             <input
//               type="checkbox"
//               checked={completedLectures.includes(topic?._id)}
//               onChange={() => {}}
//             />
//             {topic.title}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// ))}
// </div> */}

console.log("first");
