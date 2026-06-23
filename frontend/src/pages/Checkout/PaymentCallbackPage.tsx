import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { paymentApi } from '../../api/paymentApi.ts';

const PaymentCallbackPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    useEffect(() => {
        const processPayment = async () => {
            try {
                // Gọi API backend checkPayment
                const query = location.search;
                const res = await paymentApi.checkPayment(query);
                
                if (res.success) {
                    setResult({ success: true, message: res.message || "Thanh toán thành công!" });
                } else {
                    setResult({ success: false, message: res.message || "Thanh toán thất bại!" });
                }
            } catch (error: any) {
                console.error("Payment callback error:", error);
                setResult({ 
                    success: false, 
                    message: error.response?.data?.message || "Có lỗi xảy ra khi xác nhận thanh toán" 
                });
            } finally {
                setLoading(false);
            }
        };

        if (location.search) {
            processPayment();
        } else {
            setLoading(false);
            setResult({ success: false, message: "Không tìm thấy thông tin thanh toán hợp lệ" });
        }
    }, [location]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
                <Spin size="large" />
                <h3 style={{ marginTop: 20 }}>Đang xử lý kết quả thanh toán...</h3>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Result
                status={result?.success ? "success" : "error"}
                title={result?.success ? "Thanh toán thành công!" : "Thanh toán thất bại"}
                subTitle={result?.message}
                extra={[
                    <Button type="primary" key="orders" onClick={() => navigate('/orders')}>
                        Xem đơn hàng
                    </Button>,
                    <Button key="home" onClick={() => navigate('/home')}>
                        Về trang chủ
                    </Button>,
                ]}
            />
        </div>
    );
};

export default PaymentCallbackPage;