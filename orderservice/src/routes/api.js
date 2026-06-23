import express from "express";

import { getOrdersByStatus, getOrdersByUserId, updateOrderStatus, getCountOrdersByUser } from "../controllers/orderController.js";
import { getOrderStatusByAdmin, updateOrderStatusByAdmin } from "../controllers/adminOrderController.js"
import { getRevenueStats } from "../controllers/adminController.js";

import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => res.status(200).json({ message: "PTITShop Order API" }));

  router.use(auth);
  router.use(delay);

  router.get("/orders/count", getCountOrdersByUser);
  router.get("/orders", getOrdersByStatus);
  router.put("/orders/:orderId/status", updateOrderStatus);
  router.get("/orders/user/:userId", getOrdersByUserId);

  // ADMIN ROUTES
  router.use(adminMiddleware);
  router.get("/admin/stats/revenue", getRevenueStats);
  router.get("/admin/orders", getOrderStatusByAdmin);
  router.put("/admin/orders/:orderId/status", updateOrderStatusByAdmin);

  return app.use("/v1/api/", router);
};

export default initApiRoutes;
