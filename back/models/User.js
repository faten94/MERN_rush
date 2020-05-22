const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required!",
    },
    email: {
      type: String,
      required: "Email is required!",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required!",
    },
    role: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);