# Apple Enterprise Technical Support -- Lộ trình học 30 ngày

> **Mục tiêu:** Chuẩn bị kiến thức nền tảng và tư duy kỹ thuật để ứng
> tuyển vị trí Technical iOS / Apple Enterprise Technical Support.\
> **Thời lượng:** 30 ngày · 1,5--2 giờ/ngày · khoảng 45--55 giờ.\
> **Điều kiện thực hành:** Không có thiết bị Apple; học bằng tài liệu
> chính thức, mô phỏng quy trình, sơ đồ kiến trúc và tình huống kỹ
> thuật.

------------------------------------------------------------------------

## 1. Giới thiệu khóa học

Khóa học tập trung vào quản trị thiết bị Apple trong môi trường doanh
nghiệp, không tập trung vào lập trình ứng dụng iOS bằng Swift.

Các nền tảng chính:

-   **iOS:** Hệ điều hành dành cho iPhone.
-   **iPadOS:** Hệ điều hành dành cho iPad.
-   **macOS:** Hệ điều hành dành cho Mac.
-   **Apple Business Manager (ABM):** Nền tảng của Apple hỗ trợ tổ chức
    quản lý thiết bị, tài khoản và nội dung.
-   **Mobile Device Management (MDM):** Cơ chế/hệ thống quản trị thiết
    bị di động và thiết bị Apple.
-   **Jamf Pro:** Giải pháp MDM của bên thứ ba chuyên cho hệ sinh thái
    Apple.
-   **Automated Device Enrollment (ADE):** Phương thức tự động đăng ký
    thiết bị vào hệ thống quản lý của tổ chức.

### Kết quả mong đợi

Sau 30 ngày, người học có thể:

1.  Phân biệt iOS, iPadOS, macOS và các thành phần chính của hệ sinh
    thái Apple.
2.  Giải thích vai trò và mối quan hệ giữa ABM, MDM, ADE, APNs và Jamf
    Pro.
3.  Mô tả quy trình triển khai thiết bị Apple cho doanh nghiệp.
4.  Thiết kế ở mức tài liệu các nhóm thiết bị, cấu hình, chính sách và
    phương án phân phối ứng dụng.
5.  Phân tích các tình huống troubleshooting thường gặp.
6.  Viết tài liệu triển khai, hướng dẫn hỗ trợ và quy trình offboarding.
7.  Trình bày một mô hình Apple Enterprise trong buổi phỏng vấn.

> **Giới hạn thực hành:** Khi chưa có iPhone, iPad, Mac hoặc môi trường
> ABM/MDM được cấp quyền, người học chỉ có thể mô phỏng và thiết kế quy
> trình. Không được ghi trong CV rằng đã trực tiếp triển khai Jamf, ADE
> hoặc MDM nếu chưa thực sự thao tác trên môi trường tương ứng.

------------------------------------------------------------------------

## 2. Phương pháp học

Mỗi buổi học nên kéo dài 90--120 phút:

  Thời lượng   Hoạt động
  ------------ --------------------------------------------------------
  20 phút      Học lý thuyết và thuật ngữ
  30 phút      Đọc tài liệu kỹ thuật chính thức
  40 phút      Thực hành mô phỏng, phân tích tình huống hoặc vẽ sơ đồ
  15 phút      Trả lời câu hỏi phỏng vấn
  15 phút      Kiểm tra và ghi chú

Ba hình thức thực hành:

-   **Documentation Lab:** Đọc tài liệu và diễn giải quy trình kỹ thuật.
-   **MDM Simulation:** Thiết kế mô hình quản trị thiết bị và chính sách
    giả lập.
-   **Technical Case Study:** Phân tích sự cố, xác định nguyên nhân, đề
    xuất xử lý và xác minh kết quả.

------------------------------------------------------------------------

## 3. Lộ trình 30 ngày

### Tuần 1 -- Apple Ecosystem & iOS Fundamentals

