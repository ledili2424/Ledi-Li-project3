const express = require("express");
const verifyUser = require("./../utils/verifyUser");
const PasswordInfo = require("../models/PasswordInfo");
const User = require("./../models/User");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

router.get("/", verifyUser, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordInfos = await PasswordInfo.find({ user: user._id });

    return res.status(200).json(passwordInfos);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/", verifyUser, async (req, res) => {
  const { url, password } = req.body;

  try {
    const newPasswordInfo = await PasswordInfo.create({
      url,
      password,
      user: req.id,
    });
    res.status(200).json({
      message: "Password added successfully",
      data: newPasswordInfo,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add password" });
  }
});

module.exports = router;
