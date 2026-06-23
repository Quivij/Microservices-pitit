import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../../api/orderApi.ts";
import { Order } from "../../types/Order";

const OrdersCard: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderApi.getOrder();
                // Get the first 3 orders for the summary card
                setOrders(res.data.orders.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch orders in OrdersCard", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered": return "status-delivered";
            case "delivering": return "status-shipping";
            case "cancelled": return "status-cancelled";
            default: return "status-pending";
        }
    };
    
    const getStatusText = (status: string) => {
        switch (status) {
            case "pending": return "Chờ xác nhận";
            case "confirmed": return "Đã xác nhận";
            case "preparing": return "Chuẩn bị hàng";
            case "delivering": return "Đang giao";
            case "delivered": return "Hoàn thành";
            case "cancelled": return "Đã hủy";
            default: return status;
        }
    };

    if (loading) {
        return <div className="profile-card"><div className="card-content">Đang tải...</div></div>;
    }

    return (
        <div className="profile-card">
            <div className="card-header">
                <h2>Đơn hàng của tôi</h2>
                <button className="view-all-btn" onClick={() => navigate('/orders')}>
                    Xem tất cả
                </button>
            </div>
            <div className="card-content">
                {orders.length > 0 ? (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order._id} className="order-item">
                                <div className="order-info">
                                    <div className="order-header">
                                        <span className="order-id">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                        <span className={`order-status ${getStatusColor(order.statusOrder)}`}>
                                            {getStatusText(order.statusOrder)}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <p className="order-date">Ngày đặt: {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                                        <p className="order-items">{order.items.length} loại sản phẩm</p>
                                    </div>
                                </div>
                                <div className="order-total">
                                    <span className="total-amount">
                                        {order.totalPrice.toLocaleString('vi-VN')}đ
                                    </span>
                                    <button className="order-detail-btn" onClick={() => navigate('/orders')}>
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <i className="bi bi-bag"></i>
                        <p>Bạn chưa có đơn hàng nào</p>
                        <button className="shop-now-btn" onClick={() => navigate('/products')}>
                            Mua sắm ngay
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersCard;
