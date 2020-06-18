const mongoose = require("mongoose");

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  image: String, //.. We can do the same for "image" if we want to have a default image, doing "{type: String, default: "placeholderimage.jpg"} "
  body: String,
  created: { type: Date, default: Date.now }, // Here, we want to take the current data when the user creates the post or creates the blog, we just want to grab that data. This is why using just "Date" is not really convinient. Because of this, we specify "type" and the default, which is saying that "created" should be a "Date" and that there is a "default value" "Date.now" ...
});

module.exports = mongoose.model("Blog", blogSchema);
