const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (filePath, folder, height, quality) => {
  // console.log(file, folder);
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  // console.log(options);

  try {
    // console.log(filePath);
    return await cloudinary.uploader.upload(filePath, options);
  } catch (error) {
    console.log(error);
  }
};
