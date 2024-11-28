const express = require("express");
const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogByAuthorId,
} = require("../controllers/blogController");
const upload = require("../multer-config.js");
const router = express.Router();

router.post("/create-blog", upload.single("image"), createBlog);
router.put("/update-blog", upload.single("image"), updateBlog);
router.delete("/delete/:blogId", deleteBlog);

router.get("/get-blogs", getAllBlogs);

router.get("/get-blog/:blogId", getBlogById);
router.get("/get-my-blogs/:authorId", getBlogByAuthorId);

module.exports = router;
