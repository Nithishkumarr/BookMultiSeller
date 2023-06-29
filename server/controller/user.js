const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    console.log(req.body);
    console.log(userEmail);

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: "File deleted successfully" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const newUser = User.create(user);
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});
module.exports = router;
