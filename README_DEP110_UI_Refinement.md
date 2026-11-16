# DEP110 Platform --- UI Refinement Guide

## 1. Mục tiêu

Tinh chỉnh giao diện DEP110 theo phong cách **Minimalist · Professional
· Functional**.

Giao diện cần tạo cảm giác như một công cụ học tập và tra cứu kỹ thuật
chuyên nghiệp: rõ ràng, yên tĩnh, dễ đọc và tập trung vào nội dung.
Không biến website thành ứng dụng gamification hoặc dashboard nhiều màu
sắc.

**Nguyên tắc chính:** Ưu tiên khả năng đọc, điều hướng và học tập; mọi
yếu tố trang trí không phục vụ các mục tiêu này đều nên được loại bỏ
hoặc giảm nhẹ.

## 2. Phạm vi chỉnh sửa

Tập trung vào giao diện và trải nghiệm người dùng hiện có:

-   Dashboard tổng quan.
-   Sidebar điều hướng 14 chương học.
-   Các thẻ mô-đun chuyên sâu.
-   Thẻ thống kê tiến độ và kết quả thi.
-   Trạng thái hover, active, completed và disabled.
-   Responsive cho màn hình desktop, tablet và mobile.

**Không tự ý thay đổi** nội dung bài học, cấu trúc chương, ngân hàng câu
hỏi, logic chấm điểm, dữ liệu tiến độ, luồng thi thử hoặc các chức năng
đang hoạt động.

Trước khi sửa, kiểm tra cấu trúc dự án và tái sử dụng component, design
token và thư viện hiện có. Không tự ý thay framework hoặc cài thêm thư
viện nếu chưa có lý do cần thiết.

## 3. Định hướng thiết kế

### Phong cách

-   Tối giản, trung tính, chuyên nghiệp.
-   Bố cục có thứ bậc rõ ràng.
-   Ít màu, ít hiệu ứng, không gây xao nhãng.
-   Ưu tiên typography và khoảng trắng.
-   Tham khảo tinh thần Apple Developer Documentation, nhưng không sao
    chép nguyên giao diện.

### Bảng màu

  Vai trò              Màu         Ghi chú
  -------------------- ----------- -------------------------------------------
  Main background      `#FAFAFA`   Nền tổng thể
  Sidebar background   `#F5F5F5`   Phân tách nhẹ với nội dung
  Card background      `#FFFFFF`   Nền thẻ
  Primary text         `#171717`   Tiêu đề và nội dung chính
  Secondary text       `#737373`   Mô tả, metadata
  Border               `#E5E5E5`   Viền và đường phân cách
  Accent               `#0071E3`   Link, nút chính, trạng thái active
  Success              `#16803C`   Chỉ dùng cho trạng thái hoàn thành
  Danger               `#DC2626`   Chỉ dùng cho lỗi hoặc hành động nguy hiểm

Quy tắc sử dụng màu:

-   Trắng, xám và đen là màu chủ đạo.
-   Xanh dương chỉ dùng để chỉ ra hành động hoặc trạng thái tương tác.
-   Không dùng gradient.
-   Không dùng nhiều màu accent cùng lúc.
-   Không tô màu nền rực rỡ cho các thẻ thống kê.
-   Không dùng màu trạng thái chỉ để trang trí.

## 4. Typography

-   Ưu tiên system font hiện có; có thể dùng Inter nếu dự án đã tích
    hợp.
-   Nội dung tiếng Việt phải hiển thị đầy đủ dấu.
-   Tiêu đề dùng font-weight vừa đủ, tránh quá đậm.
-   Nội dung bài học ưu tiên khả năng đọc hơn việc tiết kiệm không gian.
-   Duy trì thứ bậc rõ ràng giữa page title, section title, card title
    và body text.

Gợi ý kích thước:

  Thành phần             Kích thước tham khảo
  -------------------- ----------------------
  Page title                         26--30px
  Section title                      18--20px
  Card title                         15--17px
  Body text                          14--15px
  Sidebar item                       13--14px
  Caption / metadata                 12--13px

Điều chỉnh theo hệ thống typography hiện tại nếu dự án đã có quy chuẩn
riêng.

## 5. Layout và component

### 5.1 Sidebar

-   Giữ sidebar bên trái và danh sách 14 chương.
-   Giữ khu vực hiển thị tiến độ học.
-   Nền xám rất nhạt, có đường phân cách mảnh.
-   Mục đang chọn dùng nền xám nhẹ hoặc accent xanh vừa phải; không dùng
    màu nền đậm.
-   Tên chương dài cần được xử lý bằng ellipsis hoặc xuống dòng hợp lý.
-   Trên màn hình nhỏ, sidebar có thể chuyển thành drawer hoặc
    navigation phù hợp với cấu trúc hiện tại.

### 5.2 Dashboard header

-   Giữ tên nền tảng và tiêu đề tổng quan DEP110.
-   Mô tả ngắn gọn mục tiêu lộ trình.
-   Các thao tác ngôn ngữ, giao diện tối và đặt lại phải gọn, dễ nhận
    biết.
-   Không để các nút phụ cạnh tranh thị giác với tiêu đề trang.

### 5.3 Thẻ thống kê

