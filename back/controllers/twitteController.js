const mongoose = require("mongoose");
const Twitte = mongoose.model("Twitte");
const User = mongoose.model("User");
require("./middlewearController");

exports.twitte = async (req, res) => {
  try {
    // console.log(req.body);
    const { text, hashtag, userId } = req.body;
    // console.log(userId);
    const id_author = userId;

    const twitte = new Twitte({
      text,
      hashtag,
      id_author: id_author,
    });

    await twitte.save();

    res.json({
      message: "Twitte registered successfully!",
    });

  } catch (err) {
    console.log(err);
  }
};

exports.getTwitte = async (req, res) => {
  try {
    const twittes = await Twitte.find({})
    res.send(twittes);
    console.log(twittes);
  } catch (error) {
    res.status(500).send();
  }
};

exports.getNameById_Author = async (req, res) => {

  try {
    const user = await User.findById(req.body.id_author);
    //console.log(req.body);
    //console.log(user.name);
    res.send(user.name);
  } catch (error) {
    res.status(500).send("erreur dans la recuperation de donnees");
  }
}