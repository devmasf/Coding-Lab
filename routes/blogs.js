const express = require("express");

const Blog = require("../models/blog");
const auth = require("../auth");

const router = express.Router();

// ROOT ROUTE
router.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Render the dashboard page
router.get("/dashboard", auth.loginRequired, (req, res) => {
  let userString = {
    username: req.user.username,
  };

  res.render("dashboard", {
    userString: JSON.stringify(userString, null, 2),
    csrfToken: req.csrfToken(),
  });
});

// INDEX ROUTE
// Render the home page
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("index", { blogs: blogs, csrfToken: req.csrfToken() });
  } catch (error) {
    console.log("We got an error: " + error.message);
  }
});

// NEW ROUTE
router.get("/blogs/new", (req, res) => {
  res.render("new", { csrfToken: req.csrfToken() });
});

// CREATE ROUTE
router.post("/blogs", async (req, res) => {
  console.log(req.body);
  req.body.blog.body = req.sanitize(req.body.blog.body);
  console.log("================================================");
  console.log(req.body);
  try {
    const newBlog = await Blog.create(req.body.blog);
    res.redirect("/blogs");
  } catch (error) {
    res.render("new", { csrfToken: req.csrfToken() });
  }
});

// SHOW ROUTE
router.get("/blogs/:id", async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id);
    res.render("show", { blog: foundBlog, csrfToken: req.csrfToken() });
  } catch (error) {
    console.log(error.message);
    res.redirect("/blogs");
  }
});

// EDIT ROUTE
router.get("/blogs/:id/edit", async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id);
    res.render("edit", { blog: foundBlog, csrfToken: req.csrfToken() });
  } catch (error) {
    res.redirect("/blogs");
  }
});

// UPDATE ROUTE - Here, we can also do a "post" request, but the point of the HTTP Requests, is to make things "meaningful", this is why we use "PUT" istead of "POST"
router.put("/blogs/:id", async (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body.blog
    );
    res.redirect("/blogs/" + req.params.id);
  } catch (error) {
    res.redirect("/blogs");
  }
});

// DESTROY ROUTE
router.delete("/blogs/:id", async (req, res) => {
  try {
    const removedBlog = await Blog.findByIdAndRemove(req.params.id);
    // console.log(removedBlog);
    res.redirect("/blogs");
  } catch (error) {
    console.log("ERROR: " + error.message);
    res.redirect("/blogs");
  }
});

module.exports = router;
