const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { addBlog,getBlogs,deleteBlog,updateBlog, getBlogById} = require("../controllers/blogController");

router.post(
  "/add-blog",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  addBlog
);
router.get("/list-blog", getBlogs);
router.delete("/delete-blog/:id", deleteBlog);

router.get(
  "/blog-detail/:id",
  getBlogById
);

router.put(
  "/update-blog/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "featuredImage", maxCount: 1 },
  ]),
  updateBlog
);
module.exports = router;