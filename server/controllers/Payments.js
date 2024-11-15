const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");

exports.capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const userId = req.user.id;

  if (!course_id) {
    return res.json({
      success: false,
      message: "Please provide valid course ID",
    });
  }

  let course;
  try {
    course = await Course.findById(course_id);
    return res.json({
      success: false,
      message: "could not find the course",
    });

    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "Student is already enrolled",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  const amount = course.price * 100;
  const currency = "INR";

  const options = {
    amount,
    currencyreceipt: Math.random(Date.now().toString()),
    notes: {
      courseId: course_id,
      userId,
    },
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    console.log(paymentResponse);

    return res.status(200).json({
      success: true,
      course: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = "123456";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is Authorised");
    const { courseId, userId } = req.body.payload.entity.notes;

    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not Found",
        });
      }
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from SkillSwap",
        "Congratulations, you are onboarded into new SkillSwap Course"
      );

      return res.status(200).json({
        succwss: true,
        message: "Signature Verified and Course Added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
