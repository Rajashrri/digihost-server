const express = require("express");

const router = express.Router();

const {
  getBlogs,
  getBlogDetails,
  getBlogCategories
 
} = require("../controllers/front-controller");
router.get("/blogs", getBlogs);
router.get("/blog/:slug", getBlogDetails);
router.get("/blog-categories", getBlogCategories);

module.exports = router;
