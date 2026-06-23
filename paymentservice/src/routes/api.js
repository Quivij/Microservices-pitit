import express from "express";

import { checkPayment, createQr } from "../controllers/paymentController.js";
import { getVouchersByUser } from "../controllers/voucherController.js";
import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => res.status(200).json({ message: "PTITShop Payment API" }));

  router.get("/payment/vnpay_return", checkPayment);

  router.use(auth);
  router.use(delay);

  router.post("/payment/create-qr", createQr);
  router.get("/voucher/my", getVouchersByUser);

  return app.use("/v1/api/", router);
};

export default initApiRoutes;
