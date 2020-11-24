import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(requireAuth, addOrderItems);
router.route("/:id").get(requireAuth, getOrderById);

export default router;
