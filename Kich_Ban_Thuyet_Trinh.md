# KỊCH BẢN THUYẾT TRÌNH ĐỒ ÁN EAZYBUY

Tài liệu này bao gồm 2 phần cho mỗi Slide:
1. **Nội dung trên Slide (Visuals):** Các gạch đầu dòng đưa lên màn hình (PowerPoint/Canva).
2. **Lời thoại thuyết trình (Script):** Lời nói trực tiếp của người thuyết trình.

---

## 1. Slide Mở Đầu

**Nội dung trên Slide:**
*   **Đề tài:** Hệ thống Thương mại điện tử EazyBuy theo Kiến trúc Hướng dịch vụ (Microservices).
*   **Môn học:** Phát triển phần mềm hướng dịch vụ.
*   **Giảng viên hướng dẫn:** [Tên thầy/cô]
*   **Nhóm thực hiện & Phân công:**
    *   Nguyễn Văn A: Core Backend, API Gateway (30%)
    *   Trần Thị B: Frontend, UI/UX (25%)
    *   Lê Văn C: Identity, Product Services & DB (25%)
    *   Phạm Văn D: Cart, Payment & Deployment (20%)

**🗣 Lời thoại thuyết trình:**
> "Dạ, em chào thầy/cô và các bạn. Hôm nay, đại diện cho nhóm, em xin phép được trình bày về đồ án môn học Phát triển phần mềm hướng dịch vụ. Đề tài của nhóm em là Xây dựng hệ thống thương mại điện tử EazyBuy, được phát triển dựa trên kiến trúc Microservices. Trên slide là danh sách các thành viên trong nhóm cũng như tỷ lệ đóng góp của từng người trong dự án này ạ."

---

## 2. Phát Biểu Bài Toán & Nhu Cầu Hướng Dịch Vụ

**Nội dung trên Slide:**
*   **Vấn đề của hệ thống Monolithic (Nguyên khối):**
    *   Codebase phình to, khó bảo trì.
    *   Khó mở rộng (scale) các tính năng độc lập.
    *   Một module lỗi (vd: thanh toán) có thể làm sập toàn bộ web.
*   **Giải pháp Hướng dịch vụ (Microservices) cho EazyBuy:**
    *   Tách biệt nghiệp vụ (Loose Coupling).
    *   Scale linh hoạt (vd: Mùa sale chỉ cần tăng server cho Product/Cart).
    *   Cô lập lỗi (Fault Isolation): Lỗi thanh toán không ảnh hưởng việc xem hàng.

**🗣 Lời thoại thuyết trình:**
> "Để bắt đầu, em xin nói về lý do tại sao nhóm chọn kiến trúc này. Với các trang web bán hàng truyền thống làm theo dạng nguyên khối (Monolithic), khi lượng người dùng tăng đột biến, toàn bộ hệ thống sẽ bị quá tải, và nếu chức năng thanh toán bị lỗi code, có thể kéo theo trang chủ cũng không vào được.
> 
> Nhận thấy điều đó, nhóm em quyết định áp dụng SOA/Microservices cho EazyBuy. Việc tách nhỏ thành các dịch vụ độc lập giúp hệ thống linh hoạt hơn rất nhiều. Ví dụ, vào dịp Black Friday, lượng người vào xem hàng cực lớn, nhóm chỉ cần cấp thêm tài nguyên cho dịch vụ 'Sản phẩm' mà không cần tốn kém nâng cấp cả hệ thống. Đồng thời, nếu dịch vụ Thanh toán đang bảo trì, khách hàng vẫn có thể lướt xem và thêm hàng vào giỏ bình thường."

---

## 3. Kiến Trúc Hệ Thống (SOA/Microservices Architecture)

**Nội dung trên Slide (Trình bày sơ đồ - Rất quan trọng):**
*   *(Chèn Sơ đồ luồng: Client -> API Gateway -> [Identity, Product, Cart, Order, Payment] -> Database riêng).*
*   **API Gateway:** Điểm vào duy nhất (Single entry point), xử lý định tuyến và xác thực (Authentication).
*   **Database per Service:** Đảm bảo nguyên tắc dữ liệu độc lập.

**🗣 Lời thoại thuyết trình:**
> "Mời thầy cô nhìn lên sơ đồ kiến trúc tổng thể. Hệ thống EazyBuy của nhóm không cho phép Client gọi thẳng vào các dịch vụ bên trong, mà mọi request đều phải đi qua một cổng duy nhất là **API Gateway**. Gateway này đóng vai trò như một người bảo vệ, kiểm tra xem user đã đăng nhập chưa, sau đó mới định tuyến (route) request đến đúng dịch vụ cần thiết.
> 
> Điểm đặc trưng nhất của hướng dịch vụ mà nhóm em áp dụng là cơ chế **Database per Service**. Mỗi dịch vụ (Sản phẩm, Đơn hàng, Giỏ hàng) đều giữ một Database riêng và tuyệt đối không chọc thẳng vào Database của nhau, mà phải giao tiếp thông qua API. Điều này đảm bảo tính đóng gói và giảm thiểu sự phụ thuộc."

---

## 4. Danh sách các Dịch vụ trong EazyBuy

**Nội dung trên Slide:**
*   **Identity Service:** Đăng ký, đăng nhập, phân quyền (JWT token).
*   **Product Service:** Quản lý danh mục, chi tiết sản phẩm.
*   **Cart Service:** Lưu trữ tạm thời giỏ hàng của user.
*   **Order Service:** Xử lý logic đặt hàng, kiểm tra tồn kho.
*   **Payment Service:** Xử lý thanh toán qua cổng VNPay, gửi Email hóa đơn.

