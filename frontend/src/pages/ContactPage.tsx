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
                <p>97 Man Thiện, Phường Hiệp Phú, TP. Thủ Đức, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="bi bi-person-fill"></i>
              <div>
                <strong>Người đại diện:</strong>
                <p>Nguyễn Thanh Qui</p>
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
            src="https://maps.google.com/maps?q=97%20Man%20Thi%E1%BB%87n,%20Hi%E1%BB%87p%20Ph%C3%BA,%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c,%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=17&ie=UTF8&iwloc=&output=embed"
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
