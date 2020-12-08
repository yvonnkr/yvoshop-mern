import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// prettier-ignore
router.route("/")
  .post(registerUser)
  .get([requireAuth, isAdmin], getUsers);

router.post("/login", authUser);

router
  .route("/profile")
  .get(requireAuth, getUserProfile)
  .put(requireAuth, updateUserProfile);

export default router;
