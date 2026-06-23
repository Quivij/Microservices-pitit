import React from 'react';
import './InfoPages.css';

const ContactPage: React.FC = () => {
  return (
    <div className="info-page-container">
      <div className="info-header-banner">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn lắng nghe và hỗ trợ bạn mọi lúc</p>
      </div>
      
      <div className="info-content">
        <div className="contact-grid">
          {/* Thông tin liên hệ */}
          <div className="contact-details">
            <h2>Thông tin liên hệ</h2>
            <p>Nếu bạn có bất kỳ câu hỏi hay cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua các kênh dưới đây:</p>
            
            <div className="contact-item">
              <i className="bi bi-geo-alt-fill"></i>
              <div>
                <strong>Địa chỉ:</strong>
                <p>168 Man Thiện, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-person-fill"></i>
              <div>
                <strong>Người đại diện:</strong>
                <p>Nguyễn Thanh Quí</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-telephone-fill"></i>
              <div>
                <strong>Điện thoại / Zalo:</strong>
                <p>0768099048</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-envelope-fill"></i>
              <div>
                <strong>Email:</strong>
                <p>contact@ptitshop.vn</p>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="contact-form">
            <h2>Gửi tin nhắn cho chúng tôi</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.'); }}>
              <div className="form-group">
                <label>Họ và tên</label>
                <input type="text" placeholder="Nhập họ tên của bạn" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Nhập địa chỉ email" required />
              </div>
              <div className="form-group">
                <label>Nội dung tin nhắn</label>
                <textarea rows={5} placeholder="Bạn muốn hỏi gì?" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Gửi tin nhắn</button>
            </form>
          </div>
        </div>

        {/* Bản đồ Google Maps */}
        <div className="map-container">
          <h2>Bản đồ đường đi</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.420663991515!2d106.7825220757367!3d10.847936657870196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527158a0a5b81%3A0xf45c5d34ac580517!2sH%E1%BB%8Dc%20vi%E1%BB%87n%20C%C3%B4ng%20ngh%E1%BB%87%20B%C6%B0u%20ch%C3%ADnh%20Vi%E1%BB%85n%20th%C3%B4ng%20C%C6%A1%20s%E1%BB%9F%20t%E1%BA%A1i%20TP.H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
            width="100%" 
            height="400" 
            style={{ border: 0, borderRadius: '12px' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps PTITShop"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
