import express from "express";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

router
  .route("/")
  .post(requireAuth, addOrderItems)
  .get(requireAuth, isAdmin, getOrders);

router.route("/myorders").get(requireAuth, getMyOrders);

router.route("/:id").get(requireAuth, getOrderById);

router.route("/:id/pay").put(requireAuth, updateOrderToPaid);
router.route("/:id/deliver").put(requireAuth, isAdmin, updateOrderToDelivered);

export default router;
