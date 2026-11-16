import { TerminalMission, TroubleshootingLab } from '@/types';

export const CLI_MISSIONS: TerminalMission[] = [
      { id: `m1`, title: `Nhiệm vụ 1: Kiểm tra ADE & Supervision`, hint: `profiles status -type enrollment`, desc: `Xác minh máy Mac đã đăng ký qua Automated Device Enrollment (DEP) và được User Approved.` },
      { id: `m2`, title: `Nhiệm vụ 2: Kiểm tra cổng APNs 5223`, hint: `nc -vz gateway.push.apple.com 5223`, desc: `Kiểm tra kết nối TCP tới APNs để đảm bảo MDM đẩy được lệnh.` },
      { id: `m3`, title: `Nhiệm vụ 3: Kiểm tra Platform SSO`, hint: `app-sso platform -s`, desc: `Xem trạng thái đăng ký thiết bị với IdP, PRT và Shared Device Keys.` },
      { id: `m4`, title: `Nhiệm vụ 4: Xác minh mã hóa FileVault`, hint: `fdesetup status`, desc: `Kiểm tra ổ đĩa đã bật FileVault và trạng thái khóa khôi phục PRK.` },
      { id: `m5`, title: `Nhiệm vụ 5: Kiểm tra Content Caching`, hint: `AssetCacheManagerUtil status`, desc: `Xem máy Mac có đang phục vụ Content Caching trên mạng LAN hay không.` }
    ];

    export const LAB_SCENARIOS: TroubleshootingLab[] = [
      {
        id: `lab1`,
        code: `TICKET #101`,
        title: `Máy Mac mới mở hộp không tự động vào MDM (ADE thất bại)`,
        severity: `Cao`,
        symptom: `Nhân viên nhận MacBook Pro mới nguyên seal, kết nối Wi-Fi tại nhà ở màn hình Setup Assistant nhưng máy đi thẳng vào bước tạo tài khoản cá nhân mà KHÔNG hiện màn hình "Remote Management".`,
        logs: `[SetupAssistant] Checking activation server albert.apple.com:443 -> OK (200)\n[CloudConfig] Querying DEP enrollment profile for Serial C02ZN123MD6R...\n[CloudConfig] Response: { "enrolled": false, "profile_uuid": null }\n[ABM-Sync] Last MDM token sync: 2 days ago. Device C02ZN123MD6R status: "Unassigned"`,
        causes: [
          `Thiết bị chưa được gán (Assign) vào máy chủ MDM trong Apple Business (hoặc chưa đồng bộ Server Token).`,
          `FileVault trên máy Mac mới bị hỏng trước khi mở hộp.`,
          `Cổng UDP 53 của DNS nội bộ bị chặn.`
        ],
        correctCause: 0,
        fixes: [
          `Vào Apple Business > Devices, kiểm tra Serial C02ZN123MD6R, gán vào đúng MDM Server, đồng bộ lại Server Token trên MDM rồi Erase/Reset lại máy Mac.`,
          `Hướng dẫn nhân viên tự tạo tài khoản Admin cá nhân rồi gửi link tải file .dmg.`,
          `Nhấn nút Release Device trong Apple Business.`
        ],
        correctFix: 0,
        explain: `Log chỉ rõ "profile_uuid: null" và trạng thái trong Apple Business là "Unassigned". Chỉ cần gán thiết bị vào MDM Server (và bật Auto-assign), đồng bộ MDM rồi Erase Mac để chạy lại Setup Assistant.`
      },
      {
        id: `lab2`,
        code: `TICKET #102`,
        title: `Lệnh Remote Lock & Profile từ MDM kẹt Pending vĩnh viễn`,
        severity: `Nghiêm trọng`,
        symptom: `Toàn bộ 200 iPad đang kết nối Wi-Fi công ty đều duyệt web bình thường, nhưng không máy nào nhận Configuration Profile Wi-Fi mới hay lệnh Remote Lock từ Jamf/Intune. Khi bật 4G/5G thì nhận ngay lập tức.`,
        logs: `[MDM-Server] Sending APNs wake-up for UDID 00008110-0012... -> APNs Accepted (200)\n[iPadOS-Network] Testing gateway.push.apple.com:5223 ... Connection timed out (Firewall DROP)\n[iPadOS-MDM] Last check-in: 48 hours ago. Pending commands: 4`,
        causes: [
          `Firewall mạng Wi-Fi doanh nghiệp đang chặn lưu lượng ra ngoài tới APNs qua TCP Port 5223 (dải 17.0.0.0/8).`,
          `iPad hết dung lượng bộ nhớ lưu trữ.`,
          `Managed Apple Account chưa bật Apple Pay.`
        ],
        correctCause: 0,
        fixes: [
          `Mở cổng TCP 5223 (và 443 dự phòng) ra dải mạng Apple 17.0.0.0/8 trên Firewall nội bộ cho subnet Wi-Fi.`,
          `Cài đặt lại iPadOS bằng cáp USB cho cả 200 thiết bị.`,
          `Tắt tính năng Content Caching trên máy Mac.`
        ],
        correctFix: 0,
        explain: `Dấu hiệu kinh điển: Bật 4G/5G nhận ngay nhưng Wi-Fi công ty bị kẹt Pending, log báo timeout tại cổng 5223. Mở TCP 5223 tới 17.0.0.0/8 là giải pháp triệt để.`
      },
      {
        id: `lab3`,
        code: `TICKET #103`,
        title: `Platform SSO không cho phép bật Require Touch ID & Guest Mode`,
        severity: `Trung bình`,
        symptom: `Sau khi đẩy profile Platform SSO tới MacBook Pro M3 chạy macOS mới nhất, người dùng vẫn phải gõ mật khẩu dài mỗi lần xác thực, tùy chọn "Require Touch ID" và "Authenticated Guest Mode" không hoạt động.`,
        logs: `[app-sso] Extension: com.microsoft.CompanyPortalMac.ssoextension\n[PlatformSSO] RegistrationStatus: UserRegisteredOnly\n[PlatformSSO] SharedDeviceKeys: false (Keychain missing device signing key)\n[Error] Feature 'Require Touch ID' requires SharedDeviceKeys = true`,
        causes: [
          `Hồ sơ Platform SSO chưa cấu hình Shared Device Keys (UseSharedDeviceKeys = true) hoặc thiết bị đăng ký trước khi chính sách thiết bị được áp dụng.`,
          `MacBook Pro M3 không có cảm biến Touch ID.`,
          `Người dùng chưa bật AirDrop.`
        ],
        correctCause: 0,
        fixes: [
          `Cập nhật Payload Platform SSO trong MDM bật Shared Device Keys (UseSharedDeviceKeys), đẩy lại cấu hình và chạy đăng ký thiết bị (Device Registration) trước khi đăng ký người dùng.`,
          `Chuyển sang xác thực bằng Active Directory Bind truyền thống.`,
          `Gỡ bỏ hoàn toàn hồ sơ MDM khỏi máy Mac.`
        ],
        correctFix: 0,
        explain: `Theo bảng yêu cầu Platform SSO của Apple, Shared Device Keys là điều kiện bắt buộc cho Require Touch ID, Authenticated Guest Mode, Web-based Auth và ADE Platform SSO.`
      },
      {
        id: `lab4`,
        code: `TICKET #104`,
        title: `Nhầm lẫn giữa Jamf Policy và Configuration Profile`,
        severity: `Trung bình`,
        symptom: `Quản trị viên dùng Jamf Policy chạy script mỗi ngày để chỉnh sửa file plist chặn người dùng thay đổi cấu hình Proxy/Wallpapers, nhưng nhân viên vẫn tự mở System Settings đổi lại được ngay sau khi script chạy.`,
        logs: `[jamf.log] Executing Policy 'Block Proxy Script' via recurring check-in...\n[SystemSettings] User modified Network Proxy manually at 10:15 AM.\n[profiles] No MDM Restrictions/Proxy Configuration Profile installed for domain com.apple.network`,
        causes: [
          `Jamf Policy chỉ chạy hành động theo thời điểm chứ KHÔNG cưỡng chế khóa giao diện hệ điều hành; muốn khóa chặt setting phải dùng MDM Configuration Profile.`,
          `jamf binary chỉ chạy được trên iPhone.`,
          `APNs port 2197 bị hỏng.`
        ],
        correctCause: 0,
        fixes: [
          `Chuyển thiết lập Proxy và Restrictions sang MDM Configuration Profile (Native) để hệ điều hành khóa cứng tùy chọn trong System Settings.`,
          `Tăng tần suất chạy Jamf Policy lên mỗi 10 giây một lần.`,
          `Tắt FileVault trên máy Mac.`
        ],
        correctFix: 0,
        explain: `Configuration Profile là cơ chế duy nhất được macOS hỗ trợ để khóa cứng (Enforce) thiết lập hệ thống, ngăn người dùng sửa đổi trong System Settings.`
      },
      {
        id: `lab5`,
        code: `TICKET #105`,
        title: `Content Caching đã bật nhưng iPad vẫn tải OS từ Internet`,
        severity: `Trung bình`,
        symptom: `Chi nhánh có một Mac mini bật Content Caching, nhưng khi 50 iPad tải bản cập nhật iPadOS, băng thông đường truyền Internet vẫn bị nghẽn 100% và bộ đếm Cache Served bằng 0.`,
        logs: `[AssetCache] Active: true, CacheFree: 450 GB\n[AssetCache] PublicAddress: 203.113.45.10\n[iPad-WiFi] Outbound NAT Public IP: 203.113.45.99 (Multi-WAN Load Balancer)\n[Lookup] No DNS TXT _aaplcache._tcp record found for local subnet.`,
        causes: [
          `Mạng chi nhánh dùng Multi-WAN Load Balancer khiến iPad và Mac mini ra Internet với 2 Public IP khác nhau nên Apple lookup không ghép cặp được.`,
          `iPadOS không hỗ trợ tải bản cập nhật qua Content Caching.`,
          `Content Caching chỉ hoạt động nếu cài trên Windows Server.`
        ],
        correctCause: 0,
        fixes: [
          `Thêm bản ghi DNS TXT (_aaplcache._tcp) trên DNS nội bộ trỏ tới IP của Mac mini Content Caching (hoặc định tuyến Mac mini và iPad đi qua cùng một Public IP).`,
          `Tắt Content Caching và nâng cấp băng thông lên 10 Gbps.`,
          `Yêu cầu người dùng tắt Wi-Fi khi cập nhật.`
        ],
        correctFix: 0,
        explain: `Khi client và Content Caching có Public IP khác nhau (do Multi-WAN / nhiều đường truyền), phải cấu hình bản ghi DNS TXT _aaplcache._tcp để client định vị được máy chủ cache cục bộ.`
      },
      {
        id: `lab6`,
        code: `TICKET #106`,
        title: `Thu hồi MacBook Pro / iPhone dính Activation Lock cá nhân`,
        severity: `Cao`,
        symptom: `Nhân viên cũ nghỉ việc và đã Reset máy trước khi trả lại. Khi IT khởi động máy, màn hình hiện "Locked to Owner" yêu cầu Apple Account cá nhân của nhân viên cũ.`,
        logs: `[Device] Supervised: true (Enrolled via Automated Device Enrollment)\n[MDM-Inventory] ActivationLockBypassCode: Stored in Jamf/Intune Database (9X4K-2M8P-...)\n[AppleBusiness] Device remains Assigned to Organization.`,
        causes: [
          `Nhân viên đã bật Find My bằng Apple Account cá nhân trước khi reset máy, kích hoạt Activation Lock.`,
          `Ổ đĩa NVMe của thiết bị bị lỗi phần cứng.`,
          `Thiết bị bị mất kết nối Content Caching.`
        ],
        correctCause: 0,
        fixes: [
          `Lấy Activation Lock Bypass Code đã được MDM lưu trữ sẵn (hoặc gửi lệnh Clear Activation Lock từ MDM / liên hệ Apple Business với hóa đơn nếu chưa có code) để mở khóa hợp lệ.`,
          `Nhấn nút Release Device khỏi Apple Business để tự mở khóa.`,
          `Thay mới toàn bộ thiết bị.`
        ],
        correctFix: 0,
        explain: `Lưu ý quan trọng: Nhấn Release Device KHÔNG mở khóa Activation Lock! Vì thiết bị là Supervised qua ADE và MDM đã lưu sẵn Activation Lock Bypass Code, IT chỉ cần nhập mã Bypass đó (hoặc dùng API Clear Activation Lock) để mở khóa.`
      }
    ];

    // =========================================================================
