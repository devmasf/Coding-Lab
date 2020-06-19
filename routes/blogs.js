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
    email: req.user.email,
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
    res.render("index", {
      blogs: blogs,
      csrfToken: req.csrfToken(),
    });
  } catch (error) {
    console.log("We got an error: " + error.message);
  }
});

// NEW ROUTE
router.get("/blogs/new", auth.loginRequired, (req, res) => {
  res.render("new", { csrfToken: req.csrfToken() });
});

// CREATE ROUTE
router.post("/blogs", auth.loginRequired, async (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // Get data from form and add to campgrounds array
  const title = req.body.blog.title;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const image = req.body.blog.image;
  const body = req.body.blog.body;
  const date = req.body.blog.created;
  const newBlog = {
    title: title,
    author: author,
    image: image,
    body: body,
    date: date,
  };
  try {
    // Create a new campground and save to DB
    await Blog.create(newBlog);
    //redirect back to campgrounds page
    req.flash("success", "Blog " + newBlog.title + " succesfully created!");
    res.redirect("/blogs/");
  } catch (error) {
    req.flash("warning", "Something went wrong!");
    res.render("new", { csrfToken: req.csrfToken() });
    console.log("Error: " + error.message);
  }
});

// SHOW ROUTE
router.get("/blogs/:id", async (req, res) => {
  try {
    const foundBlog = await Blog.findById(req.params.id);
    res.render("show", { blog: foundBlog, csrfToken: req.csrfToken() });
  } catch (error) {
    console.log(error.message);
    req.flash("warning", "Blog not found!");
    res.redirect("/blogs");
  }
});

// EDIT ROUTE
router.get("/blogs/:id/edit", auth.checkBlogOwnership, async (req, res) => {
  const foundBlog = await Blog.findById(req.params.id);
  try {
    res.render("edit", { blog: foundBlog, csrfToken: req.csrfToken() });
  } catch (error) {
    req.flash("warning", "Blog not found!");
    res.redirect("/blogs");
  }
});

// UPDATE ROUTE - Here, we can also do a "post" request, but the point of the
// HTTP Requests, is to make things "meaningful", this is why we use "PUT" istead of "POST"
router.put("/blogs/:id", auth.checkBlogOwnership, async (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body.blog
    );
    req.flash("success", "Blog sucessfully edited");
    res.redirect("/blogs/" + req.params.id);
  } catch (error) {
    req.flash("warning", "Blog not found!");
    res.redirect("/blogs");
  }
});

// DESTROY ROUTE
router.delete("/blogs/:id", auth.checkBlogOwnership, async (req, res) => {
  try {
    const removedBlog = await Blog.findByIdAndRemove(req.params.id);
    req.flash("warning", "Blog deleted");
    // console.log(removedBlog);
    res.redirect("/blogs");
  } catch (error) {
    console.log("ERROR: " + error.message);
    req.flash("warning", "Something went wrong!");
    res.redirect("/blogs");
  }
});

module.exports = router;
