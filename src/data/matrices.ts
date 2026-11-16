import { ComparisonTable } from '@/types';

export const COMPARISON_MATRICES: Record<string, ComparisonTable> = {
      enroll: {
        title: `Ma trận So sánh 3 Phương thức Đăng ký MDM Cốt lõi`,
        headers: [`Tiêu chí`, `User Enrollment (BYOD)`, `Device Enrollment (Truyền thống)`, `Automated Device Enrollment (ADE)`],
        rows: [
          [`Đối tượng thiết bị`, `Thiết bị cá nhân của nhân viên (BYOD)`, `Thiết bị cá nhân hoặc công ty nạp tay qua link`, `Thiết bị thuộc sở hữu công ty mua qua Apple/Reseller`],
          [`Trạng thái Supervision`, `Không bao giờ (Always Unsupervised)`, `Không (trừ khi thêm qua Apple Configurator)`, `Có — Tự động kích hoạt ngay từ Setup Assistant`],
          [`Tách biệt Dữ liệu`, `Có — Phân vùng APFS tách biệt dữ liệu công việc`, `Không tách phân vùng riêng`, `Không cần tách vì toàn máy thuộc tổ chức`],
          [`Tài khoản Apple`, `Bắt buộc Managed Apple Account`, `Tùy chọn (Personal hoặc Managed)`, `Tùy chọn (Không cần cho Device-based VPP)`],
          [`Người dùng gỡ MDM`, `Có thể gỡ bất kỳ lúc nào trong Settings`, `Có thể gỡ bất kỳ lúc nào`, `Có thể khóa cứng (Non-removable MDM profile)`],
          [`Lệnh xóa máy (Wipe)`, `Chỉ xóa được dữ liệu công việc (Account Wipe)`, `Xóa toàn bộ thiết bị (Full Wipe)`, `Full Wipe + Return to Service + Bypass Activation Lock`]
        ]
      },
      jamf: {
        title: `So sánh Jamf Policy vs Configuration Profile (MDM Native)`,
        headers: [`Tiêu chí kỹ thuật`, `Configuration Profile (MDM)`, `Jamf Pro Policy (Agent)`],
        rows: [
          [`Cơ chế thực thi`, `APNs + Khung Apple MDM/DDM tích hợp sẵn trong OS`, `Tiến trình jamf binary chạy ngầm trên macOS`],
          [`Nền tảng hỗ trợ`, `Toàn bộ hệ sinh thái: macOS, iOS, iPadOS, tvOS, visionOS`, `CHỈ hỗ trợ macOS (Computers)`],
          [`Tác vụ chính`, `Khai báo & khóa cài đặt (Wi-Fi, VPN, FileVault, Restrictions, Platform SSO)`, `Cài gói .pkg/.dmg lớn, chạy Shell Script, jamf recon, Self Service`],
          [`Mức độ cưỡng chế`, `Cưỡng chế liên tục (Enforced) — Người dùng không thể tự sửa trong System Settings`, `Chạy theo Trigger (Login, Recurring Check-in, Self Service) — Không tự khóa UI Settings`],
          [`Khắc phục sự cố`, `Kiểm tra cổng APNs TCP 5223 và lệnh profiles show/status`, `Kiểm tra log /var/log/jamf.log và chạy sudo jamf policy`]
        ]
      },
      psso: {
        title: `Ma trận Tính năng theo Phương thức Xác thực Platform SSO (Theo Apple Deployment Guide)`,
        headers: [`Tính năng Platform SSO`, `Password`, `Web-based`, `Smart card`, `Secure Enclave Key`, `Access key`],
        rows: [
          [`Privilege Management (Phân quyền Admin/Standard)`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Không`],
          [`Authenticated Guest Mode`, `Không`, `Hỗ trợ (Cần Shared Keys)`, `Không`, `Không`, `Hỗ trợ (Tap to Login)`],
          [`Automated Device Enrollment (ADE)`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Không`],
          [`On-demand Account Creation`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Không`, `Không`],
          [`Require Touch ID`, `Hỗ trợ (Cần Shared Keys)`, `Hỗ trợ (Cần Shared Keys)`, `Không`, `Hỗ trợ (Cần Shared Keys)`, `Không`],
          [`Password Synchronization (FileVault)`, `Hỗ trợ`, `Không`, `Không`, `Không`, `Không`],
          [`Login Policies`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`, `Hỗ trợ`]
        ]
      }
    };

    // =========================================================================
    // 3. DATA: 60 EXAM QUESTIONS (PEARSON VUE & PRACTICE BANK)
    // =========================================================================;
