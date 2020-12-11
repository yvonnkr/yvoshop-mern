import express from "express";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(requireAuth, isAdmin, createProduct);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(requireAuth, isAdmin, deleteProduct)
  .put(requireAuth, isAdmin, updateProduct);

router.route("/:id/reviews").post(requireAuth, createProductReview);

export default router;