**Mục tiêu:** Hiểu hệ sinh thái Apple, các hệ điều hành và nền tảng bảo
mật cơ bản.

  -----------------------------------------------------------------------
  Ngày                    Nội dung lý thuyết      Bài thực hành / đầu ra
  ----------------------- ----------------------- -----------------------
  1                       Tổng quan Apple         Vẽ sơ đồ hệ sinh thái
                          Ecosystem; iOS, iPadOS, Apple; phân loại thiết
                          macOS, watchOS, tvOS,   bị và hệ điều hành
                          visionOS                

  2                       Kiến trúc iOS; Darwin,  Vẽ sơ đồ kiến trúc iOS;
                          XNU Kernel, Core OS     so sánh khái quát với
                                                  Windows và Linux

  3                       Apple Account, Managed  Lập bảng phân biệt tài
                          Apple Account, iCloud   khoản cá nhân và tài
                                                  khoản được quản lý

  4                       App Store, App Signing, Mô tả quy trình cài đặt
                          App Sandbox             ứng dụng và các cơ chế
                                                  kiểm soát ứng dụng

  5                       iOS Security, Secure    Vẽ sơ đồ các lớp bảo
                          Boot, Encryption, Face  mật thiết bị
                          ID                      

  6                       Wi-Fi, VPN, DNS, DHCP   Viết 5 kịch bản lỗi kết
                          trên thiết bị Apple     nối và các bước kiểm
                                                  tra

  7                       Ôn tập tuần 1           Làm bài kiểm tra; trả
                                                  lời câu hỏi phỏng vấn;
                                                  hoàn thiện sơ đồ Apple
                                                  Ecosystem
  -----------------------------------------------------------------------

**Câu hỏi ôn tập:**

1.  iOS, iPadOS và macOS khác nhau như thế nào?
2.  Sandbox có tác dụng gì?
3.  Secure Boot giúp bảo vệ thiết bị như thế nào?
4.  Apple Account khác Managed Apple Account ở điểm nào?
5.  Vì sao doanh nghiệp cần quản lý thiết bị tập trung?

**Đầu ra tuần 1:** `apple-ecosystem-overview.drawio` và tài liệu tổng
quan hệ điều hành Apple.

### Tuần 2 -- Apple Business Manager & MDM

**Mục tiêu:** Hiểu cách doanh nghiệp sở hữu, phân bổ, đăng ký và quản lý
thiết bị Apple.

  -----------------------------------------------------------------------
  Ngày                    Nội dung lý thuyết      Bài thực hành / đầu ra
  ----------------------- ----------------------- -----------------------
  8                       ABM: Devices, Users,    Thiết kế cấu trúc ABM
                          Roles, Locations        giả lập

  9                       Apple School Manager và Lập bảng so sánh môi
                          sự khác biệt với ABM    trường doanh nghiệp và
                                                  trường học

  10                      MDM Architecture, MDM   Vẽ sơ đồ giao tiếp MDM
                          Server, APNs            

  11                      ADE -- Automated Device Mô phỏng quy trình
                          Enrollment              triển khai iPhone mới

  12                      Supervision, Device     So sánh các phương thức
                          Enrollment, User        enrollment
                          Enrollment              

  13                      Managed Apple Account,  Thiết kế mô hình tài
                          Apps and Books          khoản và phân phối ứng
                                                  dụng

  14                      Tổng hợp ABM, MDM, ADE  Thiết kế mô hình
                                                  ABM/MDM cho doanh
                                                  nghiệp giả lập
  -----------------------------------------------------------------------

**Khái niệm phải nắm:**

-   **ABM:** Quản lý thiết bị thuộc tổ chức, phân công thiết bị cho MDM
    Server, quản lý tài khoản và nội dung phù hợp.
-   **MDM:** Quản lý thiết bị bằng lệnh, cấu hình, chính sách và thông
    tin kiểm kê.
-   **ADE:** Hỗ trợ đăng ký thiết bị tự động trong quá trình thiết lập
    ban đầu.
-   **APNs:** Dịch vụ thông báo đẩy của Apple; MDM sử dụng APNs để báo
    thiết bị liên hệ với máy chủ quản lý. APNs không truyền toàn bộ
    payload cấu hình MDM.
-   **Supervision:** Trạng thái quản lý nâng cao dành cho thiết bị thuộc
    tổ chức, mở ra thêm khả năng kiểm soát.
