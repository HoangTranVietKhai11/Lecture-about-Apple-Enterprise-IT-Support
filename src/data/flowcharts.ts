import { FlowchartDefinition } from '@/types';

export const FLOWCHARTS: Record<string, FlowchartDefinition> = {
      apns: {
        title: `Luồng Truyền lệnh MDM qua APNs (Push Architecture)`,
        desc: `MDM Server KHÔNG bao giờ gửi trực tiếp payload tới thiết bị. Hãy bấm từng bước hoặc bật mô phỏng lỗi Firewall Port 5223 để quan sát tác động.`,
        hasFaultToggle: true,
        faultLabel: `Mô phỏng Firewall chặn TCP Port 5223`,
        nodes: [
          { tag: `BƯỚC 1`, title: `MDM Server (Jamf / Intune)`, port: `HTTPS / TCP 2197`, normal: `Quản trị viên tạo Profile hoặc gửi lệnh (Lock/Install App). MDM Server gửi một Push Notification ngắn (chỉ chứa PushMagic token, không chứa dữ liệu cấu hình) tới máy chủ APNs.`, fault: `MDM Server vẫn gửi Push Notification tới APNs bình thường và nhận mã phản hồi 200 OK từ Apple, khiến trạng thái trên console hiện "Pending".` },
          { tag: `BƯỚC 2`, title: `Apple Push Notification service`, port: `gateway.push.apple.com`, normal: `APNs định tuyến thông báo đánh thức (Wake-up signal) tới đúng thiết bị dựa trên Device Push Token.`, fault: `APNs cố gắng đẩy gói tin đánh thức xuống thiết bị nhưng gói tin bị Firewall nội bộ doanh nghiệp chặn tại cổng TCP 5223.` },
          { tag: `BƯỚC 3`, title: `Apple Device (iOS / macOS)`, port: `TCP 5223 (17.0.0.0/8)`, normal: `Thiết bị duy trì kết nối bền vững qua TCP 5223 nhận được tín hiệu đánh thức và biết mình có lệnh mới đang chờ trên MDM.`, fault: `LỖI KẾT NỐI: Thiết bị không nhận được tín hiệu đánh thức! Thiết bị không hề biết MDM đang có lệnh chờ, lệnh bị kẹt Pending vô thời hạn.` },
          { tag: `BƯỚC 4`, title: `Device Check-in & Pull Payload`, port: `HTTPS TCP 443`, normal: `Thiết bị chủ động mở kết nối TLS 443 trực tiếp tới MDM Server, tải về Configuration Profile / DDM Declaration và trả về trạng thái Acknowledged.`, fault: `Bước này KHÔNG BAO GIỜ ĐƯỢC KÍCH HOẠT cho tới khi cổng 5223 (hoặc mạng di động không bị chặn) được thông suốt.` }
        ]
      },
      ade: {
        title: `Quy trình Zero-Touch Automated Device Enrollment (ADE)`,
        desc: `Hành trình thiết bị từ lúc mua hàng đến khi sẵn sàng làm việc không cần IT chạm tay (Zero-Touch).`,
        hasFaultToggle: false,
        nodes: [
          { tag: `BƯỚC 1`, title: `Apple / Reseller Ủy quyền`, port: `Organization ID`, normal: `Đơn hàng phần cứng được gắn mã Organization ID. Số Serial tự động đồng bộ vào kho thiết bị của Apple Business.` },
          { tag: `BƯỚC 2`, title: `Apple Business Assignment`, port: `MDM Server Token`, normal: `Thiết bị được tự động (hoặc thủ công) gán về máy chủ MDM mục tiêu thông qua Server Token (.p7m).` },
          { tag: `BƯỚC 3`, title: `Setup Assistant Activation`, port: `albert.apple.com:443`, normal: `Nhân viên mở hộp, kết nối Wi-Fi. Thiết bị kiểm tra máy chủ kích hoạt Apple và nhận cấu hình PreStage / Enrollment Profile từ MDM.` },
          { tag: `BƯỚC 4`, title: `Supervision & Platform SSO`, port: `Supervised + Locked`, normal: `Thiết bị tự động kích hoạt chế độ Supervised, khóa không cho gỡ MDM profile, bỏ qua màn hình Setup thừa, tự động cài đặt Managed Apps và cấu hình Platform SSO.` }
        ]
      },
      ddm: {
        title: `Cấu trúc Declarative Device Management (DDM)`,
        desc: `Bốn thành phần Declarations và kênh Status Channel giúp thiết bị Apple tự chủ thực thi cấu hình.`,
        hasFaultToggle: false,
        nodes: [
          { tag: `DECLARATION 1`, title: `Management`, port: `Identity & Capabilities`, normal: `Khai báo thông tin tổ chức và năng lực DDM mà máy chủ MDM hỗ trợ để thiết bị đồng bộ phiên bản.` },
          { tag: `DECLARATION 2`, title: `Activations & Predicates`, port: `Rule Engine`, normal: `Định nghĩa danh sách các Configurations sẽ kích hoạt và điều kiện logic (VD: chỉ bật cấu hình khi OS >= 15 và đã cài chứng chỉ).` },
          { tag: `DECLARATION 3`, title: `Configurations & Assets`, port: `Settings + Certs`, normal: `Chứa thiết lập thực tế (Passcode, Software Update Enforcement, Wi-Fi) và tham chiếu tới Assets (tài khoản, chứng chỉ, dữ liệu).` },
          { tag: `STATUS CHANNEL`, title: `Autonomous Status Reports`, port: `Event-driven`, normal: `Bất cứ khi nào trạng thái trên thiết bị thay đổi (VD: cập nhật OS xong, đổi passcode), thiết bị tự động đẩy Status Report về MDM không cần polling.` }
        ]
      },
      vpp: {
        title: `Phân phối Ứng dụng VPP & Content Caching`,
        desc: `Cách Apple Business cấp bản quyền Managed App và máy Mac Content Caching tiết kiệm băng thông LAN.`,
        hasFaultToggle: false,
        nodes: [
          { tag: `BƯỚC 1`, title: `Apple Business Apps & Books`, port: `Location Token`, normal: `Content Manager mua bản quyền ứng dụng (trả phí hoặc miễn phí) theo Location. Token VPP đồng bộ số lượng license sang MDM.` },
          { tag: `BƯỚC 2`, title: `Device-Based Assignment`, port: `Serial / UDID`, normal: `MDM gán giấy phép trực tiếp vào thiết bị (không cần người dùng đăng nhập Apple Account cá nhân). Có thể thu hồi khi nhân viên nghỉ.` },
          { tag: `BƯỚC 3`, title: `Content Caching Lookup`, port: `Public/Private IP NAT`, normal: `Khi thiết bị chuẩn bị tải App hoặc OS Update, thiết bị hỏi dịch vụ Apple và tự động nhận ra máy Mac đang bật Content Caching trong cùng mạng NAT.` },
          { tag: `BƯỚC 4`, title: `LAN Delivery & Privacy`, port: `Local Gigabit LAN`, normal: `Gói cài đặt được tải tốc độ cao từ Mac Content Caching nội bộ. Thống kê tổng hợp xem qua AssetCacheManagerUtil nhưng bảo vệ riêng tư từng client.` }
        ]
      }
    };
