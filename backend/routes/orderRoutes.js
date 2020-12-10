import express from "express";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(requireAuth, addOrderItems)
  .get(requireAuth, isAdmin, getOrders);

router.route("/myorders").get(requireAuth, getMyOrders);

router.route("/:id").get(requireAuth, getOrderById);

router.route("/:id/pay").put(requireAuth, updateOrderToPaid);

export default router;
