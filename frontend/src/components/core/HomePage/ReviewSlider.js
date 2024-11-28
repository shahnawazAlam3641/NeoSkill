import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../App.css";

import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  // console.log(reviews)

  // return (
  //   <div className="">
  //     <div className="">
  //       <Swiper
  //         slidesPerView={4}
  //         spaceBetween={25}
  //         loop={true}
  //         freeMode={true}
  //         autoplay={{
  //           delay: 2500,
  //           disableOnInteraction: false,
  //         }}
  //         modules={[FreeMode, Pagination, Autoplay]}
  //         className=" "
  //       >
  //         chty
  //         {reviews.map((review, i) => {
  //           return (
  //             <SwiperSlide key={i}>
  //               <div className="">
  //                 <div className="">
  //                   <img
  //                     src={
  //                       review?.user?.image
  //                         ? review?.user?.image
  //                         : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
  //                     }
  //                     alt=""
  //                     className=""
  //                   />
  //                   <div className="">
  //                     <h1 className="">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
  //                     <h2 className="">{review?.course?.courseName}</h2>
  //                   </div>
  //                 </div>
  //                 <p className="">
  //                   {review?.review.split(" ").length > truncateWords
  //                     ? `${review?.review
  //                         .split(" ")
  //                         .slice(0, truncateWords)
  //                         .join(" ")} ...`
  //                     : `${review?.review}`}
  //                 </p>
  //                 <div className="">
  //                   <h3 className="">{review.rating.toFixed(1)}</h3>
  //                   <ReactStars
  //                     count={5}
  //                     value={review.rating}
  //                     size={20}
  //                     edit={false}
  //                     activeColor="#ffd700"
  //                     emptyIcon={<FaStar />}
  //                     fullIcon={<FaStar />}
  //                   />
  //                 </div>
  //               </div>
  //             </SwiperSlide>
  //           );
  //         })}
  //         {/* <SwiperSlide>Slide 1</SwiperSlide> */}
  //       </Swiper>
  //     </div>
  //   </div>
  // );

  return (
    <div className="text-white px-5">
      <div className=" h-[184px] max-w-maxContentTab lg:max-w-maxContent mx-auto flex  ">
        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          chty
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800  p-3  text-[14px] text-richblack-25 rounded-lg">
                  <div className="flex items-center gap-4 ">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        <Link to={`/courses/${review?.course._id}`}>
                          {review?.course?.courseName}
                        </Link>
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );

  // return (
  //   <div className=" text-white">
  //     <div className=" h-[190px] max-w-maxContent">
  //       <Swiper
  //         slidesPerView={4}
  //         spaceBetween={24}
  //         loop={true}
  //         freeMode={true}
  //         autoplay={{ delay: 2500 }}
  //         modules={[Autoplay, FreeMode, Pagination]}
  //         className="w-full"
  //       >
  //         {reviews.map((review, index) => (
  //           <SwiperSlide key={index}>
  //             <div className="h-[185px] bg-richblack-800 p-3 space-y-2">
  //               <div className=" flex gap-[12px]">
  //                 <img
  //                   src={review?.user?.image}
  //                   alt="User Image"
  //                   className=" w-9 h-9 rounded-full"
  //                 />
  //                 <div>
  //                   <h1 className=" text-[14px] text-richblack-25 font-semibold">
  //                     {review?.user?.firstName} {review?.user?.lastName}
  //                   </h1>
  //                   <p className=" text-xs text-richblack-500 font-medium">
  //                     {review?.user?.email}
  //                   </p>
  //                 </div>
  //               </div>
  //               <div className=" text-xs font-medium text-richblack-50">
  //                 {review?.review}
  //               </div>
  //               <div className="flex gap-2 text-base items-center relative">
  //                 <div className="  mt-[3px] text-yellow-100">
  //                   {review?.rating}
  //                 </div>
  //                 <ReactStars
  //                   count={5}
  //                   value={review?.rating}
  //                   size={24}
  //                   edit={false}
  //                 />
  //               </div>
  //             </div>
  //           </SwiperSlide>
  //         ))}
  //       </Swiper>
  //     </div>
  //   </div>
  // );
};

export default ReviewSlider;
