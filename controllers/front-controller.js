const Blog = require("../models/Blog");
const BlogCategory = require("../models/BlogCategory");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      status: 1,
    })
      .populate("categoryId", "categoryName slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: 1,
    }).populate("categoryId", "categoryName slug");

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


const getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.find({
      status: 1,
    }).sort({
      categoryName: 1,
    });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};




module.exports = {
  getBlogs,
  getBlogDetails,
  getBlogCategories
};