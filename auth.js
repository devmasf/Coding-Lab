const nJwt = require("njwt");

const User = require("./models/user");
const settings = require("./settings");
const Blog = require("./models/blog");

// Authentication middleware for Express

// This middleware checks if a user is available in the request.
// If not, it will redirect the visitor to the login page
module.exports.loginRequired = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.flash("warning", "You must log in before you can do that!");
  res.redirect("/login");
};

module.exports.checkBlogOwnership = (req, res, next) => {
  if (req.user) {
    Blog.findById(req.params.id, (err, foundBlog) => {
      if (err || !foundBlog) {
        req.flash("warning", "Blog not found!");
        res.redirect("/blogs");
      } else {
        if (foundBlog.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("warning", "Permission denied");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("warning", "You must log in before you can do that!");
    res.redirect("back");
  }
};

module.exports.createUserSession = (req, res, user) => {
  let claims = {
    scope: "active",
    sub: user._id,
  };
  let jwt = nJwt.create(
    claims,
    settings.JWT_SIGNING_KEY,
    settings.JWT_SIGNING_ALGORITHM
  );

  jwt.setExpiration(new Date().getTime() + settings.SESSION_DURATION);
  req.session.userToken = jwt.compact();
};

module.exports.loadUserFromSession = (req, res, next) => {
  if (!(req.session && req.session.userToken)) {
    return next();
  }

  nJwt.verify(
    req.session.userToken,
    settings.JWT_SIGNING_KEY,
    settings.JWT_SIGNING_ALGORITHM,
    (err, verifiedJwt) => {
      if (err) {
        return next();
      }

      User.findById(verifiedJwt.body.sub, (err, user) => {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next();
        }

        // Remove the password hash from the User object,
        // so we don't accidentally leak it
        user.password = undefined;

        // Here, we store the "user object" in the current request
        //  for developer usage. If the user wasn't found, these
        // values will be set to a "non-truthy" value, so it won't
        // affect anything.
        req.user = user;
        res.locals.user = user;

        next();
      });
    }
  );
};
