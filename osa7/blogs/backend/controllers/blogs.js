const blogsRouter = require("express").Router();
const app = require("../app");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const middleware = require("../utils/middleware");
const blog = require("../models/blog");

const getUser = middleware.userExtractor;
//GET
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});
//POST
blogsRouter.post("/", getUser, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const user = req.user;
  const blog = new Blog({ ...req.body, user: user.id });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  const blogToReturn = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });
  res.status(201).json(blogToReturn);
});

blogsRouter.post("/:id/comments", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const comment = new Comment({ ...req.body, blog: blog.id });
  savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  const blogToReturn = await Blog.findById(blog._id)
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });
  res.status(201).json(blogToReturn);
});

//DELETE
blogsRouter.delete("/:id", getUser, async (req, res, next) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404).end();
  }
  if (blog && blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
  next();
});
//PUT
blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { content: 1 });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
