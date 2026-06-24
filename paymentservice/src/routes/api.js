import express from "express";

import { checkPayment, createQr } from "../controllers/paymentController.js";
import { getVouchersByUser } from "../controllers/voucherController.js";
import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
import { getAllVouchers, createVoucher, updateVoucher, deleteVoucher } from "../controllers/adminVoucherController.js";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => res.status(200).json({ message: "PTITShop Payment API" }));

  router.get("/payment/vnpay_return", checkPayment);

  router.use(auth);
  router.use(delay);

  router.post("/payment/create-qr", createQr);
  router.get("/voucher/my", getVouchersByUser);

  // ADMIN ROUTES
  router.use(adminMiddleware);
  router.get("/admin/vouchers", getAllVouchers);
  router.post("/admin/vouchers", createVoucher);
  router.put("/admin/vouchers/:id", updateVoucher);
  router.delete("/admin/vouchers/:id", deleteVoucher);

  return app.use("/v1/api/", router);
};

export default initApiRoutes;
