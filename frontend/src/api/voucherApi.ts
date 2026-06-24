import axiosClient from "./axiosClient.ts";

export type Voucher = {
  _id?: string;
  id?: string;
  code: string;
  type: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  expiryDate: string;
  minOrderValue: number;
  usageLimit: number;
  isPublic: boolean;
  usedCount: number;
  maxUsagePerUser: number;
  assignedDate: string;
};

export const voucherApi = {
  getMyVouchers: async (): Promise<{
    success: boolean;
    vouchers: Voucher[];
    xu: number;
  }> => {
    return await axiosClient.get("/voucher/my");
  },

  getAllVouchers: async (): Promise<{ success: boolean; vouchers: Voucher[] }> => {
    return await axiosClient.get("/admin/vouchers");
  },

  createVoucher: async (data: Partial<Voucher>): Promise<{ success: boolean; voucher: Voucher }> => {
    return await axiosClient.post("/admin/vouchers", data);
  },

  updateVoucher: async (id: string, data: Partial<Voucher>): Promise<{ success: boolean; voucher: Voucher }> => {
    return await axiosClient.put(`/admin/vouchers/${id}`, data);
  },

  deleteVoucher: async (id: string): Promise<{ success: boolean; message: string }> => {
    return await axiosClient.delete(`/admin/vouchers/${id}`);
  },
};