-   **User Enrollment / Device Enrollment:** Các mô hình đăng ký thiết
    bị có phạm vi quản lý và quyền kiểm soát khác nhau.

**Bài lab tuần 2:**

Bối cảnh công ty giả lập:

-   100 nhân viên.
-   70 iPhone.
-   20 iPad.
-   10 MacBook.
-   3 phòng ban: IT, Kế toán, Kinh doanh.

Thiết kế:

1.  Mô hình tổ chức và phân quyền ABM.
2.  Phân loại thiết bị theo phòng ban.
3.  Gán thiết bị cho MDM Server.
4.  Quy trình ADE.
5.  Chính sách bảo mật ban đầu.
6.  Quy trình xử lý khi nhân viên nghỉ việc.

**Câu hỏi ôn tập:**

1.  ABM và MDM khác nhau như thế nào?
2.  ADE có tác dụng gì?
3.  Supervised Device là gì?
4.  APNs có vai trò gì trong MDM?
5.  User Enrollment khác Device Enrollment như thế nào?
6.  Làm thế nào triển khai số lượng lớn iPhone?

**Đầu ra tuần 2:** `enterprise-deployment-diagram.drawio` và
`abm-mdm-deployment.md`.

### Tuần 3 -- Jamf Pro & Device Management

**Mục tiêu:** Hiểu các chức năng quản trị thiết bị Apple thường gặp
trong giải pháp MDM, lấy Jamf Pro làm ví dụ.

  -----------------------------------------------------------------------
  Ngày                    Nội dung lý thuyết      Bài thực hành / đầu ra
  ----------------------- ----------------------- -----------------------
  15                      Tổng quan Jamf Pro,     Phân tích các thành
                          kiến trúc và Device     phần và dữ liệu kiểm kê
                          Inventory               

  16                      Enrollment, Device      Thiết kế nhóm thiết bị
                          Groups, Smart Groups    theo phòng ban và điều
                                                  kiện

  17                      Configuration Profiles  Viết đặc tả cấu hình
                                                  Wi-Fi, VPN, chứng chỉ
                                                  hoặc mật khẩu

  18                      Policies và             Thiết kế chính sách và
                          Restrictions            điều kiện áp dụng

  19                      App Management, Apps    Thiết kế quy trình phân
                          and Books               phối ứng dụng

  20                      Security, Compliance,   Xây dựng bộ chính sách
                          Software Updates        bảo mật và cập nhật

  21                      Ôn tập Jamf Pro         Hoàn thiện kế hoạch cấu
                                                  hình MDM và bài kiểm
                                                  tra
  -----------------------------------------------------------------------

**Các nhóm chức năng cần hiểu:**

1.  **Inventory Management:** Theo dõi model, serial number, phiên bản
    hệ điều hành và trạng thái thiết bị.
2.  **Configuration Profiles:** Phân phối các thiết lập được hệ điều
    hành hỗ trợ, ví dụ Wi-Fi, VPN, chứng chỉ và hạn chế.
3.  **Policies:** Tự động hóa tác vụ theo phạm vi, điều kiện hoặc lịch
    thực thi; khả năng áp dụng tùy loại thiết bị và nền tảng.
4.  **App Management:** Quản lý và phân phối ứng dụng.
5.  **Smart Groups:** Tạo nhóm động dựa trên điều kiện của thiết bị.

**Bài lab tuần 3:**

Thiết kế chính sách cho ba phòng ban:

  -----------------------------------------------------------------------
  Phòng ban                           Yêu cầu giả lập
  ----------------------------------- -----------------------------------
  IT                                  Wi-Fi công ty, VPN, ứng dụng kỹ
                                      thuật

  Kế toán                             Wi-Fi, ứng dụng nghiệp vụ, hạn chế
                                      phù hợp với dữ liệu nhạy cảm

  Kinh doanh                          Email doanh nghiệp, ứng dụng CRM,
                                      Wi-Fi
  -----------------------------------------------------------------------

Với mỗi cấu hình, ghi rõ:

-   Tên cấu hình.
-   Mục đích.
-   Nền tảng và loại thiết bị áp dụng.
-   Các thiết lập dự kiến.
-   Phạm vi triển khai.
-   Điều kiện áp dụng.
-   Cách xác minh.
-   Phương án rollback hoặc xử lý nếu triển khai lỗi.

