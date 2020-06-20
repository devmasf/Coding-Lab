const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true,
    required: true,
    uniqueCaseInsensitive: true,
  },
  password: { type: String, required: true },
});

UserSchema.plugin(uniqueValidator, {
  message: "The {PATH} is already taken. Please try another.",
});
module.exports = mongoose.model("User", UserSchema);
