const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        messsage: "All fields are required",
      });
    }

    const categoryDetails = await Category.create({ name, description });

    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messsage: "Error occured while creating Category",
      error,
    });
  }
};

// exports.createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     if (!name) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }
//     const CategorysDetails = await Category.create({
//       name: name,
//       description: description,
//     });
//     // console.log(CategorysDetails)
//     return res.status(200).json({
//       success: true,
//       message: "Categorys Created Successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: true,
//       message: error.message,
//     });
//   }
// };

exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true, courses: true }
    );

    // console.log(allCategories);

    return res.status(200).json({
      success: true,
      message: "Got all Categories successfuully",
      allCategories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messsage: "Error occured while getting all tags",
      error,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
        populate: "instructor",
      })
      .exec();

    console.log("selectedCategory----------------->", selectedCategory);

    if (!selectedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    if (selectedCategory?.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected ccategory",
      });
    }

    // const selectedCourses = selectedCategory.courses;

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    console.log(categoriesExceptSelected);
    // .populate("courses");

    // let differentCourses = [];
    // for (const category of categoriesExceptSelected) {
    //   differentCourses.push(...category.courses);
    // }

    let differentCategory;
    if (!categoriesExceptSelected.length === 0) {
      differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec();
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching Category page Details",
      error: error.message,
    });
  }
};
