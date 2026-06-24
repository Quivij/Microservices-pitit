import Voucher from "../models/voucher.js";
import UserVoucher from "../models/userVoucher.js";

// Lấy danh sách toàn bộ vouchers cho Admin
export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find().sort({ createdAt: -1 }).lean();
    
    // Đếm số lượng đã sử dụng cho từng voucher
    const vouchersWithStats = await Promise.all(
      vouchers.map(async (v) => {
        const usageStats = await UserVoucher.aggregate([
          { $match: { voucherId: v._id } },
          { $group: { _id: null, totalUsed: { $sum: "$usedCount" } } }
        ]);
        const usedCount = usageStats.length > 0 ? usageStats[0].totalUsed : 0;
        return { ...v, usedCount };
      })
    );

    return res.status(200).json({ success: true, vouchers: vouchersWithStats });
  } catch (error) {
    console.error("getAllVouchers error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Tạo mới voucher
export const createVoucher = async (req, res) => {
  try {
    const { code, type, discountValue, startDate, expiryDate, minOrderValue, usageLimit, isPublic } = req.body;

    const existingVoucher = await Voucher.findOne({ code });
    if (existingVoucher) {
      return res.status(400).json({ success: false, message: "Mã voucher đã tồn tại" });
    }

    const newVoucher = await Voucher.create({
      code,
      type,
      discountValue,
      startDate: startDate || Date.now(),
      expiryDate,
      minOrderValue: minOrderValue || 0,
      usageLimit: usageLimit || 0,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    return res.status(201).json({ success: true, voucher: newVoucher });
  } catch (error) {
    console.error("createVoucher error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Cập nhật voucher
export const updateVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Không cho phép sửa code thành code đã tồn tại
    if (updateData.code) {
      const existing = await Voucher.findOne({ code: updateData.code, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Mã voucher đã tồn tại" });
      }
    }

    const updatedVoucher = await Voucher.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedVoucher) {
      return res.status(404).json({ success: false, message: "Không tìm thấy voucher" });
    }

    return res.status(200).json({ success: true, voucher: updatedVoucher });
  } catch (error) {
    console.error("updateVoucher error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Xóa voucher
export const deleteVoucher = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Có thể cần kiểm tra xem voucher đã có user nào nhận/sử dụng chưa trước khi xóa
    const deleted = await Voucher.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy voucher" });
    }
    
    // (Tùy chọn) Xóa dữ liệu ở UserVoucher
    await UserVoucher.deleteMany({ voucherId: id });

    return res.status(200).json({ success: true, message: "Đã xóa voucher thành công" });
  } catch (error) {
    console.error("deleteVoucher error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
