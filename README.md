# EazyBuy — Hệ thống Thương mại điện tử Microservices

Dự án EazyBuy là một hệ thống thương mại điện tử hiện đại, được xây dựng theo kiến trúc Microservices (Hướng dịch vụ) sử dụng Node.js, Express, ReactJS và MongoDB.

---

## 🏗️ Kiến Trúc Hệ Thống (Architecture)

```text
                    ┌─────────────┐
                    │    React    │  :3000
                    │  Frontend   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ API Gateway │  :6969 (Node.js)
                    └──┬──┬──┬──┬─┘
                       │  │  │  │
        ┌──────────────┼──┼──┼──┼──────────────┐
        │              │  │  │  │              │
 ┌──────▼──────┐┌──────▼──▼──▼──▼──────┐┌──────▼──────┐
 │             ││    Microservices     ││             │
 │   MongoDB   ││ :6970 cartservice    ││   VNPAY /   │
 │    Atlas    ││ :6971 productservice ││ Nodemailer  │
 │   (Cloud)   ││ :6972 identityservice││ (3rd Party) │
 │             ││ :6973 orderservice   ││             │
 │             ││ :6974 paymentservice ││             │
 └─────────────┘└──────────────────────┘└─────────────┘
```

---

## 🚀 Hướng Dẫn Chạy Dự Án (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
- Đã cài đặt **Node.js** (Khuyến nghị bản v18 trở lên).
- Có tài khoản **MongoDB Atlas** (Cloud Database) hoặc MongoDB chạy ở local.

### 2. Thiết lập Môi trường (Environment Setup)
Hệ thống bao gồm 5 microservices, mỗi dịch vụ đều có một file `.env` riêng. Bạn cần đảm bảo đã tạo file `.env` và điền đủ cấu hình, quan trọng nhất là chuỗi kết nối Database `MONGO_URI`.

Ví dụ nội dung file `.env` của một service:
```env
PORT=6971
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ptitshop?ssl=true
JWT_SECRET=your_jwt_secret
```
*(Nếu sử dụng Email và VNPay, hãy cấu hình thêm `EMAIL_USER`, `EMAIL_PASS`, `VNPAY_TMNCODE`, `VNPAY_HASHSECRET` trong `identityservice` hoặc `paymentservice`)*.

### 3. Cài đặt các gói phụ thuộc (Install Dependencies)
Hệ thống sử dụng package `concurrently` ở cấp độ thư mục gốc (root) để khởi chạy toàn bộ dịch vụ cùng lúc. 
Mở terminal tại thư mục gốc của dự án (`EazyBuy-main`) và chạy:

```bash
npm install
```
*Lệnh này sẽ cài đặt các dependency cần thiết để chạy lệnh script tổng.*
*(Lưu ý: Bạn cũng cần đảm bảo đã chạy `npm install` bên trong từng thư mục microservice và thư mục `frontend`)*.

### 4. Khởi chạy toàn bộ hệ thống (Run All Services)
Sau khi đã thiết lập xong, bạn có thể khởi chạy toàn bộ hệ thống (Bao gồm Frontend, Gateway và 5 Microservices) chỉ bằng 1 lệnh duy nhất tại thư mục gốc:

```bash
npm start
```

**Quá trình khởi chạy sẽ diễn ra như sau:**
- Frontend React chạy trên cổng `3000`.
- API Gateway chạy trên cổng `6969`.
- Cart Service chạy trên cổng `6970`.
- Product Service chạy trên cổng `6971`.
- Identity Service chạy trên cổng `6972`.
- Order Service chạy trên cổng `6973`.
- Payment Service chạy trên cổng `6974`.

### 5. Truy cập hệ thống
Sau khi terminal báo các dịch vụ đã chạy thành công, bạn mở trình duyệt:
- **Trang khách hàng / Admin:** [http://localhost:3000](http://localhost:3000)
- **API Gateway:** [http://localhost:6969/v1/api/](http://localhost:6969/v1/api/)

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend:** ReactJS, Vite, Recharts, Axios.
- **Backend:** Node.js, Express, Multer, Mongoose.
- **Database:** MongoDB Atlas (NoSQL).
- **Tích hợp:** VNPAY (Thanh toán trực tuyến), Nodemailer (Gửi Email tự động).
- **Kiến trúc:** Microservices kết hợp API Gateway (http-proxy-middleware).

---

## 📦 Import Dữ Liệu Mẫu (Mock Data)
Nếu Database MongoDB của bạn là mới tinh và chưa có dữ liệu:
1. Mở phần mềm **MongoDB Compass**.
2. Kết nối bằng chuỗi `MONGO_URI` của bạn.
3. Tạo cơ sở dữ liệu `ptitshop`.
4. Import các file `.json` có sẵn trong thư mục `productservice/src/Database/` vào các collection tương ứng (như `products`, `categories`).
