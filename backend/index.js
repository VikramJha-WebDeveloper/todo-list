require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// import models
const UserModel = require("./models/UserModel");

const app = express();
const port = process.env.PORT || 3000;
const database_url = process.env.DATABASE_URL;
const secret_key = process.env.SECRET_KEY;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(database_url);
    console.log("Successfully connected to the database");
  } catch (err) {
    console.log("connecting to the database error", err);
  }
};
connectToDatabase();

app.use(express.json());

const allowedOrigins = ["https://todo-list-frontend-xyfn.onrender.com", "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, isRemembered } =
      req.body;
    if (!fullName) {
      res.status(400).json({ fullNameError: "Please enter full name" });
      return;
    }
    if (!email) {
      res.status(400).json({ emailError: "Please enter email" });
      return;
    }
    if (!password) {
      res.status(400).json({ passwordError: "Please enter password" });
      return;
    }
    if (!confirmPassword) {
      res
        .status(400)
        .json({ confirmPasswordError: "Please enter confirm password" });
      return;
    }
    if (!isRemembered) {
        console.log("You must agree to the terms and conditions before submitting.");
      res
        .status(400)
        .json({
          isRememberedError:
            "You must agree to the terms and conditions before submitting.",
        });
      return;
    }
    if (password !== confirmPassword) {
      res.status(400).json({ errorMessage: "Password do not match" });
      return;
    }
    const registeredUser = await UserModel.findOne({ email });
    if (registeredUser) {
      console.log(
        "The email id you entered is already registered. Please try another email id"
      );
      res
        .status(400)
        .json({
          errorMessage:
            "The email id you entered is already registered. Please try another email id",
        });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      isRemembered,
    });
    const savedUser = await newUser.save();

    if (savedUser) {
      console.log("Successfully Registered");
      res.status(200).json({ successMessage: "Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async(req, res) => {
  const { email, password, isRemembered } = req.body;
  if(!email){
    console.log("Please enter email");
    res.status(400).json({errorMesage: "Please enter email"});
    return;
  }
  if(!password){
    console.log("Please enter password");
    res.status(400).json({errorMesage: "Please enter password"});
    return;
  }
  if(!isRemembered){
    console.log("You must agree to the terms and conditions before submitting.");
    res.status(400).json({errorMessage:"You must agree to the terms and conditions before submitting."});
    return;
  }
  const foundUser = await UserModel.findOne({email});
  if(!foundUser){
    console.log("No user found");
    res.status(400).json({errorMessage: "No user found"});
    return;
  }
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if(!isMatch){
    console.log("Invalid credentials");
    res.status(400).json({errorMessage: "Invalid credentials"});
  }else{
    const token = jwt.sign({user_id: foundUser._id}, secret_key, {expiresIn: "1h"});
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
      sameSite: "strict"
    })
    const {fullName, email} = foundUser;
    console.log("Loginned Successfully");
    res.status(200).json({successMessage: "Loginned Successfully", fullName, email});
  }
});

const verifyToken = (req, res, next)=>{
  const token = req.cookies.token;
  if(!token){
    console.log("No token found");
    return res.status(401).json({errorMesage: "No token found"});
  };

  try{
    const decode = jwt.verify(token, secret_key);
    console.log("decode", decode);
    req.user = decode;
    next();
  }catch(err){
    console.log("Invalid token");
    return res.status(401).json({errorMesage: "Invalid token"});
  }
};

app.get("/me", verifyToken, async(req,res)=>{
  try{
    const user = await UserModel.findById(req.user.user_id);
    if(!user){
      console.log("No user found");
      return res.status(401).json({errorMesage: "No user found"});
    }
    res.status(200).json({userFullName: user.fullName, userEmail: user.email});
  }catch(err){
    console.log("Something went wrong");
    return res.status(500).json({errorMesage: "something went wrong"})
  }
});

app.post("/logout", (req, res)=>{
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });
    console.log("logged out successfully");
    return res.status(200).json({successMessage: "Logged out successfully"});
  }catch(err){
    console.log(err);
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
