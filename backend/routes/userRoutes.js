import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(requireAuth, getUserProfile)
  .put(requireAuth, updateUserProfile);

export default router;