**Câu hỏi ôn tập:**

1.  Jamf Pro là gì?
2.  Configuration Profile là gì?
3.  Policy khác Configuration Profile như thế nào?
4.  Smart Group dùng để làm gì?
5.  Làm thế nào phân phối ứng dụng cho nhiều iPhone?
6.  Nếu thiết bị không nhận Configuration Profile, cần kiểm tra những
    gì?
7.  Làm thế nào quản lý cập nhật hệ điều hành?

**Đầu ra tuần 3:** `mdm-configuration-plan.md`,
`configuration-profiles.md`, `policies.md` và `smart-groups.md`.

### Tuần 4 -- Technical Support, Troubleshooting & Interview

**Mục tiêu:** Áp dụng kiến thức để phân tích sự cố và trình bày giải
pháp kỹ thuật.

  -----------------------------------------------------------------------
  Ngày                    Nội dung lý thuyết      Bài thực hành / đầu ra
  ----------------------- ----------------------- -----------------------
  22                      Troubleshooting         Viết quy trình kiểm tra
                          iOS/iPadOS; Wi-Fi, DNS, lỗi mạng
                          VPN                     

  23                      Apple Account,          Phân tích tình huống
                          Activation Lock         thiết bị bị khóa

  24                      MDM Enrollment          Phân tích lỗi thiết bị
                          Troubleshooting         không enrollment

  25                      App Deployment & Update Phân tích lỗi ứng dụng
                                                  không cài được

  26                      Security & Compliance   Xử lý thiết bị không
                                                  đạt chính sách

  27                      IT Asset Management &   Thiết kế quy trình thu
                          Offboarding             hồi thiết bị

  28                      Technical Documentation Viết tài liệu bàn giao
                                                  và xử lý sự cố

  29                      Mock Interview          Phỏng vấn kỹ thuật giả
                                                  lập 30 phút

  30                      Final Assessment        Hoàn thiện và trình bày
                                                  dự án Apple Enterprise
                                                  Lab
  -----------------------------------------------------------------------

**10 tình huống cần luyện:**

1.  iPhone không kết nối Wi-Fi công ty.
2.  iPhone không nhận cấu hình MDM.
3.  Thiết bị không xuất hiện trong ABM.
4.  Thiết bị không tự động enrollment.
5.  Người dùng không cài được ứng dụng công ty.
6.  Nhân viên quên mật mã thiết bị.
7.  Thiết bị bị Activation Lock.
8.  VPN công ty không kết nối.
9.  Thiết bị chạy phiên bản iOS không đáp ứng yêu cầu.
10. Nhân viên nghỉ việc nhưng chưa bàn giao iPhone.

**Khung xử lý sự cố:**

1.  **Identify:** Xác định vấn đề và phạm vi ảnh hưởng.
2.  **Investigate:** Thu thập thông tin, kiểm tra trạng thái và tìm
    nguyên nhân.
3.  **Resolve:** Đề xuất và thực hiện giải pháp được cấp quyền.
4.  **Verify:** Xác minh kết quả, ghi nhận và cập nhật tài liệu.

**Đầu ra tuần 4:** `troubleshooting-guide.md`, `deployment-runbook.md`,
quy trình offboarding và bộ câu trả lời phỏng vấn.

------------------------------------------------------------------------

## 4. Dự án cuối khóa -- Apple Enterprise Management Lab

### 4.1. Bối cảnh

Thiết kế mô hình quản trị 100 thiết bị Apple cho công ty giả lập:

-   60 iPhone.
-   25 iPad.
-   15 MacBook.
-   3 phòng ban: IT, Kế toán, Kinh doanh.

### 4.2. Yêu cầu

  Hạng mục            Sản phẩm cần hoàn thành
  ------------------- -------------------------------------
  Architecture        Sơ đồ ABM + MDM + thiết bị Apple
  Enrollment          Quy trình ADE và enrollment
  Device Management   Nhóm thiết bị và chính sách
  Security            Chính sách bảo mật
  Application         Phương án phân phối ứng dụng
  Troubleshooting     10 tình huống và quy trình xử lý
  Documentation       Tài liệu hướng dẫn IT Support
  Offboarding         Quy trình thu hồi và xử lý thiết bị

