BỘ KHOA HỌC VÀ CÔNG NGHỆ
HỌC VIỆN CÔNG NGHỆ BƯU CHÍNH VIỄN THÔNG 
------------------------------
 
BÁO CÁO CUỐI KỲ 
Môn: Phát triển phần mềm hướng dịch vụ
Giảng viên hướng dẫn: ThS. Nguyễn Trung Hiếu
Các thành viên tham gia:
Bàn Văn Huy	N22DCCN034
Bùi Đình Tuấn	N22DCCN095
Nguyễn Thanh Qui	N22DCCN065
Y Cao Nguyênn Byă	N22DCCN200
 
TP. Hồ Chí Minh, tháng 6 năm 2026  

LỜI CẢM ƠN
Trước tiên, chúng em xin gửi lời cảm ơn chân thành và sâu sắc đến giảng viên ThS. Nguyễn Trung Hiếu, một người thầy tận tụy, giàu tri thức và luôn là nguồn cảm hứng bất tận trong hành trình học tập của chúng em về Phát triển phần mềm hướng dịch vụ.
Trong suốt thời gian học cùng thầy, chúng em không chỉ nhận được những buổi giảng dạy chất lượng mà còn được trải nghiệm sự tận tâm, nhiệt huyết trong việc chia sẻ kinh nghiệm và hướng dẫn từng bước. Thầy không chỉ giảng dạy bằng giáo trình mà còn truyền tải những bài học thực tiễn quý giá, bao gồm cả những thành công lẫn những thử thách trong ngành phần mềm, giúp chúng em có cái nhìn toàn diện và sâu sắc hơn về kiến trúc Microservices và cách xây dựng hệ thống phần mềm hướng dịch vụ.
Sự quan tâm và hỗ trợ của thầy vượt xa vai trò một người giảng viên. Thầy luôn sẵn lòng giải đáp mọi thắc mắc, đồng hành cùng chúng em trong các buổi thảo luận, hướng dẫn dự án, và đưa ra những góp ý mang tính xây dựng. Chính nhờ đó, chúng em không chỉ trau dồi kiến thức mà còn rèn luyện tư duy sáng tạo, phân tích và giải quyết vấn đề – những kỹ năng vô cùng quan trọng để phát triển bản thân và chuẩn bị bước vào thế giới công việc thực tế.
Chúng em rất tự hào và biết ơn khi có thầy đồng hành trong những năm tháng học tập. Cuối cùng, chúng em xin kính chúc thầy luôn dồi dào sức khỏe, hạnh phúc và đạt được nhiều thành công hơn nữa trong sự nghiệp giáo dục. Thầy mãi là người mà chúng em luôn trân trọng và biết ơn.
Trân trọng
 
MỤC LỤC
(Phần mục lục giữ nguyên cấu trúc)

PHẦN MỞ ĐẦU
1. Giới thiệu đề tài
Trong bối cảnh công nghệ thông tin và thương mại điện tử phát triển mạnh mẽ, việc xây dựng các hệ thống phần mềm không chỉ dừng lại ở việc đáp ứng chức năng mà còn phải đảm bảo về chất lượng, độ tin cậy, hiệu suất, khả năng mở rộng (scalability) và khả năng chịu lỗi (fault tolerance). Đặc biệt, đối với các hệ thống thương mại điện tử lớn, kiến trúc phần mềm đóng vai trò then chốt trong việc nâng cao trải nghiệm người dùng và đảm bảo hoạt động kinh doanh ổn định. Xuất phát từ yêu cầu đó, nhóm chúng em thực hiện đề tài “EazyBuy” – một hệ thống web thương mại điện tử chuyên cung cấp các sản phẩm thời trang được xây dựng theo kiến trúc Microservices. Không chỉ tập trung vào việc xây dựng chức năng, đề tài còn hướng tới việc áp dụng các nguyên lý của Phát triển phần mềm hướng dịch vụ trong toàn bộ quá trình thiết kế, hiện thực đến triển khai hệ thống.

2. Lý do chọn đề tài
Việc lựa chọn đề tài “EazyBuy” với kiến trúc Microservices xuất phát từ nhu cầu thực tế trong việc xây dựng các hệ thống phần mềm lớn, linh hoạt và dễ bảo trì hiện nay. Các hệ thống Monolithic (nguyên khối) thường gặp khó khăn khi mở rộng, trong khi Microservices giúp chia nhỏ hệ thống thành các dịch vụ độc lập. Do đó, nhóm lựa chọn đề tài này nhằm:
 • Áp dụng kiến thức chuyên môn về kiến trúc phần mềm hướng dịch vụ (Service-Oriented Architecture / Microservices).
 • Xây dựng hệ thống web thương mại điện tử hoàn chỉnh với Frontend (React) và Backend tách biệt thành nhiều services.
 • Giải quyết bài toán phân tán dữ liệu, giao tiếp giữa các dịch vụ thông qua API Gateway.
 • Nâng cao khả năng làm việc nhóm, phân tách module rõ ràng để triển khai.

