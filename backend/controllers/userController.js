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

export { authUser };
