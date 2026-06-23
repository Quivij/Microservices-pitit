import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" }); // Lấy MONGO_URI

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Vui lòng cấu hình MONGO_URI trong .env");
  process.exit(1);
}

// 1. Kết nối DB
mongoose.connect(MONGO_URI)
  .then(() => console.log("Kết nối MongoDB thành công"))
  .catch((err) => {
    console.error("Lỗi kết nối:", err);
    process.exit(1);
  });

// 2. Định nghĩa Schema cơ bản để Seed dữ liệu
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Tạm để trống reference thật
      quantity: Number,
      price: Number,
    }
  ],
  totalPrice: Number,
  statusOrder: String,
  isDelivered: Boolean,
  paymentMethod: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

const seedData = async () => {
  try {
    console.log("Đang tạo dữ liệu mẫu...");

    // Tạo 3 User ảo
    const users = await User.insertMany([
      { username: "KhachHang_VIP1", email: "vip1@gmail.com", createdAt: new Date("2026-06-01") },
      { username: "KhachHang_Thuong", email: "thuong@gmail.com", createdAt: new Date("2026-06-15") },
      { username: "Test_User_2", email: "test2@gmail.com", createdAt: new Date("2026-06-20") }
    ]);

    console.log(`Đã tạo ${users.length} người dùng giả.`);

    // Tạo các mốc thời gian để vẽ biểu đồ
    const dates = [
      new Date("2026-06-05"),
      new Date("2026-06-10"),
      new Date("2026-06-15"),
      new Date("2026-06-20"),
      new Date("2026-06-22")
    ];

    const mockOrders = dates.map((date, index) => ({
      user: users[index % users.length]._id,
      items: [
        { quantity: 2, price: 1500000 }
      ],
      totalPrice: 3000000 * (index + 1), // Giá trị tăng dần để biểu đồ đẹp
      statusOrder: index % 2 === 0 ? "completed" : "preparing",
      isDelivered: index % 2 === 0,
      paymentMethod: "VNPAY",
      status: "paid",
      createdAt: date,
      updatedAt: date
    }));

    const orders = await Order.insertMany(mockOrders);
    console.log(`Đã tạo ${orders.length} đơn hàng giả.`);

    console.log("Seed dữ liệu hoàn tất! Hãy mở trang Admin để xem kết quả.");
    process.exit(0);
  } catch (err) {
    console.error("Lỗi khi seed data:", err);
    process.exit(1);
  }
};

seedData();
