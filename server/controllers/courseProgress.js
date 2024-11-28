const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const User = require("../models/User");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  if (!courseId || !subsectionId || !userId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      const newProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [subsectionId],
      });

      console.log("newProgress----------->", newProgress);
      const user = await User.findByIdAndUpdate(
        userId,
        {
          courseProgress: [newProgress._id],
        },
        { new: true }
      );

      console.log("user after progress injection-------->", user);

      return res.status(200).json({
        success: true,
        message: "New progress created",
      });
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" });
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId);

      // Save the updated course progress
      await courseProgress.save();

      return res.status(200).json({ message: "Course progress updated" });
    }
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body;
//   const userId = req.user.id;

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." });
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseId: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseId",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec();

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." });
//     }
//     console.log(courseProgress, userId);
//     let lectures = 0;
//     courseProgress.courseId.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0;
//     });

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100;

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2);
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier;

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
