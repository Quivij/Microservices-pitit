import express from "express";

import { createProduct, getBestSellingProducts, getNewestProducts, getProductById, getProductDetail, getProductsPerPage, getSimilarProducts, getTopDiscountProducts, getTopViewedProducts } from "../controllers/productController.js";
import { getReviewsByProduct, createReview, getReviewsByUser } from "../controllers/reviewController.js";
import { addCategory, categoryController } from "../controllers/categoryController.js";
import { getForYou, getBoughtTogether, getPopular } from "../controllers/recommendationController.js";
import { getAllProductsAdmin, addProduct, updateProduct, deleteProduct } from "../controllers/adminProductController.js";

import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => res.status(200).json({ message: "PTITShop Product API" }));

  router.get("/products/top-viewed", getTopViewedProducts);
  router.get("/products/top-discount", getTopDiscountProducts);
  router.get("/products/:productId/reviews", getReviewsByProduct);

  router.post("/categories", categoryController.create);
  router.get("/categories", categoryController.list);
  router.get("/categories/:slug-:id", categoryController.detail);

  router.post("/create-products", createProduct);
  router.get("/products/:id", getProductDetail);
  router.get("/products/:id/similar", getSimilarProducts);
  router.get("/newest", getNewestProducts);
  router.get("/best-sellers", getBestSellingProducts);
  router.get("/products", getProductsPerPage);

  router.get("/recommendations/popular", getPopular);
  router.get("/recommendations/bought-together/:productId", getBoughtTogether);

  router.use(auth);
  router.use(delay);

  router.get("/recommendations/for-you", getForYou);
  router.get("/reviews", getReviewsByUser);
  router.post("/reviews", createReview);

  // ADMIN ROUTES
  router.use(adminMiddleware);
  router.get("/admin/products", getAllProductsAdmin);
  router.delete("/admin/products/:id", deleteProduct);
  router.post("/admin/products", addProduct);
  router.put("/admin/products/:id", updateProduct);
  router.post("/admin/categories", addCategory);

  return app.use("/v1/api/", router);
};

export default initApiRoutes;
