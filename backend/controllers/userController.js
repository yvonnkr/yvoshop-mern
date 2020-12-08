import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with given email already exists");
  }

  const user = await User.create({
    name,
    email,
    password, //will be hashed on save(mongoose pre()method)
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// @desc Auth/Login user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const passwordIsMatch = user ? await user.matchPassword(password) : false;

  if (!user || !passwordIsMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const { _id, name, isAdmin } = user;
  res.json({
    _id,
    name,
    email: user.email,
    isAdmin,
    token: generateToken(_id),
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { _id, name, email, isAdmin } = user;
  res.json({
    _id,
    name,
    email,
    isAdmin,
  });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.json(users);
});

export { registerUser, authUser, getUserProfile, updateUserProfile, getUsers };
