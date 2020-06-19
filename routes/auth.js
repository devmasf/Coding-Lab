const bcrypt = require("bcryptjs");
const express = require("express");

const auth = require("../auth");
const User = require("../models/user");
const settings = require("../settings");

const router = express.Router();

// AUTH ROUTES

// Render the registration page
router.get("/register", (req, res) => {
  res.render("register", { csrfToken: req.csrfToken() });
});

//  CREATE a new user account
//  Once a user is logged in, they will be sent to the dashboard page
router.post("/register", (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, settings.BCRYPT_WORK_FACTOR);
  req.body.password = hash;
  let user = new User(req.body);

  user.save((err) => {
    if (err) {
      let error = "Something bad happened! Please try agian.";

      if (err.code === 11000) {
        error = "That username is already taken. Please try another.";
      }

      return res.render("register", {
        error: error,
        csrfToken: req.csrfToken(),
      });
    }

    auth.createUserSession(req, res, user);
    res.redirect("/dashboard");
  });
});

// Render the login page
router.get("/login", (req, res) => {
  res.render("login", { csrfToken: req.csrfToken() });
});

// LOG a user into their account. Once a user is logged in,
// they will be sent to the dashboard page
router.post("/login", (req, res) => {
  User.findOne(
    { username: req.body.username },
    "username email password",
    (err, user) => {
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.render("login", {
          error: "Incorrect username / password.",
          csrfToken: req.csrfToken(),
        });
      }

      auth.createUserSession(req, res, user);
      res.redirect("/dashboard");
    }
  );
});

// LOG a user OUT of their account, then redirect them to the home page
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.reset();
  }
  req.flash("success", "See you later " + req.user.username + "!");
  res.redirect("/blogs");
});

module.exports = router;