3. Mục tiêu đề tài
Mục tiêu của đề tài tập trung vào việc xây dựng hệ thống web EazyBuy và áp dụng kiến trúc Microservices:
 • Xây dựng hệ thống Microservices EazyBuy hoàn chỉnh: 
• Phát triển các dịch vụ độc lập: Identity Service, Product Service, Cart Service, Order Service, Payment Service.
• Xây dựng API Gateway đóng vai trò trung gian định tuyến (routing) request.
• Phát triển nền tảng web mua sắm (ReactJS) thân thiện.
 • Áp dụng quy trình phát triển hướng dịch vụ:
• Thiết kế API chuẩn RESTful cho từng service.
• Đảm bảo tính độc lập về cơ sở dữ liệu (Database per service / Collection per service).
 • Đảm bảo chất lượng và an toàn:
• Áp dụng xác thực và phân quyền tập trung bằng JWT.
• Xử lý thanh toán an toàn thông qua VNPAY.

4. Đối tượng nghiên cứu
Đối tượng nghiên cứu của đề tài bao gồm:
 • Hệ thống phần mềm: 
• Frontend: ReactJS, Vite, Axios. 
• Backend (Microservices): NodeJS (ExpressJS), API Gateway (http-proxy-middleware). 
• Database: MongoDB (Atlas / Cloud). 
 • Người dùng cuối (User): Người có nhu cầu mua sắm trực tuyến trên nền tảng web.
 • Quản trị viên (Admin): Quản lý sản phẩm, đơn hàng, người dùng qua Dashboard.
 • Các yếu tố thiết kế hướng dịch vụ: 
• Sự giao tiếp giữa các services (Synchronous qua HTTP/REST).
• Quản lý lỗi cục bộ và tính sẵn sàng của hệ thống.

5. Phạm vi nghiên cứu
 Phạm vi của đề tài tập trung vào:
 • Xây dựng và triển khai kiến trúc Microservices: 5 services lõi và 1 API Gateway.
 • Xây dựng giao diện Web (Client & Admin) bằng React.
 • Các chức năng: Quản lý sản phẩm, đăng ký/đăng nhập, giỏ hàng, đặt hàng, thanh toán VNPay.

6. Yêu cầu bài toán của đề tài
Hệ thống EazyBuy cần đáp ứng các yêu cầu:
 • Yêu cầu chức năng: Đăng ký/đăng nhập, quản lý sản phẩm, giỏ hàng, thanh toán VNPAY, quản lý đơn hàng.
 • Yêu cầu phi chức năng:
 • Giao tiếp giữa các services phải đảm bảo tốc độ qua API Gateway.
 • Thời gian phản hồi nhanh (< 2s).
 • Ứng dụng Web Responsive, hiển thị tốt trên nhiều thiết bị.

CHƯƠNG 1: SPECIFICATIONS
1.1 Giới thiệu 
Tài liệu này trình bày chi tiết các yêu cầu và đặc điểm kỹ thuật cho hệ thống EazyBuy dựa trên kiến trúc Microservices. Nó đóng vai trò như một hướng dẫn cho đội ngũ phát triển, đảm bảo các chức năng và tiêu chuẩn được thực hiện đúng. 

1.2 Tổng quan sản phẩm
Hệ thống web được thiết kế hiện đại, giúp người dùng tìm kiếm, lựa chọn sản phẩm nhanh chóng. Về mặt kỹ thuật, hệ thống được tách thành các Microservices (Cart, Product, Identity, Order, Payment) liên kết thông qua API Gateway, đảm bảo tính mở rộng, dễ dàng bảo trì và khả năng scale từng chức năng độc lập theo nhu cầu.

1.3 Mục tiêu chính
• Xây dựng nền tảng EazyBuy hoàn chỉnh trên kiến trúc Microservices.
• Đảm bảo độc lập dữ liệu và logic nghiệp vụ giữa các service.
• Xây dựng giao diện web React tương tác nhanh nhạy (SPA - Single Page Application).

1.4 Mô tả chức năng
(Các chức năng tương tự như tài liệu cũ nhưng áp dụng cho nền tảng Web EazyBuy: Quản lý sản phẩm, Giỏ hàng, Đơn hàng, Thanh toán, User, Doanh thu, v.v.)

