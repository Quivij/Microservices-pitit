import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import UserService from "../services/user/userService.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/avatars';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `avatar-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

import { forgotPassword, loginUser, refreshToken, registerUser, resendOTP, verifyOTP } from "../controllers/authController.js";
import { getUserProfile, updateUserProfile, toggleFavoriteProduct, addToViewedProducts, getAllUsers } from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import delay from "../middleware/delay.js";
import { validateForgotPassword, validateLogin, validateRefreshToken, validateRegister, validateResendOtp, validateVerifyOtp } from "../middleware/validation.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import { createNotification, getNotificationsByUser, markNotificationAsRead } from "../controllers/notificationController.js";
import { adminUpdateUser, getNewUsers, toggleUserActive } from "../controllers/adminController.js";
import { getDeliveryAddresses, createDeliveryAddress, updateDeliveryAddress, setDefaultDeliveryAddress, deleteDeliveryAddress } from "../controllers/deliveryAddressController.js";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", (req, res) => res.status(200).json({ message: "PTITShop Identity API" }));

  router.post("/register", validateRegister, registerUser);
  router.post("/login", validateLogin, loginUser);
  router.post("/verify-otp", validateVerifyOtp, verifyOTP);
  router.post("/resend-otp", validateResendOtp, resendOTP);
  router.post("/refresh-token", validateRefreshToken, refreshToken);
  router.post("/forgot-password", validateForgotPassword, forgotPassword);

  router.use(auth);
  router.use(delay);

  router.get("/profile", getUserProfile);
  router.put("/update-profile", authMiddleware, updateUserProfile);
  
  router.post("/profile/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
      try {
          if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
          const avatarUrl = `http://localhost:6972/public/avatars/${req.file.filename}`;
          const userId = req.user.userId || req.user._id;
          await UserService.updateUserProfile(userId, { avt: avatarUrl });
          return res.status(200).json({ success: true, data: { avatarUrl } });
      } catch (err) {
          return res.status(500).json({ success: false, message: err.message });
      }
  });

  router.post('/user/viewed-products', addToViewedProducts);
  router.post('/user/favorite-products', toggleFavoriteProduct);

  router.get('/user/delivery-addresses', getDeliveryAddresses);
  router.post('/user/delivery-addresses', createDeliveryAddress);
  router.put('/user/delivery-addresses/:id', updateDeliveryAddress);
  router.put('/user/delivery-addresses/:id/default', setDefaultDeliveryAddress);
  router.delete('/user/delivery-addresses/:id', deleteDeliveryAddress);

  router.get("/notifications/:userId", getNotificationsByUser);
  router.post("/notifications", createNotification);
  router.put("/notifications/:id/mark-read", markNotificationAsRead);

  // ADMIN ROUTES
  router.use(adminMiddleware);
  router.get("/admin/stats/users", getNewUsers);
  router.get("/admin/users", getAllUsers);
  router.put("/admin/users/:userId/active", toggleUserActive);
  router.put("/admin/users/:userId/update", adminUpdateUser);

  return app.use("/v1/api/", router);
};

export default initApiRoutes;
