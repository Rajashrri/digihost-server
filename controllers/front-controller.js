const Blog = require("../models/Blog");
const BlogCategory = require("../models/BlogCategory");
const Contact = require("../models/contact-model");
const sendMail = require("../utils/sendMail");

const addContact = async (req, res) => {
  try {
    const { fullName, phone, email, message } = req.body;

    if (!fullName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      fullName,
      phone,
      email,
      message,
    });

await sendMail(
  "rajashri@digihost.in",
  "New Contact Inquiry",
  `
    <p><b>Dear Admin,</b></p>

    <p>A new contact enquiry has been submitted through the website.</p>

    <p>Please find the enquiry details below:</p>

    <p>You have received a new enquiry from <b>${fullName}</b>.</p>

    <h3>Details:</h3>

    <p><b>Name:</b> ${fullName}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone}</p>
    <p><b>Message:</b> ${message}</p>

    <br>

    <p>Regards,<br><b> DIIGIIHOST</b></p>
  `
);
    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

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
  getBlogCategories,
  addContact,
};