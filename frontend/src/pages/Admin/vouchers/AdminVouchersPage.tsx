import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Ticket } from "lucide-react";
import { toast } from "react-toastify";
import { voucherApi, Voucher } from "../../../api/voucherApi.ts";
import "./AdminVouchersPage.css";

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState<Voucher | null>(null);

  const [formData, setFormData] = useState<Partial<Voucher>>({
    code: "",
    type: "percentage",
    discountValue: 0,
    minOrderValue: 0,
    usageLimit: 0,
    isPublic: true,
    startDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await voucherApi.getAllVouchers();
      if (res.success) {
        setVouchers(res.vouchers);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Lỗi khi tải danh sách voucher");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (voucher?: Voucher) => {
    if (voucher) {
      setEditingVoucher(voucher);
      setFormData({
        code: voucher.code,
        type: voucher.type,
        discountValue: voucher.discountValue,
        minOrderValue: voucher.minOrderValue,
        usageLimit: voucher.usageLimit,
        isPublic: voucher.isPublic,
        startDate: new Date(voucher.startDate).toISOString().split("T")[0],
        expiryDate: new Date(voucher.expiryDate).toISOString().split("T")[0],
      });
    } else {
      setEditingVoucher(null);
      setFormData({
        code: "",
        type: "percentage",
        discountValue: 0,
        minOrderValue: 0,
        usageLimit: 0,
        isPublic: true,
        startDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVoucher(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVoucher) {
        const idToUpdate = editingVoucher._id || editingVoucher.id;
        await voucherApi.updateVoucher(idToUpdate as string, formData);
        toast.success("Cập nhật voucher thành công");
      } else {
        await voucherApi.createVoucher(formData);
        toast.success("Tạo voucher thành công");
      }
      handleCloseModal();
      fetchVouchers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        await voucherApi.deleteVoucher(id);
        toast.success("Xóa voucher thành công");
        fetchVouchers();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Có lỗi xảy ra khi xóa");
      }
    }
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate).getTime() < new Date().getTime();
  };

  return (
    <div className="admin-vouchers-container">
      <div className="page-header">
        <h2>Quản lý Vouchers</h2>
        <button className="add-btn" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Thêm Voucher
        </button>
      </div>

      <div className="vouchers-table-container">
        {loading ? (
          <p style={{ padding: "20px" }}>Đang tải dữ liệu...</p>
        ) : (
          <table className="vouchers-table">
            <thead>
              <tr>
                <th>Mã Code</th>
                <th>Mức Giảm</th>
                <th>Đơn Tối Thiểu</th>
                <th>Đã Dùng / Giới Hạn</th>
                <th>Ngày Hết Hạn</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v._id || v.id}>
                  <td>
                    <span className="voucher-code">{v.code}</span>
                  </td>
                  <td>
                    {v.type === "percentage" 
                      ? `${v.discountValue}%` 
                      : `${v.discountValue.toLocaleString()}đ`}
                  </td>
                  <td>{v.minOrderValue.toLocaleString()}đ</td>
                  <td>
                    {v.usedCount || 0} / {v.usageLimit === 0 ? "∞" : v.usageLimit}
                  </td>
                  <td>{new Date(v.expiryDate).toLocaleDateString("vi-VN")}</td>
                  <td>
                    {isExpired(v.expiryDate) ? (
                      <span className="status-badge status-expired">Hết hạn</span>
                    ) : (
                      <span className="status-badge status-active">Đang chạy</span>
                    )}
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleOpenModal(v)} title="Sửa">
                        <Edit2 size={16} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete((v._id || v.id) as string)} title="Xóa">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {vouchers.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "30px" }}>
                    Chưa có mã giảm giá nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-voucher-modal-overlay">
          <div className="admin-voucher-modal-content">
            <h3>{editingVoucher ? "Chỉnh sửa Voucher" : "Thêm Voucher mới"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mã Voucher (Code)</label>
                <input 
                  type="text" 
                  name="code" 
                  value={formData.code} 
                  onChange={handleInputChange} 
                  required 
                  style={{ textTransform: "uppercase" }}
                />
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Loại giảm giá</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="percentage">Theo phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (VNĐ)</option>
                  </select>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Mức giảm</label>
                  <input 
                    type="number" 
                    name="discountValue" 
                    value={formData.discountValue} 
                    onChange={handleInputChange} 
                    required 
                    min="1"
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Đơn tối thiểu (VNĐ)</label>
                  <input 
                    type="number" 
                    name="minOrderValue" 
                    value={formData.minOrderValue} 
                    onChange={handleInputChange} 
                    min="0"
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Giới hạn số lần dùng (0 = Vô hạn)</label>
                  <input 
                    type="number" 
                    name="usageLimit" 
                    value={formData.usageLimit} 
                    onChange={handleInputChange} 
                    min="0"
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Ngày bắt đầu</label>
                  <input 
                    type="date" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Ngày hết hạn</label>
                  <input 
                    type="date" 
                    name="expiryDate" 
                    value={formData.expiryDate} 
                    onChange={handleInputChange} 
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input 
                  type="checkbox" 
                  name="isPublic" 
                  checked={formData.isPublic} 
                  onChange={handleInputChange} 
                  id="isPublic"
                  style={{ width: "auto", margin: 0 }}
                />
                <label htmlFor="isPublic" style={{ margin: 0 }}>Hiển thị công khai (Public)</label>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>Hủy</button>
                <button type="submit" className="submit-btn">Lưu Voucher</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
