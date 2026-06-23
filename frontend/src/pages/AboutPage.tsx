import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPages.css';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="info-page-container">
      <div className="info-header-banner">
        <h1>Giới thiệu về PTITShop</h1>
        <p>Nơi mang đến cho bạn trải nghiệm mua sắm tuyệt vời nhất</p>
      </div>
      
      <div className="info-content">
        <section className="info-section">
          <h2>Tầm nhìn và Sứ mệnh</h2>
          <p>
            Được thành lập với mục tiêu trở thành nền tảng thương mại điện tử hàng đầu dành cho cộng đồng sinh viên, 
            <strong> PTITShop</strong> không ngừng nỗ lực mang lại những sản phẩm chất lượng với mức giá ưu đãi nhất.
            Chúng tôi tin rằng việc mua sắm không chỉ là để sở hữu món đồ, mà còn là một trải nghiệm trọn vẹn từ lúc lướt web đến khi nhận hàng.
          </p>
        </section>

        <section className="info-section grid-section">
          <div className="info-card">
            <i className="bi bi-shield-check"></i>
            <h3>Chất lượng đảm bảo</h3>
            <p>100% sản phẩm được kiểm duyệt kỹ lưỡng trước khi đến tay khách hàng.</p>
          </div>
          <div className="info-card">
            <i className="bi bi-truck"></i>
            <h3>Giao hàng nhanh chóng</h3>
            <p>Hệ thống logistics tối ưu giúp đơn hàng được giao đi trong thời gian ngắn nhất.</p>
          </div>
          <div className="info-card">
            <i className="bi bi-headset"></i>
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng giải đáp mọi thắc mắc của bạn.</p>
          </div>
        </section>

        <div className="info-cta">
          <h2>Bắt đầu mua sắm ngay hôm nay!</h2>
          <button className="btn-primary" onClick={() => navigate('/products')}>
            Khám phá sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
