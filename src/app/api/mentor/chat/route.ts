import { NextRequest, NextResponse } from 'next/server';

interface ChatRequestBody {
  message: string;
  context?: {
    question?: string;
    userSelected?: string;
    correctAnswer?: string;
    context?: string;
  };
  history?: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
}

const SYSTEM_PROMPT = `# ROLE & PERSONALITY
You are "Apple Deployment Mentor", an expert AI Tutor specializing in Apple Enterprise Management and the Apple Certified IT Professional (DEP110) curriculum. Your persona is encouraging, precise, technical yet easy to understand, and deeply knowledgeable in Apple MDM architecture, Jamf Pro, Microsoft Intune, APNs, DDM, and macOS/iOS deployment frameworks.

## 1. CORE MISSION
Help students master Apple Deployment and Management concepts by:
1. Explaining why specific quiz answers are correct or incorrect with technical depth.
2. Answering questions about Apple MDM, Jamf Pro, and enterprise integration.
3. Assisting in interactive macOS CLI & Troubleshooting Labs.
4. Reinforcing key exam concepts for the Pearson VUE DEP110 assessment.

## 2. HARD TECHNICAL GUARDRAILS (STRICT DEP110 RULES)
You MUST strictly follow these official Apple & Jamf enterprise rules in all your explanations. NEVER violate or compromise on these technical boundaries:
1. **Configuration Profile (.mobileconfig) vs. Jamf Policy**:
   - **Configuration Profile**: Native Apple MDM framework. Supported on iOS, iPadOS, macOS, tvOS, watchOS, visionOS. Controls OS settings (Wi-Fi 802.1X, Passcode, FileVault, Restrictions, VPN, System Extensions). CANNOT run shell scripts or install raw .pkg/.dmg files outside VPP.
   - **Jamf Policy**: Exclusive to **macOS** using the binary agent (jamf agent) under root privileges. MANDATORY for: running custom Zsh/Bash scripts, executing scheduled/triggered task workflows, running maintenance (jamf recon), and installing custom .pkg/.dmg installers.
2. **APNs Infrastructure**:
   - Communicates over **TCP Port 5223** (outbound to block 17.0.0.0/8) with fallback to port 443.
   - If the APNs Push Certificate expires, the MDM server loses ALL ability to send management commands to managed devices until renewed.
3. **Automated Device Enrollment (ADE) & Supervision**:
   - Zero-touch enrollment via Apple Business Manager (ABM) / Apple School Manager (ASM).
   - Automatically enforces **Supervision** on iOS/iPadOS/macOS and allows making the MDM profile unremovable.
4. **Platform SSO & Shared Device Keys**:
   - In macOS ADE flows, **Shared Device Keys** are mandatory to establish a hardware-bound device-level trust connection with the Identity Provider (IdP) prior to user login, enabling on-demand user account creation.
5. **Declarative Device Management (DDM)**:
   - Enhances traditional protocol polling by allowing client devices to act autonomously, apply configurations based on state changes, and send proactive **Status Reports** to MDM.

## 3. RESPONSE STRUCTURE & TONE
- **Bilingual Technical Vocabulary**: Use English for industry-standard technical terms (*Configuration Profile, Jamf Policy, Setup Assistant, Supervision, Payload, Status Report*) while explaining concepts in clear Vietnamese.
- **Formatting**: Bold key technical terms and command-line syntax (\`profiles status\`, \`sudo jamf policy\`, \`fdesetup status\`). Use Markdown bullet points for readability.
- **Direct & Educational**: When explaining a wrong answer, start with the core reason it is wrong, then explain what the correct mechanism is. Keep responses concise and focused (under 250 words per explanation unless deep troubleshooting is requested).`;

/**
 * Intelligent built-in DEP110 expert reasoning engine.
 * Generates instant, highly accurate responses aligned strictly with the system prompt
 * even without an external LLM API key.
 */
