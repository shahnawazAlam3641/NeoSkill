const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");
const { secondsToDuration } = require("../utils/secondsToDuration");

exports.createSubSection = async (req, res) => {
  try {
    let { sectionId, title, description } = req.body;

    const video = req.files.video;

    // console.log(timeDuration);

    //also check !timeDuration in if statement below (i removed it)
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video.tempFilePath,
      process.env.FOLDER_NAME
    );

    console.log(uploadDetails);

    timeDuration = secondsToDuration(Math.floor(uploadDetails.duration));

    const subSectionDetails = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");
    //return response

    return res.status(200).json({
      success: true,
      message: "Sub Section created successfully",
      updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while creating Sub Section",
      error,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId, title, description } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video.tempFilePath,
        process.env.FOLDER_NAME
      );

      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = uploadDetails.timeDuration;
    }
    await subSection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while updating Sub Section",
      error,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    const subSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        massage: "Sub Section not found",
      });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      massage: "SubSection Deleted successfully",
      updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: true,
      message: "Error occured while Deleting Sub Section",
      error,
    });
  }
};
