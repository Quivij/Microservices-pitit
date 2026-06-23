import express from "express";

import { addToCart, clearCart, getCart, getCartCount, removeFromCart, updateCartItem } from "../controllers/cartController.js";
import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";
import { validateAddToCart, validateUpdateCartItem } from "../middleware/validation.js";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => res.status(200).json({ message: "PTITShop Cart API" }));

  router.use(auth);
  router.use(delay);

  router.get("/cart", getCart);
  router.get("/cart/count", getCartCount);
  router.post("/cart/add", validateAddToCart, addToCart);
  router.put("/cart/update", validateUpdateCartItem, updateCartItem);
  router.delete("/cart/remove/:productId", removeFromCart);
  router.delete("/cart/clear", clearCart);

  return app.use("/v1/api/", router);
};

export default initApiRoutes;
