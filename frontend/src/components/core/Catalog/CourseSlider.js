import React from "react";
// import { Swiper } from "swiper";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "../../core/Catalog/CourseCard";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const CourseSlider = ({ Courses }) => {
  return (
    // <>
    //   {Courses?.length ? (
    //     <Swiper
    //       slidesPerView={1}
    //       spaceBetween={25}
    //       loop={true}
    //       modules={[FreeMode, Pagination]}
    //       breakpoints={{
    //         1024: {
    //           slidesPerView: 3,
    //         },
    //       }}
    //       className="max-h-[30rem]"
    //     >
    //       {Courses?.map((course, i) => (
    //         <SwiperSlide key={i}>
    //           <CourseCard course={course} Height={"h-[250px]"} />
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   ) : (
    //     <p className="text-xl text-richblack-5">No Course Found</p>
    //   )}
    // </>
    <>
      {Courses?.length ? (
        <div className="flex flex-row overflow-x-auto no-scrollbar gap-5">
          {Courses?.map((course, i) => (
            <CourseCard course={course} Height={""} />
          ))}
        </div>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
