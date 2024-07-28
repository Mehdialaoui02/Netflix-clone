import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

export async function signup(req, res) {
  try {
    console.log("request: ", req.body)
    const {
      email, password, username
    } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({success:false, message: "All fields are required"})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({success:false, message: "Invalid email"})
    }

    if (password.length < 6) {
      return res.status(400).json({success:false, message: "Password must be at least 6 characters"})
    }

    const existingUserByEmail = await User.findOne({email});
    if (existingUserByEmail) {
      return res.status(400).json({success:false, message: "Email already exists"})
    }

    const existingUserByUsername = await User.findOne({username});
    if (existingUserByUsername) {
      return res.status(400).json({success:false, message: "Username already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png",
      "/avatar2.png",
      "/avatar3.png"];
    const randomIndex = Math.floor(Math.random() * PROFILE_PICS.length);
    const profilePic = PROFILE_PICS[randomIndex];
    const newUser = new User({
      email, password: hashedPassword, username, profilePic
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({success:true, message: "User created successfully"})
    }
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({success:false, message: "Internal server error"})
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({success:false, message: "All fields are required"})
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({success:false, message: "Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({success:false, message: "Invalid credentials"})
    }

    generateToken(user._id, res);
    res.status(200).json({success:true, message: "Login successful"})
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({success:false, message: "Internal server error"})
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('netflix-token');
    res.status(200).json({success:true, message: "Logout successful"})
  } catch (error) {
    console.log("Error in logout:", error);
    res.status(500).json({success:false, message: "Internal server error"})
  }
}