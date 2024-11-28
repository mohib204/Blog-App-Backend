const Blog = require("../models/blogModel");
const { uploadImage } = require("../storage");

const createBlog = (req, res) => {
  const body = req.body;
  console.log("🚀 ~ body:", body);
  console.log("🚀 ~ createBlog ~ body:", req.file);

  uploadImage(req.file)
    .then((result) => {
      console.log("🚀 ~ .then ~ result:", result);
      const newBlog = new Blog({
        title: body.title,
        description: body.description,
        category: body.category,
        author: body.authorId,
        image: result.url,
      });
      newBlog
        .save()
        .then((response) => {
          if (response) {
            res.send({ message: "Blog created successfully", blog: response });
          } else {
            res.status(400).send({
              message: "Somethig went wrong try again letter",
              blog: null,
            });
          }
        })
        .catch((err) => {
          console.log("🚀 ~ .then ~ err =>>:", err);
          res.status(400).send({
            message: err?.message,
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log("err =>", err);
      res.status(400).send({
        message: err?.message,
        error: err,
      });
    });
};

const updateBlog = (req, res) => {
  const body = req.body;

  console.log("🚀 ~ updateBlog ~ req.file:", req.file);

  if (req.file) {
    uploadImage(req.file)
      .then((result) => {
        console.log("🚀 ~ .then ~ result:", result);
        Blog.findByIdAndUpdate(body.id, {
          title: body.title,
          description: body.description,
          image: result.url,
          category: body.category,
        })
          .then((response) => {
            if (response) {
              res.send({
                message: "Blog updated successfully",
                blog: body,
              });
            } else {
              res.status(400).send({
                message: "Somethig went wrong try again letter",
                blog: null,
              });
            }
          })
          .catch((err) => {
            res.status(400).send({
              message: err?.message,
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log("err =>", err);
        res.status(400).send({
          message: err?.message,
          error: err,
        });
      });
  } else {
    Blog.findByIdAndUpdate(body.id, {
      title: body.title,
      description: body.description,
      category: body.category,
    })
      .then((response) => {
        if (response) {
          res.send({
            message: "Blog updated successfully",
            blog: body,
          });
        } else {
          res.status(400).send({
            message: "Somethig went wrong try again letter",
            blog: null,
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          message: err?.message,
          error: err,
        });
      });
  }
};

const deleteBlog = (req, res) => {
  const blogId = req.params.blogId;
  console.log("🚀 ~ deleteBlog ~ blogId:", blogId);

  Blog.findOneAndDelete(blogId)
    .then((response) => {
      if (response) {
        res.send({ message: "Blog deleted successfully" });
      } else {
        res.status(400).send({ message: "Blog not found", error: true });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err?.message,
        error: err,
      });
    });
};

const getAllBlogs = (req, res) => {
  Blog.find()
    .populate("author")
    .then((allBlogs) => {
      res.send(allBlogs);
    })
    .catch((err) => {
      res.status(400).send({
        message: err?.message,
        error: err,
      });
    });
};

const getBlogById = (req, res) => {
  const blogId = req.params.blogId;

  Blog.findById(blogId)
    .then((blog) => {
      if (blog) {
        res.send({ blog });
      } else {
        res.status(400).send({ message: "Blog not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err?.message,
        error: err,
      });
    });
};

const getBlogByAuthorId = (req, res) => {
  const authorId = req.params.authorId;

  Blog.find({ author: authorId })
    .populate("author")
    .then((blogs) => {
      if (blogs) {
        res.send({ blogs });
      } else {
        res.status(400).send({ message: "Blog not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: err?.message,
        error: err,
      });
    });
};

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogByAuthorId,
};
