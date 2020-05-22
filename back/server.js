const express = require('express');
const app = express();
const cors = require('cors');

// DB connection
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection ERROR: " + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected!");
});

// Body-parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(cors());

//bring the models
require("./models/User");
require("./models/Twitte");

//bring the routers
app.use("/user", require("./routes/user"));

//to be able to run our server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
