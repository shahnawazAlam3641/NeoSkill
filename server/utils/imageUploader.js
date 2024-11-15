const cloudinary = require("cloudinary");

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "autto";

  return await cloudinary.uploader.upload(file.tempFilepath, options);
};
