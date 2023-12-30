const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  notification: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"], // Define the allowed values
  },
  refreshToken: { type: String },
});

const User = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

module.exports = User;
