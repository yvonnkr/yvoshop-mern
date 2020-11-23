import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addOrderItems } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(requireAuth, addOrderItems);

export default router;