Giữ các thông tin hiện có:

-   Tiến độ học tập.
-   Ngân hàng đề thi.
-   Điểm thi cao nhất.
-   Thời lượng lộ trình.

Yêu cầu:

-   Dùng card nền trắng, viền xám mảnh.
-   Giảm kích thước số liệu nếu đang quá nổi bật.
-   Nhãn và mô tả phải dễ đọc.
-   Không dùng shadow đậm, gradient hoặc màu nền riêng cho từng card.

### 5.4 Thẻ mô-đun

Giữ bốn mô-đun:

1.  Trung tâm học tập.
2.  Giả lập phòng thi.
3.  Sơ đồ kiến trúc.
4.  Giả lập Terminal.

Yêu cầu:

-   Các card có kích thước và khoảng cách đồng nhất.
-   Tiêu đề rõ ràng, mô tả ngắn.
-   Link hoặc nút hành động đặt ở vị trí nhất quán.
-   Icon nhỏ, đơn sắc; chỉ giữ icon giúp nhận diện chức năng.
-   Hover chỉ cần đổi border hoặc màu chữ nhẹ, không phóng to hay phát
    sáng.

### 5.5 Border, radius và shadow

-   Border: `1px solid #E5E5E5`.
-   Border radius card: khoảng `8–10px`.
-   Button: khoảng `6–8px`.
-   Shadow: ưu tiên không dùng; chỉ dùng shadow rất nhẹ khi cần phân
    lớp.
-   Tránh card lồng card nếu không cần thiết.

## 6. Tương tác và trạng thái

Các trạng thái cần nhất quán:

-   **Default:** nền trung tính, viền nhẹ.
-   **Hover:** thay đổi nhẹ màu chữ hoặc border.
-   **Active / Selected:** thể hiện rõ mục đang được chọn.
-   **Completed:** dấu hiệu hoàn thành nhỏ, không cần huy hiệu lớn.
-   **Disabled:** giảm tương phản nhưng vẫn đủ khả năng đọc.
-   **Error:** thông báo rõ ràng, dùng màu đỏ có kiểm soát.

Không thêm animation trang trí. Nếu có transition, giữ ngắn và nhẹ, chỉ
phục vụ phản hồi tương tác.

## 7. Responsive

Đảm bảo giao diện hoạt động tốt ở:

-   Desktop: giữ sidebar và nội dung chính theo bố cục hiện tại.
-   Tablet: giảm khoảng trống và điều chỉnh số cột card.
-   Mobile: chuyển sidebar thành drawer hoặc menu phù hợp; card xếp một
    cột; không xuất hiện cuộn ngang ngoài chủ đích.

Không thu nhỏ chữ quá mức để cố nhồi nội dung vào màn hình.

## 8. Những điều không được thêm

-   Không gamification: XP, level, leaderboard, streak hoặc huy hiệu nếu
    chưa có yêu cầu.
-   Không gradient, glassmorphism hoặc neon.
-   Không illustration lớn chỉ để trang trí.
-   Không emoji thay cho icon giao diện.
-   Không hiệu ứng hover phức tạp.
-   Không thêm dashboard widget không phục vụ việc học DEP110.
-   Không thay đổi nội dung hoặc logic nghiệp vụ để làm đẹp giao diện.

## 9. Tiêu chí nghiệm thu

Sau khi chỉnh sửa, kiểm tra các tiêu chí sau:

-   [ ] Giao diện tổng thể tối giản, chuyên nghiệp và ít màu.
-   [ ] Sidebar vẫn hiển thị và điều hướng đủ 14 chương.
-   [ ] Bốn mô-đun chuyên sâu vẫn truy cập được.
-   [ ] Các số liệu tiến độ và kết quả vẫn lấy từ dữ liệu thực tế.
-   [ ] Các nút ngôn ngữ, giao diện tối và đặt lại vẫn hoạt động.
-   [ ] Không làm hỏng chức năng học, thi thử, chấm điểm hoặc lưu tiến
    độ.
-   [ ] Không có lỗi tràn chữ hoặc cuộn ngang ngoài ý muốn.
-   [ ] Hiển thị tốt trên desktop, tablet và mobile.
-   [ ] Không phát sinh màu sắc hoặc hiệu ứng trang trí không cần thiết.

## 10. Quy trình thực hiện

1.  Kiểm tra cấu trúc dự án, framework, component và stylesheet hiện có.
2.  Xác định các component đang tạo nên dashboard và sidebar.
3.  Tạo hoặc chuẩn hóa design token cho màu sắc, typography, spacing,
    border và radius.
4.  Chỉnh sửa từng khu vực theo thứ tự: layout tổng thể → sidebar →
    header → thống kê → mô-đun.
5.  Kiểm tra responsive và các trạng thái tương tác.
6.  Chạy dự án, kiểm tra console và thử lại các chức năng quan trọng.
7.  Tổng kết những file đã thay đổi và những chức năng đã kiểm thử.

**Kết quả mong muốn:** Một DEP110 Learning Platform có giao diện basic,
sạch, dễ đọc và chuyên nghiệp; người học tập trung vào kiến thức và thao
tác học tập thay vì hiệu ứng giao diện.
