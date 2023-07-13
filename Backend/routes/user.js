const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {userModel} = require("../model/usermodel");


userRouter.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const user = new userModel({ email, password: hashedPassword });
    await user.save();
    res.json("Signup successful");

  } catch (error) {
    console.error(error);
    res.status(500).json("Something went wrong");
  }
});


userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwt);
    res.json({ token });
    
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong ");
  }
});


module.exports = {userRouter};


