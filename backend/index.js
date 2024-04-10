const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const saltRounds = 10;

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({
      username,
      password: hash,
    });

    res.status(201).json({
      status: "success",
      message: "User has been crated ",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    const isCorrectPsw = bcrypt.compareSync(password, user.password);
    if (!isCorrectPsw) {
      return res.status(400).json({
        status: "fail",
        message: "Wrong password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        status: "success",
        data: {
          username: user.username,
          token,
        },
      });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
});

app.listen(5000);