1.6 Thông số kỹ thuật
1.6.1 Yêu cầu về phần cứng
• Backend Server: Các container/server cần CPU tối thiểu 2-4 cores, RAM 8GB để chạy nhiều process NodeJS đồng thời.
• Client: Trình duyệt web hiện đại (Chrome, Edge, Safari, Firefox).
1.6.2 Yêu cầu về phần mềm
• Frontend: ReactJS (Vite), Axios, Recharts (vẽ biểu đồ).
• Backend / Microservices: Node.js (ExpressJS), JWT.
• Middleware / API Gateway: http-proxy-middleware.
• Database: MongoDB (Atlas Cloud).

CHƯƠNG 2: USE CASE
(Sơ đồ Usecase và Đặc tả Usecase giữ nguyên các luồng logic nhưng thực hiện trên nền tảng Web ReactJS của hệ thống EazyBuy).
* Chú ý thay đổi: Đối tượng thao tác là hệ thống Website EazyBuy thay vì ứng dụng điện thoại.

CHƯƠNG 3: SEQUENCE DIAGRAM
(Các biểu đồ tuần tự sẽ mô tả luồng gọi từ Frontend React -> API Gateway -> Tới các Microservice tương ứng -> Database).
Ví dụ:
- Đăng nhập: React -> API Gateway -> Identity Service -> MongoDB.
- Mua hàng: React -> API Gateway -> Order Service (gọi Payment Service / Cart Service) -> MongoDB.

CHƯƠNG 4: DATABASE
Sử dụng hệ quản trị CSDL NoSQL MongoDB. Do đặc thù Microservices, các service sẽ quản lý tập dữ liệu của riêng mình (ví dụ: Product Service chỉ gọi tới collection products, categories; Identity Service gọi tới collection users).

CHƯƠNG 5: XÂY DỰNG GIAO DIỆN VÀ CÁC CHỨC NĂNG CỦA ỨNG DỤNG
(Mô tả các giao diện trên nền tảng Web ReactJS của EazyBuy như Trang chủ, Giỏ hàng, Quản lý đơn hàng, Thanh toán VNPAY, Dashboard Admin thống kê doanh thu).

CHƯƠNG 6. KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
6.1 Kết quả đạt được
 Hoàn thành việc xây dựng nền tảng thương mại điện tử EazyBuy với kiến trúc Microservices. Đã chia tách thành công các dịch vụ backend (Identity, Product, Cart, Order, Payment) giao tiếp qua API Gateway. Giao diện frontend xây dựng bằng ReactJS hoạt động mượt mà dưới dạng Single Page Application. Hệ thống đã tích hợp thanh toán VNPay và bảo mật JWT token. Việc áp dụng kiến trúc hướng dịch vụ giúp dự án rõ ràng, code dễ bảo trì và team có thể làm việc song song trên nhiều service khác nhau.

6.2 Hạn chế của ứng dụng
 • Giao tiếp giữa các services chủ yếu dùng HTTP Synchronous, có thể gây độ trễ nếu có chuỗi gọi dịch vụ phức tạp.
 • Chưa triển khai Message Broker (như RabbitMQ / Kafka) cho các tác vụ bất đồng bộ (ví dụ: gửi email, cập nhật tồn kho).
 • Hệ thống chưa được container hóa (Docker) triệt để trong môi trường production.

6.3 Định hướng phát triển 
• Áp dụng Message Broker (Kafka/RabbitMQ) để giao tiếp bất đồng bộ giữa các microservices (Event-Driven Architecture).
• Triển khai dự án lên nền tảng Cloud sử dụng Docker và Kubernetes để tăng khả năng Auto-scaling.
• Bổ sung tính năng phân tích hành vi người dùng, đánh giá sản phẩm thông minh.
• Tối ưu hệ thống API Gateway bằng cách tích hợp Rate Limiting và Caching (Redis).

TÀI LIỆU THAM KHẢO
[1] React Documentation. (2025). Truy cập tại: https://react.dev/
[2] OpenJS Foundation. Node.js Documentation. Truy cập tại: https://nodejs.org/docs/
[3] ExpressJS Team. Express.js. Truy cập tại: https://expressjs.com/
[4] Sam Newman. (2015). Building Microservices: Designing Fine-Grained Systems. O'Reilly Media.
[5] MongoDB, Inc. MongoDB Manual. Truy cập tại: https://www.mongodb.com/docs/manual/
[6] Vite Documentation. Truy cập tại: https://vitejs.dev/
[7] Auth0. JSON Web Tokens. Truy cập tại: https://jwt.io/
[8] VNPay API Documentation. Truy cập tại: https://sandbox.vnpayment.vn/apis/
