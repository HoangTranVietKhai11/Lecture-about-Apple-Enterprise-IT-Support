# Hướng Dẫn Vận Hành Hệ Thống Học & Thi Apple Certified IT Professional (DEP110)

Hệ thống Web App Next.js 14 (App Router) được chuyển giao và nâng cấp toàn diện từ kiến trúc chuẩn **Apple Certified IT Professional (DEP110)** và file dữ liệu `Apple_Deployment_and_Managerment (1).html`.

---

## 1. Cấu Trúc Hệ Thống (Tech Stack & Architecture)

- **Frontend Core**: Next.js 14.2 (App Router), React 18, TypeScript (Strict Mode).
- **Styling**: Tailwind CSS với bảng màu chuẩn Apple Showroom (Dark/Light mode hỗ trợ qua Data Attribute).
- **State Management**: Zustand v5 (Persisted LocalStorage cho tiến độ học, ghi chú, flashcards, điểm số).
- **Backend & Database**: Prisma ORM v5, PostgreSQL schema hoàn chỉnh.
- **Iconography**: Lucide React.

---

## 2. Bản Đồ Tính Năng & Router (Application Routes)

| Tuyến Đường (Route) | Mô Tả Chức Năng |
| :--- | :--- |
| `/` | **Executive Dashboard**: KPI tổng quan, tỷ lệ hoàn thành 14 chương, điểm thi cao nhất, truy cập nhanh 4 module. |
| `/learn` hoặc `/learn/[chapterId]` | **Learning Hub**: 14 chương lý thuyết, ma trận so sánh (Comparison Matrices), Flashcards theo chương, Ghi chú cá nhân. |
| `/learn/[chapterId]/quiz` | **Chapter Checkpoint**: Kiểm tra củng cố kiến thức từng chương với giải thích song ngữ tức thì. |
| `/exam` | **Exam Simulator**: Bộ mô phỏng thi Pearson VUE (60 câu / 60 phút, pass 75%), Chế độ luyện tập, Ôn câu sai, Đổi ngôn ngữ VN/EN. |
| `/visualizer` | **Interactive Architecture Visualizer**: Sơ đồ động trực quan APNs (Port 5223), ADE Zero-Touch, DDM, VPP. Hỗ trợ mô phỏng lỗi (Fault Simulation). |
| `/lab/terminal` | **macOS Terminal MDM Emulator**: Giả lập Terminal macOS với các lệnh quản trị (`profiles`, `app-sso`, `fdesetup`, `AssetCacheManagerUtil`, `jamf`), 5 nhiệm vụ CLI và 6 kịch bản sự cố doanh nghiệp. |
| `/flashcards` | **Spaced Repetition Flashcards**: Lật thẻ 3D thuật ngữ Apple DEP110 song ngữ với đánh dấu từ đã thuộc. |
| `/api/questions` | **Questions API**: Lọc câu hỏi theo chương, topic, giới hạn hoặc xáo trộn. |
| `/api/exam/submit` | **Exam Submission API**: Chấm điểm tự động, phân tích hiệu suất theo từng TopicTag, xác định Đạt/Không Đạt. |
| `/api/progress` | **Progress API**: Đồng bộ hóa dữ liệu tiến độ người dùng. |

---

## 3. Hướng Dẫn Khởi Chạy

### 3.1 Khởi động chế độ Development
```bash
npm run dev
```
Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

### 3.2 Build kiểm tra Production
```bash
npm run build
npm start
```

### 3.3 Kết nối Database PostgreSQL (Tùy chọn)
Nếu bạn muốn lưu trữ dữ liệu tập trung qua PostgreSQL:
1. Cấu hình biến môi trường trong file `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/dep110_db?schema=public"
   ```
2. Đồng bộ hóa Schema vào Database:
   ```bash
   npx prisma db push
   ```
3. Nạp ngân hàng câu hỏi (120 câu hỏi DEP110 song ngữ) vào Database:
   ```bash
   npx ts-node prisma/seed.ts
   ```

---

## 4. Đặc Điểm Nổi Bật Về Dữ Liệu
- **14 Chương học đầy đủ**: Đầy đủ nội dung lý thuyết, mẹo thi, thuật ngữ cốt lõi, flashcard và bài kiểm tra ngắn.
- **Ngân hàng 120 câu hỏi**:
  - Gồm 60 câu hỏi nền tảng từ file gốc.
  - Bổ sung 60 câu hỏi tình huống thực tế chuyên sâu (Edge cases, DDM autonomy, Network Port 5223 fallback, Recovery Lock vs FileVault, Shared Device Keys).
  - 100% câu hỏi có giải thích chi tiết song ngữ Việt - Anh.
