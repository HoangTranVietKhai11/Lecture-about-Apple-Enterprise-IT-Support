import { Chapter } from '@/types';

export const CHAPTERS: Chapter[] = [
      {
        id: 1,
        code: `CHƯƠNG 01`,
        title: `Getting Started — Tổng quan Khóa học & Kỳ thi DEP110`,
        subtitle: `Cấu trúc lộ trình 17 giờ 20 phút, mục tiêu kỳ thi Apple Deployment and Management và chứng chỉ Apple Certified IT Professional.`,
        duration: `45 phút`,
        cards: [
          {
            title: `Lộ trình & Chứng chỉ (Certification Path)`,
            body: `Khóa học Apple Deployment and Management (DEP110) chuẩn bị kiến thức cho kỹ sư IT triển khai iPhone, iPad, Mac, Apple TV và Apple Vision Pro trong doanh nghiệp và giáo dục.`,
            bullets: [
              `<strong>Apple Certified IT Professional:</strong> Huy hiệu số (Credly) nhận được sau khi vượt qua bài thi Apple Deployment and Management Exam.`,
              `<strong>Ngưỡng đạt chuẩn thi:</strong> 60 câu hỏi trắc nghiệm trong 60 phút, yêu cầu tối thiểu <strong>75% (45/60 câu)</strong> để đạt.`,
              `<strong>Phương pháp ôn tập:</strong> Kết hợp lý thuyết nền tảng từ Apple Platform Deployment, Apple Platform Security và thực hành trực tiếp trên MDM.`
            ]
          },
          {
            title: `Bốn trụ cột triển khai Apple (Four Pillars)`,
            body: `Hệ sinh thái quản trị Apple kết nối chặt chẽ phần cứng, hệ điều hành, ứng dụng và dịch vụ đám mây để giảm tối đa thao tác thủ công cho bộ phận IT.`,
            bullets: [
              `<strong>Apple Business / Apple School Manager:</strong> Cổng quản lý sở hữu thiết bị và cấp phép nội dung.`,
              `<strong>Device Management Service (MDM):</strong> Máy chủ quản trị từ xa của bên thứ ba (Jamf Pro, Microsoft Intune, Kandji...).`,
              `<strong>Declarative Device Management (DDM):</strong> Chuẩn quản trị chủ động, bất đồng bộ thế hệ mới.`,
              `<strong>Identity Services (IdP):</strong> Liên kết tài khoản doanh nghiệp thông qua Federated Authentication & Platform SSO.`
            ]
          }
        ],
        tip: `Kỳ thi kiểm tra khả năng áp dụng tình huống thực tế (Scenario-based), không chỉ hỏi định nghĩa. Luôn chú ý sự khác biệt giữa Managed vs Unmanaged và Supervised vs Unsupervised.`,
        terms: [
          { en: `Apple Certified IT Professional`, vi: `Chứng chỉ Chuyên gia IT Apple`, def: `Huy hiệu số cấp khi vượt qua kỳ thi Apple Deployment and Management.` },
          { en: `Device Management Service (MDM)`, vi: `Dịch vụ Quản lý Thiết bị`, def: `Giải pháp máy chủ dùng khung Apple MDM/DDM để cấu hình, bảo mật và phân phối app.` },
          { en: `AppleSeed for IT`, vi: `Chương trình Beta cho IT`, def: `Chương trình cho phép đội ngũ IT thử nghiệm trước bản cập nhật OS beta trong môi trường doanh nghiệp.` }
        ],
        checkpoints: [
          {
            q: `Mục tiêu chính của kỳ thi Apple Deployment and Management (DEP110) là gì?`,
            opts: [
              `Đánh giá khả năng lập trình ứng dụng SwiftUI trên macOS`,
              `Xác nhận năng lực triển khai, cấu hình và bảo mật thiết bị Apple ở quy mô tổ chức`,
              `Cấp quyền sửa chữa phần cứng tại Apple Authorized Service Provider`,
              `Thay thế hoàn toàn nhu cầu sử dụng Apple Business`
            ],
            ans: 1,
            exp: `Kỳ thi DEP110 đánh giá kiến thức và kỹ năng thực hành triển khai, cấu hình, tích hợp mạng/định danh và bảo mật thiết bị Apple trong tổ chức.`
          },
          {
            q: `Tổng thời lượng ước tính của lộ trình học DEP110 chính thức gồm 14 chương là bao nhiêu?`,
            opts: [`6 giờ 30 phút`, `12 giờ 00 phút`, `17 giờ 20 phút`, `40 giờ 00 phút`],
            ans: 2,
            exp: `Theo giáo trình Apple Professional Training, khóa học Deployment and Management có thời lượng ước tính 17 giờ 20 phút (17 hrs 20 mins).`
          },
          {
            q: `Chương trình nào giúp IT kiểm thử các bản cập nhật iOS/macOS trước khi phát hành chính thức cho nhân viên?`,
            opts: [`AppConfig Community`, `AppleSeed for IT`, `TestFlight Public`, `Apple Configurator Provisional`],
            ans: 1,
            exp: `AppleSeed for IT cho phép bộ phận IT thử nghiệm sớm các bản beta OS và báo cáo tương thích với ứng dụng nội bộ.`
          }
        ]
      },
      {
        id: 2,
        code: `CHƯƠNG 02`,
        title: `Device Management — MDM, Payloads & Declarative Device Management`,
        subtitle: `Cơ chế hoạt động của Profiles, Payloads, APNs và bước nhảy vọt sang Declarative Device Management (DDM).`,
        duration: `90 phút`,
        cards: [
          {
            title: `Declarative Device Management (DDM)`,
            body: `DDM là chuẩn quản trị mặc định hiện đại của Apple, chuyển từ mô hình "Server ra lệnh – Thiết bị chờ" sang "Thiết bị tự chủ động áp dụng và báo cáo trạng thái".`,
            bullets: [
              `<strong>Bất đồng bộ & Tự chủ (Asynchronous & Autonomous):</strong> Thiết bị tự kiểm tra điều kiện (Activation predicates) và áp dụng cấu hình ngay lập tức ngay cả khi mất kết nối mạng tạm thời.`,
              `<strong>4 loại Declarations cốt lõi:</strong> <code>Configurations</code> (cấu hình), <code>Assets</code> (tài nguyên/chứng chỉ), <code>Activations</code> (điều kiện kích hoạt) và <code>Management</code> (thông tin tổ chức/khả năng).`,
              `<strong>Status Reports (Báo cáo trạng thái):</strong> Thiết bị chủ động gửi thay đổi trạng thái (VD: OS version, Passcode status) về MDM thay vì server phải poll liên tục.`
            ]
          },
          {
            title: `Profiles, Payloads & Device Supervision`,
            body: `Configuration Profile (.mobileconfig) là tệp XML chứa một hoặc nhiều Payloads dùng để cấu hình Wi-Fi, VPN, Passcode, Restrictions.`,
            bullets: [
              `<strong>Supervision (Giám sát thiết bị):</strong> Xác lập quyền sở hữu tổ chức, mở khóa các hạn chế nâng cao (chặn xóa app, Activation Lock Bypass, Managed Lost Mode, giới hạn ghép nối USB).`,
              `<strong>AppConfig Community:</strong> Chuẩn mở dùng khả năng gốc của OS (Managed App Configuration) để tự động cấu hình URL, cổng, SSO, App Tunnel cho app doanh nghiệp mà không cần App Wrapping hay SDK độc quyền.`
            ]
          }
        ],
        tip: `Câu hỏi hay gặp trong đề: 4 loại Declarations của DDM là gì? Nhớ cụm: Configurations, Assets, Activations, Management (Lưu ý: trong một số câu luyện tập cơ bản của Apple nhắc đến Devices, Security, Activations, Enrollments hoặc 4 nhóm Declarations chuẩn). DDM giúp giảm tải cho MDM server vì không cần polling.`,
        terms: [
          { en: `Declarative Device Management (DDM)`, vi: `Quản lý Thiết bị Khai báo`, def: `Khung quản trị hiện đại nơi thiết bị tự động áp dụng declarations và đẩy Status Reports bất đồng bộ.` },
          { en: `Device Supervision`, vi: `Giám sát Thiết bị`, def: `Chế độ dành cho thiết bị thuộc sở hữu tổ chức, cho phép kiểm soát bảo mật và hạn chế mức sâu.` },
          { en: `Configuration Payload`, vi: `Tải cấu hình`, def: `Thành phần cụ thể trong Profile (Wi-Fi, VPN, FileVault, Restrictions) được cài đặt qua MDM.` },
          { en: `Status Channel`, vi: `Kênh Báo cáo Trạng thái`, def: `Cơ chế trong DDM giúp thiết bị tự động thông báo thay đổi trạng thái về máy chủ MDM.` }
        ],
        checkpoints: [
          {
            q: `Ưu điểm kiến trúc lớn nhất của Declarative Device Management (DDM) so với MDM truyền thống là gì?`,
            opts: [
              `Không cần kết nối APNs khi đăng ký thiết bị lần đầu`,
              `Thiết bị tự chủ đánh giá điều kiện, áp dụng cấu hình bất đồng bộ và gửi Status Reports mà không cần server poll liên tục`,
              `Chỉ hoạt động trên máy Mac dùng chip Intel`,
              `Thay thế hoàn toàn FileVault bằng mật khẩu Wi-Fi`
            ],
            ans: 1,
            exp: `DDM cho phép thiết bị tự động áp dụng cấu hình cục bộ theo trạng thái và chủ động báo cáo thay đổi (Status Reports) về MDM, tăng độ phản hồi và bảo mật ngay cả khi gián đoạn mạng.`
          },
          {
            q: `Theo tài liệu Apple Professional Training (DEP110), khi được hỏi về các nhóm declarations trong DDM (Devices, Security, Activations, Enrollments vs cơ chế chung), vai trò của Activation là gì?`,
            opts: [
              `Kích hoạt các Configuration dựa trên điều kiện/predicates trên thiết bị`,
              `Mua bản quyền ứng dụng trên App Store`,
              `Mở khóa iCloud cá nhân của nhân viên`,
              `Thay thế chứng chỉ APNs hết hạn`
            ],
            ans: 0,
            exp: `Activations trong DDM định nghĩa nhóm Configurations cần áp dụng và các biểu thức điều kiện (predicates) để thiết bị tự động bật/tắt cấu hình.`
          },
          {
            q: `Lợi ích cốt lõi của tiêu chuẩn AppConfig Community đối với nhà phát triển ISV và doanh nghiệp là gì?`,
            opts: [
              `Bắt buộc phải bọc lại mã nguồn ứng dụng (App Wrapping) bằng SDK riêng của từng hãng MDM`,
              `Sử dụng API gốc của hệ điều hành để tự động cấu hình, bảo mật, App Tunnel và SSO trung lập với mọi EMM/MDM`,
              `Chỉ hỗ trợ cấu hình qua cáp USB với Apple Configurator`,
              `Vô hiệu hóa hoàn toàn chứng chỉ SSL/TLS trên ứng dụng`
            ],
            ans: 1,
            exp: `AppConfig Community tận dụng khả năng gốc của iOS/Android để cấu hình tự động (URL, port, SSO, App Tunnel) mà không cần SDK độc quyền hay App Wrapping.`
          }
        ]
      },
      {
        id: 3,
        code: `CHƯƠNG 03`,
        title: `Device Enrollment and Deployment — Mô hình Triển khai & Đăng ký`,
        subtitle: `Phân biệt User Enrollment, Account-Driven Enrollment, Device Enrollment và Automated Device Enrollment (ADE).`,
        duration: `85 phút`,
        cards: [
          {
            title: `4 Phương thức Đăng ký MDM (Enrollment Methods)`,
            body: `Lựa chọn phương thức đăng ký phụ thuộc trực tiếp vào quyền sở hữu thiết bị: cá nhân (BYOD) hay tổ chức (Organization-owned).`,
            bullets: [
              `<strong>User Enrollment (BYOD):</strong> Dành cho thiết bị cá nhân. Tạo phân vùng APFS tách biệt dữ liệu công việc và cá nhân; người dùng dùng Managed Apple Account; <strong>không thể Supervised</strong>, không thể Remote Wipe toàn máy.`,
              `<strong>Account-Driven User / Device Enrollment:</strong> Người dùng đăng nhập Managed Apple Account trực tiếp trong Settings/System Settings (thay vì tải profile qua Safari) nhờ Service Discovery (.well-known).`,
              `<strong>Device Enrollment:</strong> Người dùng tự cài profile quản trị (ví dụ tải từ cổng MDM). Không mặc định Supervised trên iOS/iPadOS; người dùng có thể gỡ bỏ profile.`,
              `<strong>Automated Device Enrollment (ADE):</strong> Triển khai Zero-Touch cho thiết bị mua qua Apple Business/Reseller. Tự động kích hoạt <strong>Supervision</strong>, có thể khóa không cho gỡ MDM profile (Non-removable MDM) và tùy biến Setup Assistant.`
            ]
          },
          {
            title: `Triển khai Thiết bị Dùng chung & Platform-Specific`,
            body: `Apple hỗ trợ tối ưu cho thiết bị chia sẻ (bệnh viện, bán lẻ, lớp học) và các nền tảng chuyên biệt.`,
            bullets: [
              `<strong>Return to Service:</strong> Lệnh MDM xóa sạch dữ liệu và tự động cấu hình lại iPhone/iPad/Vision Pro vào Wi-Fi và MDM mà không cần thao tác Setup Assistant thủ công.`,
              `<strong>Shared iPad:</strong> Hỗ trợ nhiều người dùng đăng nhập bằng Managed Apple Account (hoặc Temporary Session) với phân vùng lưu trữ cách ly.`,
              `<strong>Apple Watch / Apple TV / Vision Pro:</strong> Apple TV hỗ trợ ADE + Conference Room Display; Apple Vision Pro hỗ trợ ADE, Return to Service và Account-driven enrollment.`
            ]
          }
        ],
        tip: `Ghi nhớ: Chỉ Automated Device Enrollment (hoặc thêm thủ công qua Apple Configurator trong thời gian thử thách 30 ngày) mới mang lại trạng thái Supervised không thể gỡ bỏ trên iOS/iPadOS. User Enrollment tuyệt đối KHÔNG bao giờ có Supervision.`,
        terms: [
          { en: `Automated Device Enrollment (ADE)`, vi: `Đăng ký Thiết bị Tự động`, def: `Cơ chế Zero-Touch gắn kết thiết bị từ Apple Business với MDM ngay từ Setup Assistant, bật Supervision.` },
          { en: `User Enrollment (BYOD)`, vi: `Đăng ký Người dùng (Thiết bị cá nhân)`, def: `Cách ly dữ liệu công việc bằng Managed Apple Account; bảo vệ quyền riêng tư tối đa cho nhân viên.` },
          { en: `Return to Service`, vi: `Khôi phục sẵn sàng phục vụ`, def: `Tính năng xóa nhanh thiết bị dùng chung và tự động tái đăng ký Wi-Fi + MDM không chạm.` }
        ],
        checkpoints: [
          {
            q: `Phương thức đăng ký nào tạo phân vùng mã hóa tách biệt giữa dữ liệu công việc và dữ liệu cá nhân cho thiết bị BYOD?`,
            opts: [`Automated Device Enrollment`, `User Enrollment`, `Apple Configurator Supervision`, `Device Enrollment truyền thống`],
            ans: 1,
            exp: `User Enrollment tạo phân vùng APFS tách biệt cho dữ liệu công việc gắn với Managed Apple Account, đảm bảo IT chỉ xóa được dữ liệu công việc mà không chạm tới dữ liệu cá nhân.`
          },
          {
            q: `Tính năng nào cho phép xóa sạch iPad dùng chung sau ca làm việc và tự động đưa máy trở lại trạng thái sẵn sàng kết nối Wi-Fi & MDM mà không cần IT chạm tay vào Setup Assistant?`,
            opts: [`Activation Lock`, `Return to Service`, `FileVault Recovery`, `App Tunnel`],
            ans: 1,
            exp: `Return to Service gửi lệnh xóa thiết bị kèm profile Wi-Fi và cấu hình tái đăng ký tự động, lý tưởng cho bán lẻ, y tế và khách sạn.`
          },
          {
            q: `Điểm khác biệt quan trọng của Account-Driven Enrollment so với tải Profile từ trình duyệt truyền thống là gì?`,
            opts: [
              `Người dùng bắt đầu đăng ký ngay trong Settings/System Settings bằng Managed Apple Account thông qua Service Discovery`,
              `Yêu cầu cắm cáp USB-C vào máy Mac chạy Apple Configurator`,
              `Chỉ áp dụng cho Apple TV thế hệ cũ`,
              `Cho phép bỏ qua bước xác thực danh tính IdP`
            ],
            ans: 0,
            exp: `Account-Driven Enrollment cho phép người dùng vào Settings > VPN & Device Management (hoặc Sign in to Work or School Account) và nhập Managed Apple Account để hệ thống tự phát hiện máy chủ MDM.`
          }
        ]
      },
      {
        id: 4,
        code: `CHƯƠNG 04`,
        title: `Apple Business — Nền tảng Hợp nhất (ABM + ABE + ABC)`,
        subtitle: `Hiểu về Apple Business (hợp nhất Apple Business Manager, Essentials và Connect), vai trò phân quyền và gán thiết bị MDM.`,
        duration: `75 phút`,
        cards: [
          {
            title: `Apple Business Manager nay là Apple Business`,
            body: `Theo tài liệu cập nhật 2026 của Apple, Apple Business hợp nhất các năng lực của Apple Business Manager (ABM), Apple Business Essentials (ABE) và Apple Business Connect (ABC) vào một nền tảng duy nhất.`,
            bullets: [
              `<strong>Quản lý vòng đời thiết bị:</strong> Liên kết trực tiếp với Apple hoặc Reseller ủy quyền để thiết bị tự động xuất hiện trong kho tổ chức ngay khi mua.`,
              `<strong>Gán máy chủ MDM (MDM Server Assignment):</strong> Định tuyến thiết bị theo số sê-ri về đúng máy chủ MDM (VD: Jamf cho Mac, Intune cho iPhone) hoặc thiết lập Auto-assign mặc định.`,
              `<strong>Lưu ý Release Device:</strong> Chỉ nhấn "Release from Organization" khi thanh lý hoặc bán thiết bị; thao tác này <strong>không thể hoàn tác</strong> nếu thiết bị không được nạp lại bằng Apple Configurator.`
            ]
          },
          {
            title: `Quản lý Người dùng, Vai trò & Organizational Units`,
            body: `Phân quyền quản trị chặt chẽ giúp giảm thiểu rủi ro vận hành trong doanh nghiệp lớn.`,
            bullets: [
              `<strong>Administrator:</strong> Toàn quyền quản trị, liên kết tên miền, thiết lập Federation và tạo người dùng khác.`,
              `<strong>Device Enrollment Manager:</strong> Thêm/gán/gỡ thiết bị và quản lý chứng chỉ máy chủ MDM.`,
              `<strong>Content Manager:</strong> Mua và phân bổ giấy phép Apps & Books (Volume Purchasing).`,
              `<strong>People Manager & Staff:</strong> Quản lý tài khoản và phân quyền theo đơn vị tổ chức (Locations / Organizational Units).`
            ]
          }
        ],
        tip: `Nhớ kỹ: "Release Device" trong Apple Business sẽ cắt đứt vĩnh viễn liên kết sở hữu của tổ chức với thiết bị đó. Nếu thiết bị cần sửa chữa bảo hành, KHÔNG được Release mà chỉ Unassign khỏi MDM hoặc tạm thời xử lý qua quy trình bảo trì.`,
        terms: [
          { en: `Apple Business`, vi: `Nền tảng Apple Business hợp nhất`, def: `Cổng hợp nhất năng lực của Apple Business Manager, Apple Business Essentials và Apple Business Connect.` },
          { en: `Server Token (.p7m)`, vi: `Mã thông báo Máy chủ MDM`, def: `Chứng chỉ/token trao đổi giữa Apple Business và MDM để đồng bộ danh sách thiết bị ADE.` },
          { en: `Release Device`, vi: `Giải phóng Thiết bị`, def: `Hành động gỡ bỏ vĩnh viễn quyền sở hữu thiết bị khỏi tổ chức trong Apple Business khi thanh lý.` }
        ],
        checkpoints: [
          {
            q: `Theo cập nhật tài liệu Apple Business Manager User Guide, Apple Business hiện tại kết hợp các dịch vụ nào?`,
            opts: [
              `Chỉ quản lý iCloud cá nhân và Apple Pay`,
              `Apple Business Manager, Apple Business Essentials và Apple Business Connect`,
              `Apple Configurator và Xcode Cloud`,
              `TestFlight và App Store Connect`
            ],
            ans: 1,
            exp: `Apple Business hợp nhất khả năng trước đây của Apple Business Manager, Apple Business Essentials và Apple Business Connect vào một giải pháp toàn diện.`
          },
          {
            q: `Khi nào quản trị viên mới được phép nhấn "Release" thiết bị khỏi Apple Business?`,
            opts: [
              `Mỗi khi nhân viên đổi phòng ban`,
              `Khi thiết bị cần cập nhật lên macOS mới`,
              `Chỉ khi thiết bị được bán, thanh lý vĩnh viễn hoặc trả lại bên cho thuê không còn thuộc quyền sở hữu tổ chức`,
              `Khi người dùng quên mật khẩu đăng nhập Mac`
            ],
            ans: 2,
            exp: `Release cắt đứt vĩnh viễn quyền sở hữu của tổ chức với thiết bị trong ADE. Chỉ dùng khi thanh lý/bán/trả máy.`
          },
          {
            q: `Vai trò nào trong Apple Business chuyên trách mua và phân bổ bản quyền ứng dụng giữa các Location?`,
            opts: [`Staff`, `Content Manager`, `Site Monitor`, `Helpdesk Viewer`],
            ans: 1,
            exp: `Content Manager có quyền truy cập Apps and Books để mua và quản lý phân bổ giấy phép ứng dụng theo Location.`
          }
        ]
      },
      {
        id: 5,
        code: `CHƯƠNG 05`,
        title: `Apple Configurator — Nạp Thiết bị Thủ công & Cấu hình Tại chỗ`,
        subtitle: `Sử dụng Apple Configurator trên Mac và iPhone để thêm thiết bị mua lẻ vào Apple Business và kích hoạt Provisional Supervision 30 ngày.`,
        duration: `55 phút`,
        cards: [
          {
            title: `Thêm thiết bị mua ngoài vào Apple Business`,
            body: `Không phải mọi thiết bị đều được mua qua Apple hoặc Reseller ủy quyền. Apple Configurator là cầu nối đưa thiết bị mua lẻ vào hệ thống ADE.`,
            bullets: [
              `<strong>Apple Configurator cho iPhone:</strong> Đưa iPhone lại gần máy Mac dùng chip Apple Silicon/T2 (hoặc quét hình ảnh ghép nối trong Setup Assistant) để nạp máy Mac vào Apple Business không cần dây cáp.`,
              `<strong>Apple Configurator cho Mac:</strong> Kết nối iPhone, iPad, Apple TV qua cáp USB để Prepare, cài đặt OS và thêm vào Apple Business.`,
              `<strong>Yêu cầu bắt buộc:</strong> Thiết bị iPhone/iPad/Mac sẽ bị <strong>xóa sạch dữ liệu (Erase)</strong> khi chuẩn bị để nạp vào ADE.`
            ]
          },
          {
            title: `Cửa sổ Thử thách 30 ngày (30-Day Provisional Period)`,
            body: `Đây là quy tắc bảo mật cực kỳ quan trọng thường xuyên xuất hiện trong đề thi DEP110.`,
            bullets: [
              `Khi thiết bị được nạp thủ công bằng Apple Configurator, người dùng có <strong>30 ngày</strong> kể từ lúc đăng ký để tự thoát khỏi quản lý MDM (Leave Remote Management) trong Settings.`,
              `Sau <strong>30 ngày</strong>, quyền gỡ bỏ MDM biến mất và thiết bị trở thành Supervised cố định giống như máy mua trực tiếp từ Apple.`,
              `Nếu thiết bị được xóa và thiết lập lại trong vòng 30 ngày đó, nó vẫn nằm trong thời gian 30 ngày tính từ lần đầu nạp hoặc cần nạp lại nếu người dùng đã Leave.`
            ]
          }
        ],
        tip: `Con số vàng cần nhớ: Thiết bị nạp qua Apple Configurator có cửa sổ 30 ngày (30-day provisional enrollment) để người dùng có thể tự gỡ bỏ MDM profile nhằm ngăn chặn việc kẻ gian chiếm đoạt thiết bị cá nhân.`,
        terms: [
          { en: `30-Day Provisional Period`, vi: `Thời hạn Thử thách 30 Ngày`, def: `Khoảng thời gian người dùng có thể tự rời khỏi MDM sau khi thiết bị được thêm thủ công qua Apple Configurator.` },
          { en: `Blueprint`, vi: `Bản thiết kế cấu hình`, def: `Mẫu cấu hình chứa Profiles, Apps và hành động chuẩn bị sẵn trong Apple Configurator cho Mac.` },
          { en: `Automated Enrollment via iPhone`, vi: `Nạp ADE qua iPhone`, def: `Dùng app Apple Configurator trên iPhone để thêm máy Mac T2/Apple Silicon vào Apple Business.` }
        ],
        checkpoints: [
          {
            q: `Sau khi thêm một chiếc iPad mua lẻ vào Apple Business bằng Apple Configurator, người dùng có bao nhiêu ngày để tự chọn "Leave Remote Management"?`,
            opts: [`7 ngày`, `14 ngày`, `30 ngày`, `90 ngày`],
            ans: 2,
            exp: `Apple áp dụng thời hạn tạm thời 30 ngày (30-day provisional period) cho các thiết bị thêm thủ công bằng Apple Configurator để chống lạm dụng chiếm quyền thiết bị cá nhân.`
          },
          {
            q: `Ứng dụng nào cho phép thêm một máy Mac dùng chip Apple Silicon vào Apple Business trực tiếp tại Setup Assistant mà không cần cáp USB?`,
            opts: [
              `Apple Configurator trên iPhone`,
              `Finder trên Windows`,
              `Keychain Access`,
              `Disk Utility`
            ],
            ans: 0,
            exp: `Apple Configurator for iPhone có thể ghép nối không dây với Mac chip T2 hoặc Apple Silicon ngay tại màn hình Setup Assistant để nạp vào Apple Business.`
          }
        ]
      },
      {
        id: 6,
        code: `CHƯƠNG 06`,
        title: `Network Preparation — Chuẩn bị Mạng, APNs & Content Caching`,
        subtitle: `Thông cổng Firewall cho APNs (Port 5223 / 443), cấu hình mạng Wi-Fi doanh nghiệp và tối ưu băng thông bằng Content Caching.`,
        duration: `70 phút`,
        cards: [
          {
            title: `Cổng Mạng Bắt buộc & APNs (Apple Push Notification service)`,
            body: `MDM không đẩy lệnh trực tiếp xuống thiết bị. Mọi lệnh đánh thức thiết bị đều đi qua APNs.`,
            bullets: [
              `<strong>TCP Port 5223:</strong> Cổng chính để thiết bị Apple duy trì kết nối bền vững (persistent connection) tới APNs. Nếu mạng doanh nghiệp chặn 5223, thiết bị có thể fallback sang <strong>TCP 443</strong> (tuy nhiên cần mở <code>17.0.0.0/8</code>).`,
              `<strong>TCP Port 2197:</strong> Cổng máy chủ MDM gửi thông báo Push tới APNs (hoặc 2195/2196 theo legacy, chuẩn mới HTTP/2 là 443/2197).`,
              `<strong>Kích hoạt & ADE:</strong> Cần truy cập HTTPS 443 tới <code>albert.apple.com</code>, <code>iprofiles.apple.com</code>, <code>mdmenrollment.apple.com</code>.`
            ]
          },
          {
            title: `Content Caching (Bộ nhớ đệm Nội dung)`,
            body: `Một máy Mac bật Content Caching trong System Settings giúp lưu cục bộ iOS/macOS updates, App Store apps và dữ liệu iCloud, tiết kiệm đến 90% băng thông Internet.`,
            bullets: [
              `<strong>Tự động phát hiện (Zero-Config):</strong> Thiết bị Apple tự động tìm máy Content Caching cùng dải Public IP (sau NAT) thông qua dịch vụ tra cứu của Apple mà không cần cấu hình profile trên client.`,
              `<strong>Quyền riêng tư:</strong> Vì thiết bị tự động dùng cache, admin <strong>không xem được</strong> từng thiết bị nào tải file nào, chỉ xem được thống kê tổng hợp (<code>AssetCacheManagerUtil status</code>).`,
              `<strong>Mạng phức tạp / Nhiều dải IP:</strong> Dùng bản ghi <strong>DNS TXT (<code>_aaplcache._tcp</code>)</strong> hoặc cấu hình Tethered Caching qua USB.`
            ]
          }
        ],
        tip: `Câu hỏi kinh điển: "Thiết bị đang kết nối Wi-Fi nhưng không nhận lệnh xóa máy hay cài profile từ MDM, dù server báo lệnh Pending". Nguyên nhân hàng đầu là Firewall đang chặn TCP Port 5223 tới dải mạng 17.0.0.0/8 của APNs!`,
        terms: [
          { en: `APNs (Port 5223)`, vi: `Dịch vụ Thông báo Đẩy Apple`, def: `Kênh đánh thức thiết bị qua TCP 5223 để thiết bị tự liên lạc lại với máy chủ MDM qua HTTPS 443.` },
          { en: `Content Caching`, vi: `Lưu trữ Đệm Nội dung`, def: `Dịch vụ tích hợp trên macOS giúp lưu bản cập nhật OS và ứng dụng cục bộ cho mạng LAN/NAT.` },
          { en: `DNS TXT (_aaplcache._tcp)`, vi: `Bản ghi DNS TXT cho Cache`, def: `Cấu hình DNS giúp client tìm đúng Content Caching server khi mạng có nhiều Public IP.` }
        ],
        checkpoints: [
          {
            q: `Cổng TCP nào thiết bị Apple sử dụng chủ yếu để duy trì kết nối nhận thông báo đẩy từ APNs?`,
            opts: [`TCP 22`, `TCP 3389`, `TCP 5223`, `UDP 53`],
            ans: 2,
            exp: `Thiết bị Apple sử dụng TCP port 5223 để kết nối tới máy chủ APNs (và có thể fallback qua TCP 443 trên một số cấu hình Wi-Fi proxy).`
          },
          {
            q: `Vì lý do bảo mật và quyền riêng tư, Content Caching trên macOS KHÔNG cung cấp thông tin nào sau đây cho quản trị viên?`,
            opts: [
              `Tổng dung lượng dữ liệu đã phục vụ từ cache (Bytes served)`,
              `Chi tiết từng tài nguyên cụ thể do một thiết bị cá nhân cụ thể yêu cầu`,
              `Trạng thái hoạt động của dịch vụ qua AssetCacheManagerUtil`,
              `Tỷ lệ tiết kiệm băng thông tổng hợp`
            ],
            ans: 1,
            exp: `Theo tài liệu Apple Platform Deployment, vì mọi thiết bị trên mạng tự động dùng Content Caching âm thầm, thông tin chi tiết về tài nguyên cụ thể do từng client riêng lẻ yêu cầu bị ẩn để bảo vệ quyền riêng tư.`
          },
          {
            q: `Trong mạng doanh nghiệp có nhiều địa chỉ Public IP đi ra Internet khác nhau, cách nào giúp thiết bị iOS/Mac định vị chính xác máy chủ Content Caching nội bộ?`,
            opts: [
              `Cấu hình bản ghi DNS TXT (_aaplcache._tcp)`,
              `Tắt hoàn toàn NAT trên router`,
              `Cài đặt thêm FileVault trên máy chủ`,
              `Bật chế độ AirDrop Only`
            ],
            ans: 0,
            exp: `Bản ghi DNS TXT cho phép quản trị viên chỉ định dải IP của Content Caching Server khi mạng sử dụng nhiều Public IP.`
          }
        ]
      },
      {
        id: 7,
        code: `CHƯƠNG 07`,
        title: `Identity Services — Extensible SSO & Platform SSO cho Mac`,
        subtitle: `Cơ chế Single Sign-On, Kerberos SSO extension và kiến trúc Platform SSO trên macOS với Shared Device Keys.`,
        duration: `65 phút`,
        cards: [
          {
            title: `Platform SSO (macOS) & Shared Device Keys`,
            body: `Platform SSO liên kết trực tiếp màn hình đăng nhập macOS và tài khoản cục bộ với Identity Provider (IdP) như Microsoft Entra ID, Okta hoặc Ping Identity.`,
            bullets: [
              `<strong>Shared Device Keys (Khóa Thiết bị Dùng chung):</strong> Duy trì kết nối tin cậy với IdP độc lập theo thiết bị. <strong>Bắt buộc phải bật</strong> cho: Platform SSO trong ADE, Yêu cầu Touch ID, Web-based Auth, Authenticated Guest Mode, On-demand Account Creation và Network Authorization.`,
              `<strong>5 Phương thức xác thực:</strong> Password (đồng bộ mật khẩu FileVault & cấp PRT), Web-based, Smart card (passwordless), Secure Enclave–backed key và Access key.`,
              `<strong>Tap to Login (Express Mode):</strong> Người dùng chạm iPhone hoặc Apple Watch (lưu Access key trong Secure Element / Apple Wallet) vào đầu đọc NFC để đăng nhập nhanh Authenticated Guest Mode.`
            ]
          },
          {
            title: `Đồng bộ Mật khẩu & On-Demand Account Creation`,
            body: `Giải quyết bài toán lệch mật khẩu giữa IdP đám mây và mật khẩu mở khóa ổ đĩa FileVault trên Mac.`,
            bullets: [
              `<strong>Password Sync:</strong> Khi dùng phương thức Password (như Microsoft Entra ID trên Intune/Jamf), mật khẩu Entra ID đồng bộ với mật khẩu local để mở khóa FileVault khi khởi động lại, sau đó có thể dùng Touch ID.`,
              `<strong>On-demand Account Creation:</strong> Cho phép nhân viên làm việc theo ca đăng nhập lần đầu vào Mac dùng chung bằng tài khoản IdP để tự động tạo local account với quyền Standard, Administrator hoặc theo Group.`
            ]
          }
        ],
        tip: `Rất hay ra thi: Tính năng nào của Platform SSO yêu cầu "Shared Device Keys"? Hãy nhớ hầu hết các tính năng nâng cao (ADE Platform SSO, Require Touch ID, Authenticated Guest Mode, On-demand Account Creation, Web-based Auth) đều ĐÒI HỎI Shared Device Keys!`,
        terms: [
          { en: `Platform SSO`, vi: `Đăng nhập Một lần Cấp Nền tảng`, def: `Khung macOS tích hợp IdP vào màn hình đăng nhập hệ điều hành và cấp Primary Refresh Token (PRT).` },
          { en: `Shared Device Keys`, vi: `Khóa Thiết bị Dùng chung`, def: `Khóa mật mã gắn với thiết bị, bắt buộc cho ADE Platform SSO, Require Touch ID và Authenticated Guest Mode.` },
          { en: `Tap to Login`, vi: `Chạm để Đăng nhập (NFC)`, def: `Xác thực bằng Access key lưu trong Secure Element của iPhone/Apple Watch cho máy Mac chế độ Guest.` },
          { en: `Kerberos SSO Extension`, vi: `Tiện ích Mở rộng Kerberos SSO`, def: `Tiện ích tích hợp sẵn của Apple giúp gia hạn ticket Active Directory không cần bind Mac vào AD truyền thống.` }
        ],
        checkpoints: [
          {
            q: `Trong cấu hình Platform SSO trên macOS, thành phần nào BẮT BUỘC phải được sử dụng để hỗ trợ Platform SSO trong Automated Device Enrollment, Require Touch ID và Authenticated Guest Mode?`,
            opts: [
              `Shared Device Keys`,
              `Legacy Active Directory Domain Bind`,
              `Global HTTP Proxy`,
              `Conference Room Display`
            ],
            ans: 0,
            exp: `Theo tài liệu Apple Platform Deployment, Shared Device Keys bắt buộc cho Platform SSO trong ADE, Requiring Touch ID, Web-based auth, Authenticated Guest Mode, On-demand account creation và Network authorization.`
          },
          {
            q: `Khi triển khai Platform SSO với phương thức Password trên Microsoft Intune, vì sao mật khẩu máy cục bộ không bị xóa bỏ hoàn toàn khỏi macOS?`,
            opts: [
              `Vì Apple không hỗ trợ xóa tài khoản`,
              `Vì mã hóa đĩa FileVault sử dụng mật khẩu cục bộ làm khóa mở máy khi reboot trước khi dùng Touch ID`,
              `Vì APNs cần mật khẩu để đẩy thông báo`,
              `Vì trình duyệt Safari yêu cầu mật khẩu riêng`
            ],
            ans: 1,
            exp: `Theo Microsoft Learn, mật khẩu Entra ID và mật khẩu cục bộ được giữ đồng bộ vì FileVault disk encryption cần mật khẩu cục bộ để mở khóa ổ đĩa khi khởi động lại máy.`
          },
          {
            q: `Phương thức Tap to Login trong Authenticated Guest Mode lưu trữ khóa truy cập (Access keys) của người dùng ở đâu để chống trích xuất?`,
            opts: [
              `Trong file văn bản trên iCloud Drive`,
              `Trong Secure Element của iPhone hoặc Apple Watch thông qua Apple Wallet pass`,
              `Trong bộ nhớ RAM tạm thời của router Wi-Fi`,
              `Trên máy chủ LDAP nội bộ`
            ],
            ans: 1,
            exp: `Access keys trong Apple Wallet pass được lưu trong phần cứng Secure Element trên iPhone/Apple Watch và hỗ trợ Express Mode không cần mở khóa màn hình.`
          }
        ]
      },
      {
        id: 8,
        code: `CHƯƠNG 08`,
        title: `Federation & Managed Apple Accounts — Liên kết Tên miền & Tài khoản`,
        subtitle: `Xác minh tên miền, Federated Authentication với Entra ID / Google Workspace / Custom IdP và quy tắc Managed Apple Accounts.`,
        duration: `70 phút`,
        cards: [
          {
            title: `Quản lý Tên miền & Federated Authentication`,
            body: `Liên kết Apple Business với nhà cung cấp danh tính (IdP) để người dùng dùng chung email và mật khẩu công ty làm Managed Apple Account.`,
            bullets: [
              `<strong>Xác minh tên miền (Domain Verification):</strong> Thêm bản ghi DNS TXT vào tên miền doanh nghiệp trước khi bật Federation.`,
              `<strong>Xử lý Xung đột Tài khoản (Account Conflict / Domain Capture):</strong> Khi nhân viên đã dùng email công ty (VD: <code>ten@congty.com</code>) tạo Apple Account cá nhân trước đó, hệ thống gửi thông báo yêu cầu người dùng chuyển sang email cá nhân khác trong vòng 60 ngày (hoặc chuyển giao tài khoản).`,
              `<strong>SCIM & Directory Sync:</strong> Tự động cấp phát và thu hồi Managed Apple Account khi nhân viên gia nhập hoặc nghỉ việc.`
            ]
          },
          {
            title: `Managed Apple Accounts — Khác biệt & Giới hạn`,
            body: `Managed Apple Accounts được thiết kế riêng cho tổ chức để kiểm soát dữ liệu và bảo mật.`,
            bullets: [
              `<strong>Quyền sở hữu:</strong> Tổ chức sở hữu tài khoản, có thể đặt lại mật khẩu, kiểm tra và khóa tài khoản.`,
              `<strong>Dịch vụ bị tắt mặc định vì bảo mật/tuân thủ:</strong> Không hỗ trợ mua app cá nhân (App Store purchasing tắt), Apple Pay, Family Sharing, Find My Friends.`,
              `<strong>Hỗ trợ iCloud Drive & Continuity:</strong> Có dung lượng iCloud doanh nghiệp riêng (chỉ đồng bộ giữa các thiết bị được quản lý hoặc theo chính sách Managed iCloud).`
            ]
          }
        ],
        tip: `Nhớ quy tắc Domain Capture: Nếu nhân viên đã lỡ đăng ký Apple Account cá nhân bằng email công ty, bật Federated Authentication sẽ buộc tài khoản cá nhân đó phải đổi sang địa chỉ email khác để trả lại tên miền cho tổ chức.`,
        terms: [
          { en: `Federated Authentication`, vi: `Xác thực Liên kết`, def: `Kết nối Apple Business với Entra ID, Google Workspace hoặc IdP hỗ trợ OIDC/SCIM.` },
          { en: `Managed Apple Account`, vi: `Tài khoản Apple được Quản lý`, def: `Tài khoản do tổ chức cấp và sở hữu, dùng cho User Enrollment, Shared iPad và iCloud công việc.` },
          { en: `Domain Capture`, vi: `Thu hồi Xung đột Tên miền`, def: `Quy trình giải phóng email công ty đang bị gắn với Apple Account cá nhân của nhân viên.` }
        ],
        checkpoints: [
          {
            q: `Điều kiện tiên quyết trước khi bật Federated Authentication cho một tên miền trong Apple Business là gì?`,
            opts: [
              `Phải tắt FileVault trên toàn bộ máy Mac`,
              `Phải xác minh quyền sở hữu tên miền bằng bản ghi DNS TXT và giải quyết xung đột tài khoản`,
              `Phải mua ít nhất 100 giấy phép ứng dụng trả phí`,
              `Phải xóa toàn bộ thiết bị khỏi Apple Business`
            ],
            ans: 1,
            exp: `Admin phải xác minh tên miền (thêm DNS TXT record) trong Apple Business và xử lý các Apple Account cá nhân trùng tên miền trước khi kích hoạt Federation.`
          },
          {
            q: `Tính năng nào sau đây KHÔNG khả dụng trên Managed Apple Account?`,
            opts: [
              `Đăng nhập User Enrollment trên iPhone`,
              `Lưu trữ tài liệu trong iCloud Drive doanh nghiệp`,
              `Mua sắm ứng dụng cá nhân trên App Store hoặc sử dụng Apple Pay`,
              `Sử dụng Shared iPad trong lớp học hoặc doanh nghiệp`
            ],
            ans: 2,
            exp: `Managed Apple Account vô hiệu hóa chức năng mua hàng cá nhân trên App Store, Apple Pay và Family Sharing để tách bạch tài chính cá nhân và tổ chức.`
          }
        ]
      },
      {
        id: 9,
        code: `CHƯƠNG 09`,
        title: `Device Configuration — Setup Assistant, Payloads, Restrictions & Commands`,
        subtitle: `Tùy biến Setup Assistant, quy tắc kết hợp nhiều Payloads, Restrictions và phân biệt Commands vs Queries vs Declarations.`,
        duration: `80 phút`,
        cards: [
          {
            title: `Setup Assistant & Managed Migration Assistant`,
            body: `Kiểm soát trải nghiệm mở hộp (Out-of-Box Experience) để nhân viên vào làm việc trong vài phút.`,
            bullets: [
              `<strong>Skip Setup Assistant Panes:</strong> Ẩn các màn hình không cần thiết (Apple Account cá nhân, Siri, Analytics, Screen Time, True Tone) trong quá trình ADE.`,
              `<strong>Account Creation Payload (macOS):</strong> Tự động tạo tài khoản Admin ẩn phục vụ IT và cấu hình loại tài khoản cho người dùng đầu tiên (Standard vs Admin).`,
              `<strong>Managed Migration Assistant (macOS):</strong> Kiểm soát các dữ liệu được phép di chuyển từ máy Mac cũ sang máy mới.`
            ]
          },
          {
            title: `Cơ chế Hoạt động của Payloads, Restrictions & Commands`,
            body: `Hiểu đúng nguyên tắc cộng dồn và xử lý xung đột giữa nhiều Profile trên cùng một thiết bị.`,
            bullets: [
              `<strong>Hợp nhất Restrictions (Most Restrictive Wins):</strong> Nếu Profile A cho phép dùng Camera nhưng Profile B cấm Camera, thiết bị sẽ <strong>cấm Camera</strong> (chính sách chặt chẽ hơn luôn thắng).`,
              `<strong>Commands vs Queries:</strong> <code>Commands</code> là hành động thực thi một lần (Lock, Erase, Restart, Enable Lost Mode); <code>Queries</code> là lệnh thu thập thông tin kiểm kê (InstalledApplicationList, CertificateList, SecurityInfo).`,
              `<strong>PPPC (Privacy Preferences Policy Control):</strong> Cho phép IT cấp quyền trước (Allow) cho app bảo mật/EDR truy cập Full Disk Access mà không hỏi người dùng.`
            ]
          }
        ],
        tip: `Nguyên tắc vàng khi có 2 Configuration Profile xung đột về Restriction: "Most Restrictive Wins" (Mức hạn chế chặt chẽ nhất sẽ được áp dụng). Còn với cài đặt trùng lặp không phải boolean (như Wi-Fi), kết quả là không xác định — nên tránh gán trùng payload!`,
        terms: [
          { en: `Most Restrictive Wins`, vi: `Mức Hạn chế Cao nhất Thắng`, def: `Khi nhiều Restrictions profile áp dụng cùng lúc, thiết lập nghiêm ngặt hơn sẽ có hiệu lực.` },
          { en: `PPPC Payload`, vi: `Kiểm soát Quyền Riêng tư (macOS)`, def: `Cấp quyền sẵn cho ứng dụng quản trị/bảo mật truy cập đĩa, camera hoặc tự động hóa không cần nhắc user.` },
          { en: `MDM Commands & Queries`, vi: `Lệnh & Truy vấn MDM`, def: `Tác vụ tức thời từ MDM gửi xuống thiết bị như Remote Wipe, Restart, hoặc lấy danh sách app.` }
        ],
        checkpoints: [
          {
            q: `Một iPad nhận đồng thời Profile 1 (Allow Camera = True) và Profile 2 (Allow Camera = False). Kết quả trên thiết bị là gì?`,
            opts: [
              `Camera hoạt động bình thường vì Profile 1 bật trước`,
              `Camera bị vô hiệu hóa vì quy tắc "Most Restrictive Wins"`,
              `Thiết bị báo lỗi Kernel Panic`,
              `Người dùng tự chọn bật hoặc tắt trong Settings`
            ],
            ans: 1,
            exp: `Với các Restrictions dạng bật/tắt trên Apple OS, khi nhiều profile cùng thiết lập một khóa, mức hạn chế chặt chẽ hơn (False / Restrict) luôn được ưu tiên áp dụng.`
          },
          {
            q: `Để phần mềm diệt virus / EDR trên macOS có quyền Full Disk Access mà không làm phiền nhân viên bấm Allow, IT cần triển khai loại payload nào?`,
            opts: [
              `Privacy Preferences Policy Control (PPPC)`,
              `Conference Room Display`,
              `Home Screen Layout`,
              `Subscribed Calendars`
            ],
            ans: 0,
            exp: `PPPC payload cho phép admin phê duyệt trước quyền TCC (Transparency, Consent, and Control) như Full Disk Access cho các ứng dụng đã ký.`
          }
        ]
      },
      {
        id: 10,
        code: `CHƯƠNG 10`,
        title: `Software Updates — Quản lý & Cưỡng chế Cập nhật OS bằng DDM`,
        subtitle: `Quy trình cập nhật iOS/iPadOS/macOS, Deferral, Rapid Security Responses và ép buộc cập nhật qua DDM Software Update.`,
        duration: `65 phút`,
        cards: [
          {
            title: `Quản lý Cập nhật Phần mềm Hiện đại (DDM Software Update)`,
            body: `Declarative Device Management thay thế các lệnh ScheduleOSUpdate cũ bằng cơ chế thiết bị tự động tải, nhắc nhở và cài đặt đúng thời hạn.`,
            bullets: [
              `<strong>Target Version & Local DateTime:</strong> IT chỉ định phiên bản OS đích và thời điểm cưỡng chế (Enforcement Deadline) theo giờ địa phương của thiết bị.`,
              `<strong>Deferral (Trì hoãn hiển thị):</strong> Ẩn bản cập nhật mới từ 1 đến 90 ngày để IT có thời gian kiểm thử app nội bộ với AppleSeed for IT trước khi người dùng tự nâng cấp.`,
              `<strong>Background Security Improvements / Rapid Security Responses (RSR):</strong> Vá lỗ hổng bảo mật nhanh giữa các bản minor OS mà không cần nâng cấp toàn bộ hệ điều hành.`
            ]
          },
          {
            title: `Yêu cầu Kỹ thuật khi Cập nhật OS từ xa`,
            body: `Để lệnh cập nhật thành công hàng loạt, thiết bị cần thỏa mãn điều kiện về nguồn điện, dung lượng và xác thực.`,
            bullets: [
              `<strong>Supervision & Battery:</strong> Thiết bị iOS/iPadOS cần đủ pin (hoặc cắm sạc), đủ dung lượng trống và kết nối mạng tới máy chủ cập nhật Apple (hoặc Content Caching).`,
              `<strong>Bootstrap Token (macOS):</strong> Trên Mac Apple Silicon, MDM dùng Bootstrap Token để tự động ủy quyền cài đặt cập nhật macOS không cần người dùng nhập mật khẩu Admin (Unattended OS Update).`
            ]
          }
        ],
        tip: `Nhớ kỹ: Để MDM có thể ra lệnh cập nhật macOS tự động (unattended) trên máy Mac dùng chip Apple Silicon mà không hỏi mật khẩu người dùng, máy Mac đó cần có Bootstrap Token được lưu trữ (escrowed) trên máy chủ MDM.`,
        terms: [
          { en: `DDM Software Update Enforcement`, vi: `Cưỡng chế Cập nhật qua DDM`, def: `Cấu hình chỉ định phiên bản đích và hạn chót (deadline) để thiết bị tự động thông báo và cài đặt.` },
          { en: `Update Deferral`, vi: `Trì hoãn Bản cập nhật`, def: `Chính sách ẩn thông báo nâng cấp OS mới tối đa 90 ngày để phục vụ kiểm thử tương thích.` },
          { en: `Bootstrap Token`, vi: `Mã thông báo Khởi tạo (macOS)`, def: `Token giúp MDM cấp Secure Token cho tài khoản mới và thực hiện cập nhật macOS không cần tương tác.` }
        ],
        checkpoints: [
          {
            q: `Chính sách trì hoãn (Deferral) bản cập nhật phần mềm trên thiết bị Apple được giám sát có thể kéo dài tối đa bao nhiêu ngày?`,
            opts: [`14 ngày`, `30 ngày`, `90 ngày`, `365 ngày`],
            ans: 2,
            exp: `Apple cho phép trì hoãn hiển thị các bản cập nhật phần mềm (major/minor) tối đa 90 ngày kể từ ngày phát hành.`
          },
          {
            q: `Lợi thế chính của việc quản lý Software Updates bằng Declarative Device Management (DDM) là gì?`,
            opts: [
              `Thiết bị tự động tải trước, nhắc người dùng theo lịch đếm ngược và tự động cài đặt đúng hạn chót địa phương`,
              `Xóa toàn bộ ứng dụng của bên thứ ba trước khi cập nhật`,
              `Bỏ qua hoàn toàn việc kiểm tra chữ ký số của Apple`,
              `Chỉ cài đặt bản cập nhật khi cắm cáp Thunderbolt`
            ],
            ans: 0,
            exp: `Với DDM, quản trị viên khai báo Target OS Version và Target Local Date Time; thiết bị tự chủ quản lý việc tải, hiển thị thông báo đếm ngược và khởi động lại cài đặt.`
          }
        ]
      },
      {
        id: 11,
        code: `CHƯƠNG 11`,
        title: `Content Buying and Distribution — Mua & Phân phối Ứng dụng (VPP)`,
        subtitle: `Volume Purchasing trong Apple Business, Managed Apps, Custom Apps, Unlisted Apps, In-house Apps và macOS Packages (.pkg).`,
        duration: `70 phút`,
        cards: [
          {
            title: `Các Phương thức Phân phối Ứng dụng (App Distribution)`,
            body: `Apple cung cấp nhiều kênh phân phối phù hợp với từng loại ứng dụng thương mại hoặc nội bộ.`,
            bullets: [
              `<strong>Managed Apps (App Store + VPP):</strong> Mua giấy phép (kể cả app miễn phí) trong Apple Business, gán theo <strong>Device-based</strong> (khuyên dùng, không cần Apple Account trên máy) hoặc User-based. Có thể thu hồi (Revoke) và tái sử dụng giấy phép.`,
              `<strong>Custom Apps:</strong> Ứng dụng riêng phát triển cho tổ chức (hoặc bởi đối tác), phát hành riêng tư qua App Store Connect tới đúng Organization ID của Apple Business.`,
              `<strong>Unlisted Apps:</strong> Ứng dụng không hiển thị khi tìm kiếm trên App Store, chỉ tải qua link trực tiếp hoặc MDM.`,
              `<strong>Proprietary In-house Apps & macOS .pkg:</strong> App ký bằng Apple Developer Enterprise Program hoặc gói <code>.pkg</code> đã ký (signed) cài đặt cho Mac qua MDM.`
            ]
          },
          {
            title: `Quản lý Dữ liệu Ứng dụng (Managed App Security)`,
            body: `Bảo vệ dữ liệu doanh nghiệp không bị rò rỉ sang ứng dụng cá nhân.`,
            bullets: [
              `<strong>Managed Open-In (Data Loss Prevention):</strong> Ngăn người dùng sao chép/mở tài liệu từ ứng dụng được quản lý (Managed App) sang ứng dụng cá nhân (Unmanaged App).`,
              `<strong>Remove App on Unenroll:</strong> Tự động gỡ bỏ ứng dụng công việc và toàn bộ dữ liệu app đó khi thiết bị rời khỏi MDM.`
            ]
          }
        ],
        tip: `Gán bản quyền ứng dụng theo thiết bị (Device-based VPP Assignment) là thực hành tốt nhất (Best Practice) vì không yêu cầu người dùng đăng nhập Apple Account vẫn cài đặt và cập nhật được ứng dụng tự động.`,
        terms: [
          { en: `Device-based Assignment`, vi: `Gán Bản quyền theo Thiết bị`, def: `Cài đặt Managed App trực tiếp theo Serial/UDID mà không cần Apple Account trên thiết bị.` },
          { en: `Custom Apps`, vi: `Ứng dụng Tùy chỉnh Riêng tư`, def: `App nội bộ hoặc đặt hàng riêng được Apple kiểm duyệt và phân phối độc quyền qua Apple Business.` },
          { en: `Managed Open-In`, vi: `Kiểm soát Chia sẻ Giữa Ứng dụng`, def: `Chính sách ngăn chuyển tài liệu từ app công ty sang app cá nhân (DLP).` }
        ],
        checkpoints: [
          {
            q: `Ưu điểm lớn nhất của Device-based App Assignment so với User-based Assignment là gì?`,
            opts: [
              `Ứng dụng có thể cài đặt tự động lên thiết bị mà không cần người dùng đăng nhập Apple Account`,
              `Giấy phép mua xong sẽ thuộc về tài khoản cá nhân của nhân viên mãi mãi`,
              `Không cần kết nối với Apple Business`,
              `Chỉ dùng được cho các file .pkg trên macOS`
            ],
            ans: 0,
            exp: `Gán ứng dụng theo thiết bị (Device-based) cho phép đẩy app âm thầm xuống thiết bị Supervised/Managed mà không yêu cầu Apple Account.`
          },
          {
            q: `Một công ty muốn phát triển ứng dụng nội bộ riêng, được Apple kiểm duyệt bảo mật nhưng chỉ hiển thị để tổ chức đó tải về qua Apple Business (không công khai trên App Store). Họ nên dùng phương thức nào?`,
            opts: [`Public App Store`, `Custom Apps`, `AirDrop Distribution`, `TestFlight Public Link`],
            ans: 1,
            exp: `Custom Apps phân phối qua Apple Business/Apple School Manager dành riêng cho tổ chức có Organization ID được chỉ định.`
          }
        ]
      },
      {
        id: 12,
        code: `CHƯƠNG 12`,
        title: `Integration with Networks — Wi-Fi, VPN, AppLayerVPN & Relay`,
        subtitle: `Tích hợp mạng doanh nghiệp 802.1X, chứng chỉ SCEP/ACME, Per-App VPN (AppLayerVPN) và Web Content Filter.`,
        duration: `65 phút`,
        cards: [
          {
            title: `Kết nối Wi-Fi Bảo mật & Cấp phát Chứng chỉ (SCEP / ACME)`,
            body: `Triển khai Wi-Fi doanh nghiệp WPA2/WPA3 Enterprise với EAP-TLS giúp loại bỏ việc chia sẻ mật khẩu Wi-Fi tĩnh.`,
            bullets: [
              `<strong>SCEP & ACME Payloads:</strong> Tự động cấp chứng chỉ số cho từng thiết bị từ máy chủ CA nội bộ. ACME hỗ trợ chứng chỉ gắn phần cứng (Hardware-bound keys) chống sao chép.`,
              `<strong>MAC Address Randomization (Private Wi-Fi Address):</strong> Có thể tắt cho mạng Wi-Fi doanh nghiệp cụ thể qua payload Wi-Fi (Disable Association MAC Randomization) nếu hệ thống NAC cần định danh MAC thật.`
            ]
          },
          {
            title: `Per-App VPN (AppLayerVPN), Relay & Content Filtering`,
            body: `Chỉ định chính xác lưu lượng của ứng dụng nào đi qua đường hầm VPN doanh nghiệp.`,
            bullets: [
              `<strong>AppLayerVPN (Per-App VPN):</strong> Chỉ các Managed Apps được chỉ định (hoặc domain Safari) mới kết nối vào mạng nội bộ qua VPN, giữ lưu lượng cá nhân đi trực tiếp — đồng bộ chặt chẽ với chuẩn AppConfig App Tunnel.`,
              `<strong>Relay Payload & DNS Proxy / DNS Settings:</strong> Hỗ trợ mã hóa lưu lượng DNS (DoH/DoT) và định tuyến Zero Trust Network Access (ZTNA) không cần VPN truyền thống.`,
              `<strong>Web Content Filter:</strong> Chặn URL độc hại hoặc giới hạn chỉ truy cập danh sách website cho phép trên thiết bị Supervised.`
            ]
          }
        ],
        tip: `Nhớ kỹ: Per-App VPN (AppLayerVPN) kết hợp với Managed Apps giúp tách bạch lưu lượng: App công việc đi qua VPN vào mạng công ty, App cá nhân (như YouTube/nhạc) đi Internet trực tiếp để không làm nghẽn băng thông VPN tổng.`,
        terms: [
          { en: `AppLayerVPN (Per-App VPN)`, vi: `VPN Theo Từng Ứng dụng`, def: `Định tuyến lưu lượng mạng của riêng từng Managed App qua đường hầm VPN công ty.` },
          { en: `ACME Payload`, vi: `Cấp Chứng chỉ Gắn Phần cứng`, def: `Giao thức cấp phát chứng chỉ số hiện đại được bảo vệ bởi Secure Enclave chống trích xuất.` },
          { en: `Network Usage Rules`, vi: `Quy tắc Sử dụng Mạng`, def: `Giới hạn ứng dụng doanh nghiệp chỉ được dùng Wi-Fi hoặc cho phép/chặn chuyển vùng dữ liệu di động.` }
        ],
        checkpoints: [
          {
            q: `Giải pháp nào đảm bảo CHỈ ứng dụng CRM nội bộ của công ty kết nối qua VPN vào trung tâm dữ liệu, còn các ứng dụng khác trên iPhone đi Internet bình thường?`,
            opts: [
              `Global HTTP Proxy`,
              `Per-App VPN (AppLayerVPN payload)`,
              `Content Caching`,
              `Tắt hoàn toàn Wi-Fi`
            ],
            ans: 1,
            exp: `AppLayerVPN (Per-App VPN) liên kết cấu hình VPN với các Managed App cụ thể để chỉ lưu lượng của app đó đi qua đường hầm VPN.`
          },
          {
            q: `Giao thức cấp phát chứng chỉ nào trong payload MDM hỗ trợ tạo khóa gắn chặt với phần cứng Secure Enclave trên thiết bị Apple?`,
            opts: [`ACME`, `L2TP`, `WINS`, `FTP`],
            ans: 0,
            exp: `ACME payload hỗ trợ tạo khóa riêng tư gắn liền với Secure Enclave (Hardware-bound keys) cùng cơ chế chứng thực thiết bị.`
          }
        ]
      },
      {
        id: 13,
        code: `CHƯƠNG 13`,
        title: `Device Security — FileVault, Attestation, Activation Lock & Lost Mode`,
        subtitle: `Bảo mật phần cứng, Managed Device Attestation, mã hóa FileVault, Activation Lock Bypass, Smart Card và macOS System Security.`,
        duration: `95 phút`,
        cards: [
          {
            title: `Bảo mật Phần cứng & Managed Device Attestation`,
            body: `Xác minh tính toàn vẹn của phần cứng thiết bị trước khi cấp quyền truy cập mạng và dữ liệu nhạy cảm.`,
            bullets: [
              `<strong>Managed Device Attestation:</strong> Secure Enclave ký bằng chứng mật mã chứng minh thiết bị là phần cứng Apple thật, đúng Serial/UDID, chạy đúng phiên bản OS và chưa bị Jailbreak.`,
              `<strong>FileVault (macOS):</strong> Mã hóa toàn bộ ổ đĩa XTS-AES-128/256. MDM bật FileVault bắt buộc và lưu trữ an toàn <strong>Personal Recovery Key (PRK)</strong> về server để IT mở khóa khi cần.`,
              `<strong>System Extensions & Kernel Extensions:</strong> Cho phép từ xa các System Extension (Endpoint Security, Network Extension) của phần mềm bảo mật mà không cần user duyệt thủ công.`
            ]
          },
          {
            title: `Activation Lock, Managed Lost Mode & Remote Wipe`,
            body: `Kiểm soát thiết bị bị mất hoặc thu hồi thiết bị khi nhân viên nghỉ việc.`,
            bullets: [
              `<strong>Activation Lock Bypass Code:</strong> Với thiết bị Supervised trong ADE, MDM lấy được Bypass Code (hoặc đặt Organization-linked Activation Lock) để xóa khóa kích hoạt khi nhân viên cũ quên thoát Apple Account cá nhân.`,
              `<strong>Managed Lost Mode:</strong> Khóa ngay màn hình thiết bị iOS/iPadOS Supervised bị thất lạc, hiển thị lời nhắn và định vị vị trí GPS gửi về MDM.`,
              `<strong>Smart Card Integration:</strong> Hỗ trợ đăng nhập không mật khẩu bằng thẻ thông minh (PIV/CAC) kết hợp mã PIN.`
            ]
          }
        ],
        tip: `Phân biệt rõ: Activation Lock Bypass Code chỉ tồn tại nếu thiết bị đã được Supervised và MDM đã kích hoạt hoặc truy vấn mã Bypass TRƯỚC khi thiết bị bị Erase/Reset bởi nhân viên!`,
        terms: [
          { en: `Managed Device Attestation`, vi: `Chứng thực Phần cứng Quản lý`, def: `Secure Enclave xác thực mật mã danh tính phần cứng và trạng thái bảo mật thiết bị gửi tới MDM/ACME.` },
          { en: `FileVault PRK Escrow`, vi: `Lưu giữ Khóa Khôi phục FileVault`, def: `Cơ chế MDM thu giữ Personal Recovery Key được mã hóa để mở khóa Mac khi nhân viên quên mật khẩu.` },
          { en: `Activation Lock Bypass Code`, vi: `Mã Vượt Khóa Kích hoạt`, def: `Mã do MDM lưu giữ cho thiết bị Supervised nhằm mở khóa iCloud Activation Lock khi thu hồi máy.` },
          { en: `Managed Lost Mode`, vi: `Chế độ Mất Quản lý`, def: `Khóa thiết bị Supervised từ xa và lấy tọa độ vị trí hiện tại trên bản đồ qua MDM.` }
        ],
        checkpoints: [
          {
            q: `Công nghệ bảo mật nào dùng Secure Enclave để chứng minh bằng mật mã với MDM rằng thiết bị đúng số Serial, chưa bị can thiệp hệ thống và đang chạy đúng phiên bản OS?`,
            opts: [
              `Managed Device Attestation`,
              `AirDrop Security`,
              `Content Caching Lookup`,
              `Handoff Continuity`
            ],
            ans: 0,
            exp: `Managed Device Attestation sử dụng Secure Enclave để ký chứng thực phần cứng và trạng thái thiết bị gửi cho dịch vụ MDM.`
          },
          {
            q: `Một nhân viên nghỉ việc và trả lại iPhone công ty (Supervised qua ADE) nhưng vẫn bật Find My bằng Apple Account cá nhân khiến màn hình yêu cầu Activation Lock sau khi reset. IT xử lý thế nào?`,
            opts: [
              `Nhập Activation Lock Bypass Code đã được MDM lưu giữ từ trước (hoặc gửi lệnh Clear Activation Lock)`,
              `Chạy lệnh fdesetup disable trên iPhone`,
              `Xóa thiết bị khỏi Apple Business`,
              `Tắt cổng 5223 trên Firewall`
            ],
            ans: 0,
            exp: `Với thiết bị Supervised, MDM lưu trữ Activation Lock Bypass Code để mở khóa thiết bị khi thu hồi mà không cần mật khẩu Apple Account của nhân viên cũ.`
          }
        ]
      },
      {
        id: 14,
        code: `CHƯƠNG 14`,
        title: `Next Steps — Tổng hợp & Sẵn sàng Kỳ thi Thực chiến`,
        subtitle: `Tổng kết Jamf Policy vs Configuration Profile, Microsoft Intune, nguồn tài liệu Apple và chiến lược làm bài thi 60 câu.`,
        duration: `30 phút`,
        cards: [
          {
            title: `Tích hợp Hệ sinh thái MDM: Jamf Pro, Microsoft Intune & AppConfig`,
            body: `Hiểu rõ công cụ thực thi của từng hãng MDM phổ biến khi làm việc thực tế và trong câu hỏi tình huống.`,
            bullets: [
              `<strong>Configuration Profile (MDM Native):</strong> Đẩy qua APNs, áp dụng cho mọi nền tảng Apple, khóa chặt thiết lập (Enforced) không cho user sửa (Wi-Fi, Passcode, Restrictions, Platform SSO, FileVault).`,
              `<strong>Jamf Pro Policy:</strong> Chỉ dành cho macOS (dùng <code>jamf</code> binary agent). Dùng để chạy Shell Script, cài đặt gói <code>.pkg</code> lớn, chạy <code>jamf recon</code> kiểm kê hoặc đưa lên <strong>Jamf Self Service</strong>.`,
              `<strong>Microsoft Intune:</strong> Hỗ trợ Device Features Templates / Settings Catalog để cấu hình Enterprise SSO & Platform SSO cho macOS.`
            ]
          },
          {
            title: `Chiến lược Thi Đạt ≥ 75% (Pearson VUE)`,
            body: `Chuẩn bị tâm lý và kỹ thuật phân tích đề trước khi bấm nút bắt đầu thi thử 60 phút.`,
            bullets: [
              `<strong>Nhịp độ thời gian:</strong> 60 câu / 60 phút = trung bình 1 phút/câu. Câu nào phân vân hãy bấm <strong>Flag for Review</strong> và đi tiếp ngay.`,
              `<strong>Kiểm tra từ khóa loại trừ:</strong> Chú ý các từ <em>Supervised vs Unsupervised</em>, <em>BYOD vs Organization-owned</em>, <em>Shared Device Keys</em>, và <em>TCP Port 5223</em>.`,
              `<strong>Bước tiếp theo:</strong> Chuyển ngay sang Tab <strong>Bước 2: Giả lập Thi thử DEP110</strong> để làm bài thi 60 câu!`
            ]
          }
        ],
        tip: `Chúc mừng bạn đã đi hết 14 chương! Hãy kiểm tra bảng Ma trận So sánh (Jamf Policy vs Profile, User Enrollment vs ADE) và hoàn thành Terminal CLI Labs trước khi thi thử 60 câu.`,
        terms: [
          { en: `Jamf Policy`, vi: `Chính sách Jamf (macOS Agent)`, def: `Cơ chế của jamf binary chạy script, cài .pkg, kiểm kê và hiển thị trong Self Service trên macOS.` },
          { en: `Configuration Profile`, vi: `Hồ sơ Cấu hình MDM Gốc`, def: `Tệp cấu hình đẩy qua APNs áp dụng cưỡng chế hệ điều hành trên iOS, iPadOS, macOS, visionOS.` },
          { en: `Self Service`, vi: `Cổng Tự phục vụ Người dùng`, def: `Ứng dụng doanh nghiệp cho phép nhân viên tự cài phần mềm hoặc chạy script sửa lỗi đã được IT phê duyệt.` }
        ],
        checkpoints: [
          {
            q: `Tình huống nào trên macOS BẮT BUỘC phải dùng Jamf Policy (hoặc script agent) thay vì Configuration Profile MDM thuần túy?`,
            opts: [
              `Khóa không cho người dùng tắt FileVault`,
              `Chạy một shell script tùy chỉnh để dọn dẹp cache và kích hoạt phần mềm nội bộ qua Self Service`,
              `Cấu hình mạng Wi-Fi 802.1X`,
              `Áp dụng chính sách độ phức tạp Passcode`
            ],
            ans: 1,
            exp: `Configuration Profile MDM dùng để khai báo và khóa cài đặt hệ điều hành, còn Jamf Policy (sử dụng jamf binary) chuyên dùng để thực thi script, cài gói phần mềm phức tạp và cung cấp nút bấm trên Self Service.`
          },
          {
            q: `Trong Microsoft Intune, quản trị viên tạo cấu hình Platform SSO hoặc SSO app extension cho macOS bằng cách nào?`,
            opts: [
              `Devices > Manage devices > Configuration > Create > New policy (Platform: macOS, Profile type: Templates > Device features / Settings Catalog)`,
              `Xóa toàn bộ thiết bị khỏi Microsoft Entra ID`,
              `Chỉ cấu hình được qua dòng lệnh Windows PowerShell trên iPhone`,
              `Cài đặt thủ công qua Apple TV`
            ],
            ans: 0,
            exp: `Theo tài liệu Microsoft Learn, admin vào Intune admin center > Devices > Configuration > Create > New policy cho macOS để triển khai Enterprise SSO / Platform SSO.`
          }
        ]
      }
    ];

    // =========================================================================
    // 2. ARCHITECTURE FLOWCHARTS & COMPARISON MATRICES DATA
    // =========================================================================;
