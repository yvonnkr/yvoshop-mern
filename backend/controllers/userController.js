import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

// @desc Auth user & get token
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
// @route GE /api/users/profile
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

export { authUser, getUserProfile };
