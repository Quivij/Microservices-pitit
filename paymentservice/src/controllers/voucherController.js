import UserVoucher from "../models/userVoucher.js";
import Voucher from "../models/voucher.js";
import User from "../models/user.js"; // ✅ thêm import User

export const getVouchersByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Lấy thông tin user, bao gồm xu
    const user = await User.findById(userId).lean();
    const userXu = user?.xu || 0;

    const userVouchers = await UserVoucher.find({ userId })
      .populate("voucherId")
      .lean();

    const userVoucherMap = new Map();

    userVouchers.forEach(uv => {
      if (uv.voucherId && new Date(uv.voucherId.expiryDate) > new Date()) {
        userVoucherMap.set(uv.voucherId._id.toString(), {
          id: uv.voucherId._id,
          code: uv.voucherId.code,
          type: uv.voucherId.type,
          discountValue: uv.voucherId.discountValue,
          startDate: uv.voucherId.startDate,
          expiryDate: uv.voucherId.expiryDate,
          minOrderValue: uv.voucherId.minOrderValue,
          usageLimit: uv.voucherId.usageLimit,
          isPublic: uv.voucherId.isPublic,
          usedCount: uv.usedCount,
          maxUsagePerUser: uv.maxUsagePerUser,
          assignedDate: uv.assignedDate,
        });
      }
    });

    const publicVouchers = await Voucher.find({
      isPublic: true,
      expiryDate: { $gt: new Date() },
      startDate: { $lte: new Date() }
    }).lean();

    publicVouchers.forEach(pv => {
      if (!userVoucherMap.has(pv._id.toString())) {
        userVoucherMap.set(pv._id.toString(), {
          id: pv._id,
          code: pv.code,
          type: pv.type,
          discountValue: pv.discountValue,
          startDate: pv.startDate,
          expiryDate: pv.expiryDate,
          minOrderValue: pv.minOrderValue,
          usageLimit: pv.usageLimit,
          isPublic: pv.isPublic,
          usedCount: 0, // We don't check global usage limit here for performance, checkout will validate it
          maxUsagePerUser: 1,
          assignedDate: new Date(),
        });
      }
    });

    const vouchers = Array.from(userVoucherMap.values());

    return res.status(200).json({
      success: true,
      vouchers,
      xu: userXu, // ✅ trả về xu
    });
  } catch (error) {
    console.error("getVouchersByUser error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