### 4.3. Cấu trúc thư mục portfolio

``` text
Apple-Enterprise-Lab/
├── README.md
├── 01-Architecture/
│   └── enterprise-topology.drawio
├── 02-ABM/
│   └── abm-configuration.md
├── 03-MDM/
│   └── mdm-deployment.md
├── 04-Jamf/
│   ├── configuration-profiles.md
│   ├── policies.md
│   └── smart-groups.md
├── 05-Security/
│   └── security-policy.md
├── 06-Troubleshooting/
│   └── troubleshooting-guide.md
└── 07-Documentation/
    └── deployment-runbook.md
```

> Đây là dự án thiết kế và mô phỏng. Chỉ ghi nhận những thao tác thực tế
> khi đã được thực hiện trên môi trường có quyền truy cập.

------------------------------------------------------------------------

## 5. Bộ câu hỏi phỏng vấn tổng hợp

### Apple Fundamentals

1.  Apple Ecosystem là gì?
2.  iOS, iPadOS và macOS khác nhau như thế nào?
3.  Activation Lock là gì?
4.  Supervised Device là gì?
5.  Configuration Profile là gì?
6.  Sandbox hoạt động như thế nào?
7.  Apple có những cơ chế bảo mật thiết bị nào?

### Enterprise Management

8.  Apple Business Manager là gì?
9.  MDM là gì? Tại sao doanh nghiệp cần MDM?
10. ABM có thay thế MDM không?
11. Jamf Pro là gì?
12. ADE hoạt động như thế nào?
13. APNs có vai trò gì?
14. Device Enrollment khác User Enrollment như thế nào?
15. Làm thế nào triển khai 100 iPhone cùng lúc?
16. Làm thế nào xử lý thiết bị khi nhân viên nghỉ việc?
17. Làm thế nào phân phối ứng dụng cho thiết bị doanh nghiệp?

### Troubleshooting

18. iPhone không nhận Wi-Fi công ty, bạn xử lý thế nào?
19. Thiết bị không nhận MDM Profile, bạn kiểm tra gì?
20. Nhân viên không cài được ứng dụng công ty, bạn làm gì?
21. Thiết bị bị Activation Lock, IT có thể xử lý như thế nào?
22. Nếu APNs certificate hết hạn thì điều gì có thể xảy ra?
23. Làm thế nào xác định thiết bị có tuân thủ chính sách bảo mật?
24. Nếu thiết bị bị mất, IT cần thực hiện những bước nào?

### Thang đánh giá năng lực

  Mức   Tiêu chí
  ----- ------------------------------------
  0     Chưa biết khái niệm
  1     Biết định nghĩa
  2     Giải thích được cách hoạt động
  3     Đưa ra được ví dụ thực tế
  4     Phân tích và xử lý được tình huống

Mục tiêu cuối khóa: đạt mức 3 trở lên với phần lớn câu hỏi và mức 4 với
các tình huống hỗ trợ cơ bản.

------------------------------------------------------------------------

## 6. Tài liệu học tập chính thức

Ưu tiên tài liệu của Apple và Jamf:

