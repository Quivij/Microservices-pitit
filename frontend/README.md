# 🛒 PITITShop — Frontend

Giao diện người dùng cho hệ thống thương mại điện tử **PITITShop**, được xây dựng với **React**, **TypeScript** và **Redux Toolkit**.

---

## 📋 Mục lục

- [Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [Cài đặt](#-cài-đặt)
- [Cấu hình môi trường](#-cấu-hình-môi-trường)
- [Chạy ứng dụng](#-chạy-ứng-dụng)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Các trang và tính năng](#-các-trang-và-tính-năng)
- [Thư viện sử dụng](#-thư-viện-sử-dụng)
- [Scripts](#-scripts)

---

## 🖥️ Yêu cầu hệ thống

| Phần mềm | Phiên bản tối thiểu |
|----------|-------------------|
| Node.js  | v18.0.0 trở lên   |
| npm      | v9.0.0 trở lên    |
| Trình duyệt | Chrome / Firefox / Edge (phiên bản mới nhất) |

> ⚠️ **Lưu ý:** Backend phải đang chạy trước khi khởi động frontend. Xem hướng dẫn tại `backend/README.md`.

---

## ⚙️ Cài đặt

### Bước 1: Di chuyển vào thư mục frontend

```bash
cd PITITShop/frontend
```

### Bước 2: Cài đặt các gói phụ thuộc

```bash
npm install
```

> Quá trình này có thể mất vài phút. Nếu gặp cảnh báo về dependency, có thể thử:
> ```bash
> npm install --legacy-peer-deps
> ```

### Bước 3: Cấu hình biến môi trường

Tạo file `.env.local` trong thư mục `frontend/` (xem mục [Cấu hình môi trường](#-cấu-hình-môi-trường)).

---

## 🔧 Cấu hình môi trường

Tạo file `.env.local` tại `frontend/.env.local`:

```env
# URL của Backend API
REACT_APP_API_URL=http://localhost:6969/v1/api

# URL kết nối Socket.IO (Real-time notification)
REACT_APP_SOCKET_URL=http://localhost:6969
```

> **Lưu ý:** Nếu backend chạy trên port khác, hãy cập nhật số port tương ứng.

---

## ▶️ Chạy ứng dụng

### Chế độ phát triển (Development)

```bash
npm start
```

Ứng dụng sẽ tự động mở trình duyệt tại:

```
http://localhost:3000
```

### Build sản xuất (Production)

```bash
npm run build
```

File build sẽ được tạo trong thư mục `build/`.

---

## 📁 Cấu trúc thư mục

```
frontend/
├── public/               # Tài nguyên tĩnh (favicon, index.html)
├── src/
│   ├── api/              # Axios instance & các hàm gọi API
│   ├── components/       # Các component dùng chung
│   │   ├── layout/       # Navbar, Footer, Layout wrapper
│   │   └── ...
│   ├── hooks/            # Custom React Hooks
│   ├── pages/            # Các trang của ứng dụng
│   │   ├── Admin/        # Trang quản trị Admin
│   │   ├── Checkout/     # Trang thanh toán
│   │   ├── Order/        # Trang đơn hàng
│   │   ├── auth/         # Đăng nhập, Đăng ký, Quên mật khẩu
│   │   ├── cart/         # Trang giỏ hàng
│   │   ├── products/     # Trang danh sách & chi tiết sản phẩm
│   │   └── profile/      # Trang hồ sơ cá nhân
│   ├── redux/            # Redux store, slices
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Hàm tiện ích
│   ├── App.tsx           # Component gốc & định nghĩa routing
│   └── index.tsx         # Entry point
├── .env.local            # Biến môi trường (không commit lên git)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗺️ Các trang và tính năng

### Trang khách (Không cần đăng nhập)

| Đường dẫn | Trang | Mô tả |
|-----------|-------|-------|
| `/` | Trang chủ | Banner, sản phẩm nổi bật, gợi ý phổ biến |
| `/login` | Đăng nhập | Đăng nhập bằng email & mật khẩu |
| `/register` | Đăng ký | Tạo tài khoản mới (xác thực OTP) |
| `/forgot-password` | Quên mật khẩu | Đặt lại mật khẩu qua email |
| `/products` | Danh sách sản phẩm | Lọc, tìm kiếm, phân trang |
| `/products/:id` | Chi tiết sản phẩm | Thông tin, đánh giá, gợi ý liên quan |
| `/categories/:slug-:id` | Sản phẩm theo danh mục | Lọc theo danh mục |

### Trang người dùng (Yêu cầu đăng nhập)

| Đường dẫn | Trang | Mô tả |
|-----------|-------|-------|
| `/cart` | Giỏ hàng | Quản lý giỏ hàng, áp dụng voucher |
| `/checkout` | Thanh toán | Chọn địa chỉ, phương thức thanh toán |
| `/payment` | Thanh toán VNPay | Quét QR Code VNPay |
| `/orders` | Đơn hàng | Danh sách & trạng thái đơn hàng |
| `/profile` | Hồ sơ | Cập nhật thông tin, ảnh đại diện |

### Trang Admin (Yêu cầu quyền Admin)

| Đường dẫn | Trang | Mô tả |
|-----------|-------|-------|
| `/admin` | Dashboard | Thống kê tổng quan doanh thu, người dùng |
| `/admin/products` | Quản lý sản phẩm | Thêm, sửa, xóa sản phẩm |
| `/admin/orders` | Quản lý đơn hàng | Cập nhật trạng thái đơn hàng |
| `/admin/users` | Quản lý người dùng | Khóa/mở khóa tài khoản |
| `/admin/categories` | Quản lý danh mục | Thêm, sửa danh mục sản phẩm |

---

## 📚 Thư viện sử dụng

| Thư viện | Phiên bản | Mục đích |
|----------|-----------|----------|
| **React** | ^19.1.1 | Framework UI chính |
| **TypeScript** | 4.9 | Type safety |
| **Redux Toolkit** | ^2.8.2 | Quản lý state toàn cục |
| **React Router DOM** | ^7.8.2 | Điều hướng trang |
| **Axios** | ^1.11.0 | Gọi HTTP API |
| **Ant Design** | ^5.27.3 | Thư viện UI components |
| **Framer Motion** | ^12.23.12 | Hiệu ứng animation |
| **Recharts** | ^3.2.1 | Biểu đồ thống kê (Admin) |
| **Socket.IO Client** | ^4.8.1 | Real-time notifications |
| **React Toastify** | ^11.0.5 | Toast notifications |
| **Lucide React** | ^0.544.0 | Icon library |
| **Swiper** | ^11.2.10 | Slider/Carousel |
| **Bootstrap** | ^5.3.7 | CSS utility |
| **jsPDF** | ^3.0.2 | Xuất file PDF |
| **React Circular Progressbar** | ^2.2.0 | Biểu đồ vòng tròn |

---

## 🔄 Luồng người dùng

### Đăng ký tài khoản

```
Truy cập /register
  → Nhập thông tin (tên, email, mật khẩu)
  → Nhận OTP qua email
  → Xác thực OTP tại /verify-otp
  → Đăng nhập thành công → Chuyển đến trang chủ
```

### Mua hàng

```
Duyệt sản phẩm
  → Xem chi tiết sản phẩm
  → Thêm vào giỏ hàng
  → Vào /cart → Kiểm tra & chỉnh số lượng
  → /checkout → Chọn địa chỉ & phương thức thanh toán
  → Thanh toán VNPay (quét QR)
  → Xác nhận đơn hàng thành công
  → Theo dõi tại /orders
```

---

## 📝 Scripts

| Script | Lệnh | Mô tả |
|--------|------|-------|
| Phát triển | `npm start` | Chạy dev server tại port 3000 |
| Build | `npm run build` | Build production bundle |
| Test | `npm test` | Chạy test suite |
| Eject | `npm run eject` | Eject CRA config (không thể hoàn tác) |

---

## 🐛 Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Giải pháp |
|-----|-------------|-----------|
| `Failed to fetch` / `Network Error` | Backend chưa chạy | Khởi động backend trước |
| `CORS error` | Backend không cho phép origin | Kiểm tra cấu hình CORS ở backend |
| Trang trắng sau đăng nhập | Token lỗi hoặc Redux state sai | Xóa localStorage và đăng nhập lại |
| `npm install` lỗi dependency | Xung đột phiên bản | Chạy `npm install --legacy-peer-deps` |
| Ảnh không hiển thị | Sai đường dẫn API | Kiểm tra `REACT_APP_API_URL` trong `.env.local` |
| Thông báo real-time không hoạt động | Socket.IO không kết nối | Kiểm tra `REACT_APP_SOCKET_URL` trong `.env.local` |

---

## 🔗 Liên kết hữu ích

- 📖 **Backend API Docs**: Xem `backend/README.md`
- 🏗️ **React Documentation**: [react.dev](https://react.dev)
- 🗃️ **Redux Toolkit**: [redux-toolkit.js.org](https://redux-toolkit.js.org)
- 🎨 **Ant Design**: [ant.design](https://ant.design)