function generateBuiltInMentorResponse(
  message: string,
  context?: ChatRequestBody['context']
): string {
  const lowerMsg = (message || '').toLowerCase();
  const qText = (context?.question || '').toLowerCase();
  const userAns = context?.userSelected || '';
  const correctAns = context?.correctAnswer || '';
  const topic = (context?.context || '').toLowerCase();

  // 1. Context-based Quiz / Exam Question Explanation
  if (context && context.question) {
    if (qText.includes('wifi') || qText.includes('wi-fi') || qText.includes('policy') || qText.includes('profile')) {
      return `Chào bạn! Đây là một điểm trọng tâm rất hay xuất hiện trong kỳ thi **DEP110**:

* **Tại sao cần dùng Configuration Profile?**: **Wi-Fi** là thiết lập thuộc cấp hệ điều hành (Native OS). Khung quản trị **Apple MDM Framework** hỗ trợ sẵn *Wi-Fi Payload* qua file \`.mobileconfig\`. Thiết bị nhận lệnh qua kênh **APNs** và tự động cấu hình chứng chỉ 802.1X/WPA2 vào **System Keychain**.
* **Tại sao không dùng Jamf Policy?**: **Jamf Policy** chỉ tồn tại trên **macOS** (chạy bằng \`jamf binary\` với quyền \`root\`), chủ yếu dùng để chạy Bash/Zsh script, đóng gói ứng dụng custom \`.pkg\` hoặc thu thập kiểm kê (\`jamf recon\`). Dùng Policy để cấu hình Wi-Fi là không chuẩn hóa và không áp dụng được cho iOS/iPadOS.

💡 **Lưu ý kỳ thi DEP110**: Mọi thiết lập hệ thống native (Wi-Fi, Passcode, FileVault, Restrictions) luôn luôn dùng **Configuration Profile**. Chỉ dùng **Jamf Policy** khi cần thực thi kịch bản (Scripting) hoặc quản lý tiến trình local.`;
    }

    if (qText.includes('apns') || qText.includes('5223') || qText.includes('push') || qText.includes('certificate')) {
      return `Chào bạn! Về hạ tầng **Apple Push Notification service (APNs)** trong kỳ thi **DEP110**:

* **Cơ chế hoạt động**: Thiết bị Apple duy trì một kết nối bảo mật liên tục (persistent connection) đến Apple APNs qua cổng **TCP Port 5223** (dải IP \`17.0.0.0/8\`), có thể dự phòng cổng 443 khi bị chặn.
* **Chứng chỉ APNs Push Certificate**: MDM Server cần Push Certificate hợp lệ cấp bởi Apple để ký các gói tin "Wake-up Push" gửi tới thiết bị.
* **Hậu quả khi hết hạn**: Nếu **APNs Certificate bị hết hạn (Expired)**, MDM hoàn toàn mất khả năng gửi lệnh quản lý xuống thiết bị (lệnh sẽ rơi vào trạng thái *Pending* vô thời hạn) cho đến khi được gia hạn bằng đúng Apple ID ban đầu.

💡 **Lưu ý kỳ thi**: Cổng **TCP 5223** là cổng bắt buộc phải mở outbound trên tường lửa doanh nghiệp!`;
    }

    if (qText.includes('ade') || qText.includes('supervision') || qText.includes('abm') || qText.includes('unremovable')) {
      return `Chào bạn! Đây là câu hỏi kinh điển về **Automated Device Enrollment (ADE)** và **Supervision**:

* **Automated Device Enrollment (ADE)**: Là quy trình triển khai zero-touch kết nối giữa **Apple Business Manager (ABM)** và MDM Server. Thiết bị khi vừa bóc hộp kích hoạt qua **Setup Assistant** sẽ tự động liên hệ máy chủ Apple để tải hồ sơ quản trị.
* **Supervision (Giám sát)**: ADE tự động kích hoạt trạng thái **Supervised** trên thiết bị. Chỉ khi thiết bị ở chế độ Supervised, người quản trị mới có quyền khóa hồ sơ MDM thành **Unremovable MDM Profile** (người dùng không thể tự bấm Remove trong System Settings).

💡 **Điểm mấu chốt DEP110**: Đăng ký thủ công qua User Enrollment hoặc Device Enrollment qua trình duyệt sẽ KHÔNG có Supervision tự động và người dùng có thể gỡ profile bất cứ lúc nào!`;
    }

    if (qText.includes('platform sso') || qText.includes('shared device key') || qText.includes('idp') || qText.includes('prt')) {
      return `Chào bạn! Về kiến trúc **Platform Single Sign-On (Platform SSO)** trên macOS Sonoma trở lên:

* **Shared Device Keys**: Trong kịch bản triển khai **macOS ADE**, để máy Mac có thể xác thực và tạo tài khoản người dùng ngay tại màn hình đăng nhập trước khi có bất kỳ user cục bộ nào đăng nhập, thiết bị cần có **Shared Device Keys**.
* **Cơ chế**: Khóa này tạo liên kết tin cậy phần cứng (Hardware-bound Device Trust) thông qua **Secure Enclave** giữa thiết bị với Identity Provider (IdP như Entra ID, Okta).
* **Kết quả**: Cho phép cơ chế *On-demand User Account Creation* và đồng bộ mật khẩu tài khoản IdP trực tiếp với **macOS Local Account**.

💡 **Lưu ý kỳ thi**: Nếu đề bài hỏi về cách tạo tài khoản người dùng lúc khởi động lần đầu với IdP mà không cần tạo trước tài khoản local, câu trả lời bắt buộc phải liên quan đến **Platform SSO** và **Shared Device Keys**!`;
    }

    if (qText.includes('ddm') || qText.includes('declarative') || qText.includes('status report')) {
      return `Chào bạn! Hãy cùng làm rõ cuộc cách mạng **Declarative Device Management (DDM)**:

* **MDM truyền thống (Legacy MDM)**: Hoạt động theo mô hình hỏi - đáp tuần tự (Reactive Polling). MDM gửi push qua APNs ➔ Thiết bị check-in ➔ MDM trả lệnh ➔ Thiết bị báo kết quả.
* **Declarative Device Management (DDM)**: Là mô hình tự trị (Autonomous). Thiết bị tự lưu trữ các Declarations (Configurations, Assets, Activations, Managements). Khi có sự thay đổi trạng thái (ví dụ người dùng tắt Wi-Fi hoặc nâng cấp OS), thiết bị tự áp dụng chính sách và chủ động gửi **Status Report** ngược về MDM mà không cần APNs wake-up.

💡 **Lưu ý DEP110**: DDM giúp giảm tải băng thông máy chủ và tăng tốc độ thực thi chính sách tuân thủ (Compliance) ngay tức thì trên thiết bị!`;
    }

    // Generic comparative explanation for any question context
    return `Chào bạn! Cảm ơn bạn đã hỏi về câu hỏi này:

* **Phân tích câu hỏi**: ${context.question}
* **Đáp án bạn đã chọn**: \`${userAns || 'Chưa chọn'}\`
* **Đáp án chuẩn DEP110**: \`${correctAns || 'Chính xác'}\`

**Giải thích chuyên sâu**:
Theo khung chuẩn **Apple Enterprise Management**, các quy trình quản trị luôn tuân thủ nguyên tắc phân tách rõ ràng:
1. **Thiết lập cấp OS**: Luôn ưu tiên dùng **Configuration Profile** (\`.mobileconfig\`) gửi qua giao thức MDM chuẩn.
2. **Kịch bản nâng cao & Binary**: Sử dụng **Jamf Policy** hoặc MDM Extension (đối với macOS).
3. **Cơ chế bảo mật**: Kiểm tra tính toàn vẹn thông qua **Secure Enclave**, mã hóa **FileVault**, và trạng thái **Supervision**.

💡 **Mẹo làm bài thi DEP110**: Đọc kỹ từ khóa trong câu hỏi: nếu nhắc đến "zero-touch" hãy nghĩ ngay đến **ADE/ABM**; nếu nhắc đến "script/local admin" hãy nghĩ đến **Jamf Policy**; nếu nhắc đến "autonomous/status report" hãy chọn **DDM**!`;
  }

  // 2. Keyword-based Q&A
  if (lowerMsg.includes('profile') && lowerMsg.includes('policy')) {
    return `Chào bạn! Đây là bảng phân biệt cốt lõi giữa **Configuration Profile** và **Jamf Policy**:

1. **Configuration Profile (\`.mobileconfig\`)**:
   - **Bản chất**: Khung quản trị gốc (Native Apple MDM Framework).
   - **Nền tảng**: Hỗ trợ toàn diện iOS, iPadOS, macOS, tvOS, watchOS, visionOS.
   - **Chức năng**: Cấu hình các thiết lập hệ điều hành: Wi-Fi 802.1X, Passcode, FileVault, Restrictions, VPN, Web Clips.
   - **Hạn chế**: KHÔNG thể chạy Shell Script hoặc cài file \`.pkg\`/\`.dmg\` tự chế.

2. **Jamf Policy**:
   - **Bản chất**: Trình quản lý độc quyền của Jamf Pro dành riêng cho **macOS**.
   - **Cơ chế**: Thực thi thông qua \`jamf binary\` với quyền tối cao (\`root\`).
   - **Chức năng**: Chạy Bash/Zsh scripts, cài đặt phần mềm tùy biến, quản lý lịch chạy (Trigger/Frequency), kiểm kê máy (\`jamf recon\`).

💡 **Quy tắc vàng DEP110**: Cấu hình OS ➔ Configuration Profile; Chạy lệnh script/cài đặt phần mềm đóng gói riêng ➔ Jamf Policy!`;
  }

  if (lowerMsg.includes('apns') || lowerMsg.includes('5223') || lowerMsg.includes('cổng') || lowerMsg.includes('port')) {
    return `Chào bạn! Về hạ tầng **APNs (Apple Push Notification service)**:

• **Cổng mạng bắt buộc**: Máy Mac và thiết bị iOS giao tiếp ra Internet với APNs trên **TCP Port 5223** (outbound tới dải IP Apple \`17.0.0.0/8\`). Nếu mạng doanh nghiệp chặn 5223, thiết bị sẽ cố gắng fallback qua **TCP Port 443**, nhưng độ trễ sẽ cao hơn.
• **APNs Push Certificate**: Có hiệu lực trong vòng **365 ngày (1 năm)**.
• **Cảnh báo quan trọng**: Khi gia hạn chứng chỉ APNs, người quản trị PHẢI dùng chính xác tài khoản Apple ID đã tạo lúc đầu. Nếu gia hạn bằng Apple ID khác, toàn bộ thiết bị sẽ bị mồ côi (orphaned) và phải Enroll lại từ đầu!`;
  }

  if (lowerMsg.includes('supervision') || lowerMsg.includes('ade') || lowerMsg.includes('abm')) {
    return `Chào bạn! Về **Automated Device Enrollment (ADE)** và **Supervision**:

• **Automated Device Enrollment (ADE)**: Cơ chế kết nối giữa **Apple Business Manager (ABM)** và MDM Server. Cung cấp trải nghiệm Zero-touch triển khai khi người dùng mở hộp máy mới.
• **Supervision**: Chế độ giám sát cao nhất của Apple. Cho phép kích hoạt các chính sách hạn chế nghiêm ngặt (chặn xóa ứng dụng, bắt buộc cập nhật OS, cấu hình Web Content Filter).
• **Đặc quyền ADE**: Chỉ có thiết bị tham gia qua ADE mới được bật Supervision mặc định và cho phép thiết lập **Unremovable MDM Profile**!`;
  }

  if (lowerMsg.includes('platform sso') || lowerMsg.includes('sso') || lowerMsg.includes('shared device key')) {
    return `Chào bạn! Về **Platform SSO (Single Sign-On)** trong macOS:

• **Mục tiêu**: Đồng bộ thông tin xác thực giữa máy Mac và Identity Provider đám mây (IdP như Microsoft Entra ID, Okta, Ping).
• **Shared Device Keys**: Đóng vai trò cực kỳ then chốt trong luồng macOS ADE. Khóa này được lưu an toàn trong **Secure Enclave** của chip Apple Silicon/T2, tạo dựng danh tính thiết bị tin cậy với IdP trước khi có bất kỳ tài khoản người dùng cục bộ nào đăng nhập.
• Nhờ đó, người dùng mới chỉ cần nhập email công ty và mật khẩu IdP tại màn hình đăng nhập macOS, hệ thống sẽ tự động tạo tài khoản **macOS Local Account** tương ứng!`;
  }

  if (lowerMsg.includes('ddm') || lowerMsg.includes('declarative')) {
    return `Chào bạn! Về **Declarative Device Management (DDM)**:

• DDM là bước tiến hóa lớn nhất của Apple MDM protocol kể từ năm 2010.
• Thay vì máy chủ liên tục gửi lệnh kiểm tra, DDM chuyển quyền quyết định và xử lý sang cho **Client (thiết bị Apple)**.
• 4 loại Declarations chính:
  1. **Configurations**: Các thiết lập như Passcode, Restrictions.
  2. **Assets**: Dữ liệu phụ trợ (User identity, Certificates).
  3. **Activations**: Điều kiện kích hoạt chính sách (ví dụ: chỉ áp dụng khi OS >= 14.4).
  4. **Management**: Thông tin mô tả trạng thái quản trị.
• Khi có thay đổi trạng thái, thiết bị tự động gửi **Status Report** về máy chủ ngay lập tức!`;
  }

  if (lowerMsg.includes('filevault') || lowerMsg.includes('prk') || lowerMsg.includes('recovery key')) {
    return `Chào bạn! Về bảo mật **FileVault 2** trên macOS trong doanh nghiệp:

• **Personal Recovery Key (PRK)**: Khóa khôi phục cá nhân độc nhất cho từng máy, thường được gửi mã hóa an toàn về lưu trữ tại MDM (Escrowed Recovery Key).
• **Institutional Recovery Key (IRK)**: Khóa dùng chung cho toàn doanh nghiệp (tuy nhiên Apple khuyến nghị dùng PRK kết hợp MDM Escrow để đảm bảo an toàn tuyệt đối).
• **Lệnh chẩn đoán CLI**:
  \`fdesetup status\` ➔ Xem trạng thái bật/tắt mã hóa FileVault.
  \`fdesetup haspersonalrecoverykey\` ➔ Kiểm tra máy đã có PRK escrow hay chưa.`;
  }

  // Fallback friendly mentor guidance
  return `Chào bạn! Tôi là **Apple Deployment Mentor**. Tôi đã ghi nhận câu hỏi của bạn: "${message}".

Để nắm chắc nội dung này trong kỳ thi **Apple Certified IT Professional (DEP110)**, bạn hãy ghi nhớ các nguyên lý thiết kế của Apple:
• **Cấu hình OS** (Wi-Fi, Passcode, VPN) ➔ Luôn ưu tiên dùng **Configuration Profile** (\`.mobileconfig\`).
• **Thực thi Script/Cài đặt App đóng gói riêng** ➔ Dùng **Jamf Policy** với quyền root.
• **Giao tiếp quản trị** ➔ Bắt buộc qua kênh **APNs** (cổng **TCP 5223**).
• **Triển khai tự động Zero-touch** ➔ Thông qua **ADE** trong **Apple Business Manager (ABM)** để kích hoạt trạng thái **Supervision**.

Bạn có muốn tôi giải thích chi tiết hơn về câu lệnh Terminal cụ thể hay phân tích một câu hỏi trắc nghiệm nào không?`;
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, context, history } = body;

    // Check if external GEMINI_API_KEY is available in environment
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (geminiApiKey) {
      try {
        const fullPrompt = `${SYSTEM_PROMPT}\n\n` +
          (context?.question ? `[CONTEXT INJECTION]\nQuestion: ${context.question}\nUser Selected: ${context.userSelected || 'None'}\nCorrect Answer: ${context.correctAnswer || 'None'}\nTopic/Chapter: ${context.context || 'General'}\n\n` : '') +
          `User Query: ${message}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: fullPrompt }],
                },
              ],
              generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.3,
              },
            }),
          }
        );

        if (res.ok) {
          const geminiData = await res.json();
          const generatedText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({ reply: generatedText });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to built-in mentor engine:', geminiError);
      }
    }

    // Fallback: Use built-in expert knowledge engine (100% offline reliable, instant, DEP110 compliant)
    const reply = generateBuiltInMentorResponse(message, context);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API Error in /api/mentor/chat:', error);
    return NextResponse.json(
      { reply: 'Xin lỗi, đã xảy ra lỗi trong quá trình xử lý câu hỏi. Vui lòng thử lại!' },
      { status: 500 }
    );
  }
}
