# 🛒 PITITShop — Backend API

Backend RESTful API cho hệ thống thương mại điện tử **PITITShop**, được xây dựng với **Node.js**, **Express.js** và **MongoDB**.

---

## 📋 Mục lục

- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Danh sách API](#-danh-sách-api)
- [Xác thực & Phân quyền](#-xác-thực--phân-quyền)
- [Tính năng chính](#-tính-năng-chính)

---

## 🖥️ Yêu cầu hệ thống

| Phần mềm | Phiên bản tối thiểu |
|----------|-------------------|
| Node.js  | v18.0.0 trở lên   |
| npm      | v9.0.0 trở lên    |
| MongoDB  | v6.0 trở lên      |

---

## ⚙️ Cài đặt

### Bước 1: Clone dự án

```bash
git clone <repository-url>
cd PITITShop/backend
```

### Bước 2: Cài đặt các gói phụ thuộc

```bash
npm install
```

### Bước 3: Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend/` (xem mục [Cấu hình môi trường](#-cấu-hình-môi-trường)).

### Bước 4: Đảm bảo MongoDB đang chạy

```bash
# Windows — khởi động MongoDB Service
net start MongoDB

# Hoặc chạy trực tiếp (nếu cài thủ công)
mongod --dbpath "C:\data\db"
```

---

## 🔧 Cấu hình môi trường

Tạo file `.env` tại `backend/.env` với nội dung sau:

```env
# ===== Server =====
PORT=6969
NODE_ENV=development

# ===== Database =====
MONGO_URI=mongodb://localhost:27017/ptitshop

# ===== JWT Authentication =====
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=7d

# ===== OTP =====
OTP_EXPIRES_IN=5m

# ===== Email (Gmail App Password) =====
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# ===== VNPay (Thanh toán) =====
VNPAY_TMNCODE=YOUR_TMNCODE
VNPAY_HASHSECRET=YOUR_HASH_SECRET
VNPAY_HOST=https://sandbox.vnpayment.vn
VNPAY_RETURN_URL=http://localhost:6969/v1/api/payment/vnpay_return
VNPAY_IPN_URL=http://localhost:6969/v1/api/payment/vnpay-ipn
```

> **Lưu ý về Email:** Để lấy **App Password** của Gmail:
> 1. Bật xác thực 2 bước tại [myaccount.google.com](https://myaccount.google.com)
> 2. Vào **Bảo mật** → **Mật khẩu ứng dụng**
> 3. Tạo mật khẩu cho ứng dụng "Mail" và sao chép vào `EMAIL_PASS`

> **Lưu ý về VNPay:** Đăng ký tài khoản sandbox tại [sandbox.vnpayment.vn](https://sandbox.vnpayment.vn/apis/vnpay-demo/) để lấy `VNPAY_TMNCODE` và `VNPAY_HASHSECRET`.

---

## ▶️ Chạy ứng dụng

### Chế độ phát triển (Development) — tự động reload

```bash
npm run dev
```

### Chế độ sản xuất (Production)

```bash
npm start
```

Sau khi khởi động thành công, server sẽ chạy tại:

```
http://localhost:6969
```

Kiểm tra API hoạt động:

```
GET http://localhost:6969/v1/api/
```

---

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   ├── config/           # Cấu hình database, view engine
│   ├── controllers/      # Logic xử lý request
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   ├── recommendationController.js
│   │   ├── reviewController.js
│   │   ├── notificationController.js
│   │   ├── voucherController.js
│   │   ├── categoryController.js
│   │   ├── adminController.js
│   │   ├── adminOrderController.js
│   │   ├── adminProductController.js
│   │   └── deliveryAddressController.js
│   ├── middleware/       # Middleware xác thực, validation, delay
│   │   ├── auth.js
│   │   ├── authMiddleware.js
│   │   ├── validation.js
│   │   └── delay.js
│   ├── models/           # Mongoose Schema/Model
│   ├── routes/
│   │   └── api.js        # Định nghĩa toàn bộ API routes
│   ├── services/         # Business logic
│   ├── utils/            # Tiện ích (cronJobs, helpers)
│   ├── views/            # Template EJS (email, QR)
│   └── server.js         # Entry point
├── .env                  # Biến môi trường (không commit lên git)
├── package.json
└── README.md
```

---

## 📡 Danh sách API

Base URL: `http://localhost:6969/v1/api`

### 🔐 Xác thực (Authentication)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| POST | `/register` | Đăng ký tài khoản mới | ❌ |
| POST | `/login` | Đăng nhập | ❌ |
| POST | `/verify-otp` | Xác thực mã OTP | ❌ |
| POST | `/resend-otp` | Gửi lại OTP | ❌ |
| POST | `/refresh-token` | Làm mới Access Token | ❌ |
| POST | `/forgot-password` | Quên mật khẩu | ❌ |

### 📦 Sản phẩm (Products)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/products` | Lấy danh sách sản phẩm (phân trang) | ❌ |
| GET | `/products/:id` | Chi tiết sản phẩm | ❌ |
| GET | `/products/top-viewed` | Top 8 sản phẩm xem nhiều nhất | ❌ |
| GET | `/products/top-discount` | Top 4 sản phẩm giảm giá cao nhất | ❌ |
| GET | `/products/:id/similar` | Sản phẩm tương tự | ❌ |
| GET | `/newest` | Sản phẩm mới nhất | ❌ |
| GET | `/best-sellers` | Sản phẩm bán chạy nhất | ❌ |
| POST | `/create-products` | Tạo sản phẩm mới | ❌ |

### 🏷️ Danh mục (Categories)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/categories` | Danh sách danh mục | ❌ |
| GET | `/categories/:slug-:id` | Chi tiết danh mục | ❌ |
| POST | `/categories` | Tạo danh mục mới | ❌ |

### 👤 Người dùng (User — Yêu cầu đăng nhập)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/profile` | Lấy thông tin cá nhân | ✅ |
| PUT | `/update-profile` | Cập nhật thông tin cá nhân | ✅ |
| POST | `/user/viewed-products` | Thêm sản phẩm đã xem | ✅ |
| POST | `/user/favorite-products` | Yêu thích / bỏ yêu thích sản phẩm | ✅ |

### 📍 Địa chỉ giao hàng (Delivery Address)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/user/delivery-addresses` | Danh sách địa chỉ | ✅ |
| POST | `/user/delivery-addresses` | Thêm địa chỉ mới | ✅ |
| PUT | `/user/delivery-addresses/:id` | Cập nhật địa chỉ | ✅ |
| PUT | `/user/delivery-addresses/:id/default` | Đặt địa chỉ mặc định | ✅ |
| DELETE | `/user/delivery-addresses/:id` | Xóa địa chỉ | ✅ |

### 🛒 Giỏ hàng (Cart)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/cart` | Xem giỏ hàng | ✅ |
| GET | `/cart/count` | Số lượng sản phẩm trong giỏ | ✅ |
| POST | `/cart/add` | Thêm vào giỏ hàng | ✅ |
| PUT | `/cart/update` | Cập nhật số lượng | ✅ |
| DELETE | `/cart/remove/:productId` | Xóa sản phẩm khỏi giỏ | ✅ |
| DELETE | `/cart/clear` | Xóa toàn bộ giỏ hàng | ✅ |

### 📋 Đơn hàng (Orders)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/orders` | Danh sách đơn hàng theo trạng thái | ✅ |
| GET | `/orders/count` | Đếm số đơn hàng | ✅ |
| GET | `/orders/user/:userId` | Đơn hàng của người dùng | ✅ |
| PUT | `/orders/:orderId/status` | Cập nhật trạng thái đơn hàng | ✅ |

### 💳 Thanh toán (Payment)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| POST | `/payment/create-qr` | Tạo QR Code thanh toán VNPay | ✅ |
| GET | `/payment/vnpay_return` | Callback sau thanh toán VNPay | ❌ |

### ⭐ Đánh giá (Reviews)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/products/:productId/reviews` | Đánh giá theo sản phẩm | ❌ |
| GET | `/reviews` | Đánh giá của tôi | ✅ |
| POST | `/reviews` | Tạo đánh giá mới | ✅ |

### 🎯 Gợi ý sản phẩm (Recommendations)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/recommendations/popular` | Sản phẩm phổ biến (Cold Start) | ❌ |
| GET | `/recommendations/bought-together/:productId` | Hay mua cùng nhau | ❌ |
| GET | `/recommendations/for-you` | Dành riêng cho bạn | ✅ |

### 🔔 Thông báo (Notifications)

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/notifications/:userId` | Danh sách thông báo | ✅ |
| POST | `/notifications` | Tạo thông báo | ✅ |
| PUT | `/notifications/:id/mark-read` | Đánh dấu đã đọc | ✅ |

### 🎫 Voucher

| Method | Endpoint | Mô tả | Auth? |
|--------|----------|-------|-------|
| GET | `/voucher/my` | Voucher của tôi | ✅ |

### 🔧 Admin (Yêu cầu quyền Admin)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/admin/stats/revenue` | Thống kê doanh thu |
| GET | `/admin/stats/users` | Thống kê người dùng mới |
| GET | `/admin/orders` | Quản lý đơn hàng |
| PUT | `/admin/orders/:orderId/status` | Cập nhật trạng thái đơn |
| GET | `/admin/users` | Quản lý người dùng |
| PUT | `/admin/users/:userId/active` | Kích hoạt/khóa tài khoản |
| PUT | `/admin/users/:userId/update` | Cập nhật thông tin người dùng |
| GET | `/admin/products` | Quản lý sản phẩm |
| POST | `/admin/products` | Thêm sản phẩm |
| PUT | `/admin/products/:id` | Sửa sản phẩm |
| DELETE | `/admin/products/:id` | Xóa sản phẩm |
| POST | `/admin/categories` | Thêm danh mục |

---

## 🔐 Xác thực & Phân quyền

Hệ thống sử dụng **JWT (JSON Web Token)**:

1. **Đăng nhập** → Nhận `accessToken` (hạn 7 ngày) và `refreshToken`
2. **Gọi API bảo vệ** → Thêm header: `Authorization: Bearer <accessToken>`
3. **Token hết hạn** → Gọi `POST /refresh-token` để lấy token mới

**Phân quyền:**
- `User`: Truy cập các route thông thường (giỏ hàng, đơn hàng, profile...)
- `Admin`: Truy cập thêm các route `/admin/*`

---

## ✨ Tính năng chính

- **Xác thực OTP qua Email** — Đăng ký và quên mật khẩu
- **Thanh toán VNPay** — Tích hợp cổng thanh toán QR Code
- **Real-time Notification** — Sử dụng Socket.IO
- **Hệ thống gợi ý sản phẩm** — Personalized, Bought Together, Popular
- **Cron Jobs** — Tự động xử lý tác vụ định kỳ
- **Tìm kiếm nâng cao** — Fuzzy Search với Fuse.js

---

## 🐛 Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| `Cannot connect to MongoDB` | MongoDB chưa khởi động | Chạy `net start MongoDB` |
| `JWT secret not defined` | Thiếu biến env | Kiểm tra file `.env` |
| `Port already in use` | Port 6969 đang bị chiếm | Đổi `PORT` trong `.env` hoặc tắt process cũ |
| `Email authentication failed` | Sai App Password | Tạo lại App Password trong Google Account |
| `VNPay signature mismatch` | Sai `VNPAY_HASHSECRET` | Kiểm tra lại thông tin tài khoản VNPay |