1.  [Apple iPhone User
    Guide](https://support.apple.com/guide/iphone/welcome/ios)
2.  [Apple Platform
    Deployment](https://support.apple.com/guide/deployment/welcome/web)
3.  [Apple Device Management
    Documentation](https://developer.apple.com/documentation/devicemanagement/)
4.  [Jamf Learning Hub](https://learn.jamf.com/)
5.  [Jamf 100
    Course](https://learn.jamf.com/r/en-US/jamf-100-course-current)
6.  [Microsoft Intune -- Apple Enrollment
    Guide](https://learn.microsoft.com/en-us/intune/device-enrollment/apple/guide-ios-ipados)

**Thứ tự ưu tiên:** Apple Platform Deployment → Jamf 100 → Apple Device
Management Documentation → tài liệu Intune để tham khảo và đối chiếu.

------------------------------------------------------------------------

## 7. Đánh giá cuối khóa

  Hạng mục                                Trọng số
  ------------------------------------- ----------
  Apple Ecosystem & iOS Fundamentals            15
  ABM, ASM, MDM, ADE                            25
  Jamf Pro                                      25
  Troubleshooting                               20
  Technical Documentation & Interview           15
  **Tổng**                                 **100**

Thang tự đánh giá:

-   **Dưới 60:** Cần củng cố kiến thức nền tảng.
-   **60--74:** Nắm được kiến thức cơ bản.
-   **75--84:** Có nền tảng để thử sức vị trí Junior Technical Support.
-   **85--100:** Có nền tảng lý thuyết và tư duy tốt để tham gia phỏng
    vấn.

Điểm số này là thang đánh giá nội bộ của khóa học, không phải tiêu chuẩn
tuyển dụng hoặc chứng nhận chính thức.

------------------------------------------------------------------------

## 8. Nhật ký tiến độ

Đánh dấu sau khi hoàn thành từng ngày:

### Tuần 1

-   [ ] Ngày 1 -- Apple Ecosystem Overview
-   [ ] Ngày 2 -- iOS Architecture, Darwin, XNU
-   [ ] Ngày 3 -- Apple Account và iCloud
-   [ ] Ngày 4 -- App Store, App Signing, Sandbox
-   [ ] Ngày 5 -- iOS Security
-   [ ] Ngày 6 -- Networking trên thiết bị Apple
-   [ ] Ngày 7 -- Kiểm tra tuần 1

### Tuần 2

-   [ ] Ngày 8 -- Apple Business Manager
-   [ ] Ngày 9 -- Apple School Manager
-   [ ] Ngày 10 -- MDM Architecture và APNs
-   [ ] Ngày 11 -- Automated Device Enrollment
-   [ ] Ngày 12 -- Supervision và Enrollment
-   [ ] Ngày 13 -- Managed Apple Account và Apps and Books
-   [ ] Ngày 14 -- Kiểm tra tuần 2

### Tuần 3

-   [ ] Ngày 15 -- Jamf Pro Overview
-   [ ] Ngày 16 -- Device Groups và Smart Groups
-   [ ] Ngày 17 -- Configuration Profiles
-   [ ] Ngày 18 -- Policies và Restrictions
-   [ ] Ngày 19 -- App Management
-   [ ] Ngày 20 -- Security và Compliance
-   [ ] Ngày 21 -- Kiểm tra tuần 3

### Tuần 4

-   [ ] Ngày 22 -- Network Troubleshooting
-   [ ] Ngày 23 -- Apple Account và Activation Lock
-   [ ] Ngày 24 -- MDM Enrollment Troubleshooting
-   [ ] Ngày 25 -- App Deployment Troubleshooting
-   [ ] Ngày 26 -- Security và Compliance Troubleshooting
-   [ ] Ngày 27 -- Asset Management và Offboarding
-   [ ] Ngày 28 -- Technical Documentation
-   [ ] Ngày 29 -- Mock Interview
-   [ ] Ngày 30 -- Final Assessment

------------------------------------------------------------------------

## 9. Nguyên tắc học tập

1.  Hiểu bản chất trước khi học thuộc thuật ngữ.
2.  Luôn phân biệt ABM, MDM, ADE và Jamf Pro.
3.  Khi phân tích sự cố, phải nêu được bước xác minh kết quả.
4.  Không thực hiện thay đổi trên thiết bị hoặc hệ thống doanh nghiệp
    nếu chưa được cấp quyền.
5.  Ghi rõ nội dung nào đã đọc, nội dung nào đã mô phỏng và nội dung nào
    đã thực hành thực tế.
6.  Ưu tiên tài liệu chính thức và kiểm tra phiên bản tài liệu vì giao
    diện, tính năng và quy trình có thể thay đổi.

**Định hướng học tập:** Apple Fundamentals → ABM → MDM → ADE → Jamf Pro
→ Troubleshooting → Enterprise Deployment.

------------------------------------------------------------------------

*Khóa học tự học 30 ngày -- Apple Enterprise Technical Support. Tài liệu
phục vụ mục đích học tập và chuẩn bị phỏng vấn; không thay thế tài liệu
triển khai chính thức của Apple hoặc Jamf.*
