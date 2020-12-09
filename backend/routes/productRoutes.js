import express from "express";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(requireAuth, isAdmin, deleteProduct);

export default router;
