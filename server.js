require("dotenv").config();

const path = require("path");

const bcrypt = require("bcryptjs");
const csurf = require("csurf");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const sessions = require("client-sessions");

const auth = require("./auth");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");
const settings = require("./settings");

let app = express();

// Init
mongoose.connect(
  "mongodb://localhost:27017/restful_blogApp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("MongoDB is running!");
  }
);

// Settings
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(helmet());
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(csurf());
app.use(auth.loadUserFromSession);
app.use(expressSanitizer());
app.use(methodOverride("_method")); // Here, we are telling the app that, whenever we get a request that has "_method" as a parameter, take whatever it is equal to "PUT", "DELETE", or whatever it is, as what "PUT", "POST" or whatever

// Routes
app.use(authRoutes);
app.use(blogRoutes);

// Error Handling
app.use((err, req, res, next) => {
  res.status(500).send("Something broke :( Please try again.");
  console.log("ERROR: " + err.message + err.csurf);
});

app.listen(3000, () => {
  console.log("The RESTful Blog App is listening on port 3000");
});
