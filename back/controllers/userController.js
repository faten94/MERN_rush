const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      email,
    });
    if (userExists) throw "User with same email already exists.";
    const user = new User({
      name,
      email,
      password: sha256(password + process.env.SALT),
    });

    await user.save();

    const token = await jwt.sign({ userId: user.id }, process.env.SECRET);

    res.json({
      message: "User successfully registered!",
      token,
    });
  
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw "Email and Password did not match.";

  const token = await jwt.sign({ userId: user.id }, process.env.SECRET);

  res.json({
    message: "User logged in successfully!",
    token,
  });
};

exports.getAuthors = async (req, res) => {
  try {
    const authors = await User.find({})
    res.send(authors);
    console.log(authors);
  } catch (error) {
    res.status(500).send();
  }
};