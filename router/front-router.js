const express = require("express");

const router = express.Router();

const {
  getBlogs,
  getBlogDetails,
  getBlogCategories,
  addContact,
  
 
} = require("../controllers/front-controller");
router.get("/blogs", getBlogs);
router.get("/blog/:slug", getBlogDetails);
router.get("/blog-categories", getBlogCategories);
router.post("/add-contact", addContact);

module.exports = router;
