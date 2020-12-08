import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
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

router
  .route("/:id")
  .delete([requireAuth, isAdmin], deleteUser)
  .get([requireAuth, isAdmin], getUserById)
  .put([requireAuth, isAdmin], updateUser);

export default router;
