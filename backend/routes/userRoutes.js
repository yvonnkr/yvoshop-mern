import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.route("/profile").get(requireAuth, getUserProfile);

export default router;
