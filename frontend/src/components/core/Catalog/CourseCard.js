import React, { useEffect, useState } from "react";
import getAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";

import { FaRegStar, FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const CourseCard = ({ course, Height }) => {
  // const avgReviewCount = GetAvgRating(course.ratingAndReviews)
  // console.log(course.ratingAndReviews)
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = getAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  // console.log("count............", avgReviewCount)

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col min-w-80 w-80 max-w-[90vw]">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full aspect-video rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {/* {console.log("first->>>>>>>>>>>", course)} */}
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              {/* <ReactStars
                count={5}
                value={avgReviewCount || 0}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaRegStar />}
                fullIcon={<FaStar />}
              /> */}
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CourseCard;
