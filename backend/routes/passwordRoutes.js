const express = require("express");
const verifyUser = require("./../utils/verifyUser");
const PasswordInfo = require("../models/PasswordInfo");
const User = require("./../models/User");
const PasswordShareRequest = require("../models/PasswordShareRequest");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

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

router.get("/", verifyUser, async (req, res) => {
  try {
    const passwordInfos = await PasswordInfo.find({ user: req.id });

    return res.status(200).json(passwordInfos);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.put("/:id", verifyUser, async (req, res) => {
  const { id } = req.params;

  try {
    const updatedPassword = await PasswordInfo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPassword) {
      return res
        .status(404)
        .json({ message: "No password found with this id" });
    }

    res.status(200).json({
      message: "Password updated",
      data: updatedPassword,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:id", verifyUser, async (req, res) => {
  try {
    await PasswordInfo.findByIdAndDelete(req.params.id);

    res.status(204).json({
      message: "Password deleted",
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
  }
});

router.post("/share-request", verifyUser, async (req, res) => {
  const { receiverName, url } = req.body;

  try {
    const receiver = await User.findOne({ username: receiverName });
    if (!receiver) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const passwordInfo = await PasswordInfo.findOne({ url });

    const newShareRequest = await PasswordShareRequest.create({
      sender: req.id,
      receiver: receiver._id,
      password: passwordInfo._id,
      status: "pending",
    });
    res.status(200).json({
      message: "Share request sent",
      data: newShareRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/shared", verifyUser, async (req, res) => {
  try {
    const sharedRequests = await PasswordShareRequest.find({
      receiver: req.id,
      status: "accepted",
    });
    const sharedPasswords = await Promise.all(
      sharedRequests.map(async (request) => {
        const password = await PasswordInfo.findById(request.password);
        return password;
      })
    );
    return res.status(200).json(sharedPasswords.flat());
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

router.put("/share-request/:id", verifyUser, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedShareRequest = await PasswordShareRequest.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedShareRequest) {
      return res
        .status(404)
        .json({ message: "No share request found with this id" });
    }

    res.status(200).json({
      message: "Share request updated",
      data: updatedShareRequest,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;