**🗣 Lời thoại thuyết trình:**
> "Cụ thể hơn, hệ thống EazyBuy được nhóm chia làm 5 dịch vụ lõi:
> 1. Identity Service: Chuyên lo việc đăng nhập, cấp phát token bảo mật.
> 2. Product Service: Xử lý hiển thị thông tin sản phẩm.
> 3. Cart Service: Quản lý giỏ hàng.
> 4. Order Service: Nơi tiếp nhận yêu cầu đặt hàng và tính toán tổng tiền.
> 5. Payment Service: Dịch vụ chuyên biệt đảm nhận việc thanh toán trực tuyến và tự động gửi email hóa đơn cho khách.
> Mỗi dịch vụ này giống như một dự án nhỏ độc lập, do các thành viên khác nhau phụ trách code và triển khai."

---

## 5. Giải Pháp Tích Hợp & Giao Tiếp

**Nội dung trên Slide:**
*   **Giao tiếp Đồng bộ (Synchronous):** Giao tiếp qua HTTP/RESTful API (VD: Gateway gọi xuống Services).
*   **Giao tiếp Bất đồng bộ / Nền:** (Gửi Email xác nhận qua background job).
*   **Tích hợp bên thứ 3 (Third-Party):** Cổng thanh toán VNPay.
    *   Luồng: Client -> Payment Service -> Chuyển hướng VNPay -> Nhận Webhook/Callback -> Cập nhật trạng thái đơn.

**🗣 Lời thoại thuyết trình:**
> "Vậy các dịch vụ này nói chuyện với nhau như thế nào? Nhóm sử dụng chủ yếu là RESTful API cho giao tiếp đồng bộ. Ví dụ, khi Order Service cần biết thông tin người mua, nó sẽ gọi một API HTTP sang Identity Service.
> 
> Đặc biệt, ở phần Payment Service, nhóm có tích hợp hệ thống với bên thứ 3 là cổng thanh toán VNPay. Khi khách nhấn thanh toán, dịch vụ của nhóm sẽ tạo một đường link bảo mật, chuyển hướng người dùng sang VNPay. Sau khi khách quét mã thành công, VNPay sẽ gọi ngược lại (callback) hệ thống EazyBuy để hệ thống tự động chuyển trạng thái đơn hàng thành 'Đã thanh toán' và kích hoạt luồng gửi Email hóa đơn cho khách."

---

## 6. Demo Sản Phẩm Thực Tế

**Nội dung trên Slide:**
*   **Live Demo EazyBuy System**
    *   1. Khám phá sản phẩm
    *   2. Giỏ hàng & Đặt hàng
    *   3. Thanh toán qua VNPay
    *   4. Email xác nhận

**🗣 Lời thoại thuyết trình:**
> "Trăm nghe không bằng một thấy, sau đây em xin phép được demo trực tiếp các luồng nghiệp vụ chính của hệ thống. 
> Đầu tiên, em sẽ đăng nhập vào hệ thống. Sau đó tiến hành thêm một sản phẩm vào giỏ hàng. Thầy cô có thể thấy mọi thao tác rất mượt mà. 
> Bây giờ là bước quan trọng nhất: Đặt hàng và Thanh toán. Em sẽ chọn thanh toán qua VNPay... *(thực hiện thao tác quét mã hoặc dùng thẻ test)*... Vâng, giao dịch đã thành công, hệ thống đã cập nhật trạng thái đơn hàng và gửi một email hóa đơn về hộp thư."

---

## 7. Kết Luận & Hướng Phát Triển

**Nội dung trên Slide:**
*   **Kết quả đạt được:**
    *   Hoàn thiện hệ thống E-commerce cơ bản.
    *   Hiểu và vận dụng đúng các Pattern của Microservices (API Gateway, DB per service).
    *   Công nghệ: Node.js, React/Typescript, MongoDB/SQL, VNPay.
*   **Hạn chế & Hướng phát triển:**
    *   Tốc độ giao tiếp nội bộ qua HTTP còn độ trễ -> Đề xuất dùng gRPC.
    *   Chưa có Message Broker (RabbitMQ/Kafka) để xử lý logic bất đồng bộ tốt hơn.
    *   Tương lai: Áp dụng Docker/Kubernetes và CI/CD để tự động hóa hoàn toàn việc triển khai.

**🗣 Lời thoại thuyết trình:**
> "Để kết luận, qua đồ án này nhóm em đã xây dựng thành công một hệ thống bán hàng từ frontend đến backend và quan trọng nhất là hiểu rõ cách triển khai, vận hành một hệ thống Microservices thực tế.
> 
> Tuy nhiên, hệ thống vẫn còn một số điểm có thể cải thiện. Hiện tại việc giao tiếp giữa các services dùng HTTP API đôi khi gây ra độ trễ. Trong tương lai, nếu được phát triển tiếp, nhóm sẽ chuyển sang dùng gRPC cho giao tiếp nội bộ để tối ưu tốc độ, đồng thời tích hợp RabbitMQ để các luồng xử lý như gửi mail, trừ kho hàng diễn ra ngầm (bất đồng bộ) nhằm tăng trải nghiệm người dùng.
> 
> Bài thuyết trình của nhóm đến đây là kết thúc. Cảm ơn thầy/cô và các bạn đã lắng nghe. Nhóm rất mong nhận được câu hỏi và những góp ý từ thầy cô ạ!"
