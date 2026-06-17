const Blog = require("../models/Blog");

const addBlog = async (req, res) => {
  try {
    const {
      categoryId,
      title,
      slug,
      author,
      date,
      shortDescription,
      description,
    } = req.body;

    const blog = new Blog({
      categoryId,
      title,
      slug,
      shortDescription,
      description,
      author,
      date,
      mainImage: req.files?.mainImage?.[0]?.filename || "",
      featuredImage: req.files?.featuredImage?.[0]?.filename || "",
    });

    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Blog added successfully",
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("categoryId", "categoryName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("categoryId");

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const path = require("path");
const fs = require("fs");

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const updateData = {
      categoryId: req.body.categoryId,
      title: req.body.title,
      slug: req.body.slug,

      author: req.body.author,
      date: req.body.date,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
    };

    // MAIN IMAGE
    if (req.files?.mainImage?.[0]) {
      if (blog.mainImage) {
        const oldPath = path.join(__dirname, "../public/blog", blog.mainImage);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.mainImage = req.files.mainImage[0].filename; // only filename save
    }

    // FEATURED IMAGE
    if (req.files?.featuredImage?.[0]) {
      if (blog.featuredImage) {
        const oldPath = path.join(
          __dirname,
          "../public/blog",
          blog.featuredImage,
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.featuredImage = req.files.featuredImage[0].filename; // only filename save
    }

    await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSeoById = async (req, res) => {
  try {
    const seo = await Blog.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: seo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const updateSeo = async (req, res) => {
  try {
    const {
      metaTitle,
      metaKeywords,
      metaDescription,
      mainImageAlt,
      featuredImageAlt,
      schemaCode,
    } = req.body;

    await Blog.findByIdAndUpdate(req.params.id, {
      metaTitle,
      metaKeywords,
      metaDescription,
      mainImageAlt,
      featuredImageAlt,
      schemaCode,
    });

    return res.status(200).json({
      success: true,
      message: "SEO Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
module.exports = {
  addBlog,
  getBlogs,
  deleteBlog,
  getBlogById,
  updateBlog,
  getSeoById,
  updateSeo,
};
