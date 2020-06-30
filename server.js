require("dotenv").config();

const path = require("path");

const csurf = require("csurf");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const sessions = require("client-sessions");
const flash = require("connect-flash");

const auth = require("./auth");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const settings = require("./settings");

const app = express();

// Init
mongoose.connect(
  "mongodb://localhost:27017/restful_blogApp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("MongoDB is running!");
  }
);

// Settings
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(
  sessions({
    cookieName: "session",
    secret: settings.SESSION_SECRET_KEY,
    duration: settings.SESSION_DURATION,
    activeDuration: settings.SESSION_EXTENSION_DURATION,
    cookie: {
      httpOnly: true,
      ephemeral: settings.SESSION_EPHEMERAL_COOKIES,
      secure: settings.SESSION_SECURE_COOKIES,
    },
  })
);
app.use(helmet());
// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true }));
// Enabling CORS for all requests
app.use(cors());
// Adding morgan to log HTTP requests
app.use(morgan("combined"));
app.use(csurf());
app.use(expressSanitizer());
// Using methodOverride to change the request,
// to the value given, using the "_method" parameter
app.use(methodOverride("_method"));
app.use(flash());
app.use(auth.loadUserFromSession);

// User in session
app.use(function currentUserDisplay(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.warning = req.flash("warning");
  res.locals.success = req.flash("success");
  next();
});

// Routes
app.use(authRoutes);
app.use(blogRoutes);

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).send("Something broke. Please try again.");
  console.log("ERROR: " + err.message);
});

app.listen(3000, () => {
  console.log("The RESTful Blog App is listening on port 3000");
});
