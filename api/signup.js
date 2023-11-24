const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const UserModel = require("../models/UserModel");
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
const regexusername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    if (username.length < 1) {
      return res.status(401).send("Invalid");
    }
    if (!regexusername.test(username)) {
      return res.status(401).send("Invalid");
    }

    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) {
      return res.status(401).send("username already taken");
    }

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error!");
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = req.body.user;

  if (!isEmail(email)) {
    return res.status(401).send("Invalid Email");
  }
  if (password.length < 6) {
    return res.status(401).send("Password must be at least 6 characters");
  }
  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(401).send("Email already registered");
    }

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    console.log(process.env.jwtSecret);
    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error!");
  }
});
module.exports = router;
