const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./User");

const twitteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: "Text is required!",
    },
    hashtag: {
      type: String,
    },
    id_author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: user,
      required: "Id is required!",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Twitte", twitteSchema);
