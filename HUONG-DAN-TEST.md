# Hướng dẫn thiết lập & test — Thiệp Cưới Điện Tử

Tài liệu này hướng dẫn từ đầu đến cuối các bước cần làm để chạy và test toàn bộ hệ thống.

---

## Phần 1: Yêu cầu môi trường

- **Node.js** 18+
- **pnpm** (cài: `npm install -g pnpm`)
- **Tài khoản Supabase** (miễn phí tại https://supabase.com)

---

## Phần 2: Chuẩn bị Supabase

### 2.1. Tạo project Supabase

1. Đăng nhập https://supabase.com/dashboard
2. **New project** → đặt tên (vd: `happywedding`)
3. Chọn region, đặt mật khẩu database (lưu lại)

### 2.2. Chạy migrations

1. Vào **SQL Editor** trong Supabase Dashboard
2. Mở file `supabase/migrations/001_initial_schema.sql` → copy toàn bộ nội dung → **Run**
3. Mở file `supabase/migrations/002_seed_templates.sql` → copy toàn bộ → **Run**

### 2.3. Lấy thông tin API

1. Vào **Project Settings** → **API**
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ giữ bí mật)

---

## Phần 3: Cấu hình biến môi trường

### 3.1. Tạo file `.env.local` ở thư mục gốc dự án (`C:\happywedding\`)

Tạo file `.env.local` (copy từ `.env.example`):

```bash
cp .env.example .env.local
```

Sau đó chỉnh sửa `.env.local` với giá trị thật:

```env
# Supabase (dùng chung cho web & admin)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# URL app Web (Admin dùng để tạo link thiệp)
NEXT_PUBLIC_WEB_URL=http://localhost:3000

# VNPay (tùy chọn - bỏ qua nếu chưa đăng ký VNPay)
VNPAY_TMN_CODE=your_merchant_code
VNPAY_HASH_SECRET=your_hash_secret
```

Next.js tự load `.env.local` cho cả `apps/web` và `apps/admin` khi chạy từ root.

---

## Phần 4: Cài đặt & chạy dự án

### 4.1. Cài dependencies

```bash
cd C:\happywedding
pnpm install
```

### 4.2. Chạy development

**Option A — Chạy cả 2 app (trong 2 terminal):**

```bash
# Terminal 1 — Web (Landing + Đặt hàng + Xem thiệp)
pnpm dev --filter=web

# Terminal 2 — Admin
pnpm dev --filter=admin
```

**Option B — Chạy tất cả từ root:**

```bash
pnpm dev
```

- **Web**: http://localhost:3000
- **Admin**: http://localhost:3001

---

## Phần 5: Tạo tài khoản Admin

1. Supabase Dashboard → **Authentication** → **Users**
2. **Add user** → **Create new user**
3. Nhập **Email** và **Password** (ví dụ: `admin@test.com` / `123456`)
4. **Create user**

---

## Phần 6: Quy trình test từ đầu đến cuối

### Bước 1: Test trang chủ (Web)

1. Mở http://localhost:3000
2. Kiểm tra:
   - Hero: tiêu đề, phụ đề
   - Mẫu thiệp: grid 4 template (Classic, Modern, Boho, Luxury)
   - Bảng giá: 3 gói (Cơ Bản, Tiêu Chuẩn, Cao Cấp)
   - Nút "Đặt Dịch Vụ Ngay" → link tới `/dat-hang`

### Bước 2: Đặt hàng & Thanh toán (Web)

1. Vào http://localhost:3000/dat-hang
2. Điền form:
   - Chọn gói (vd: Gói Tiêu Chuẩn)
   - Chọn mẫu thiệp (vd: Classic)
   - Chú rể: Nguyễn Văn Minh
   - Cô dâu: Trần Thị Anh
   - Ngày cưới: 15/12/2025
   - Địa điểm, địa chỉ (tùy chọn)
   - Người đặt, SĐT (bắt buộc)
3. Bấm **Đặt hàng**
4. Sau khi thành công: có link `/thiep/[slug]` (vd: `minh-anh-15122025`)
5. **Thanh toán VNPay** (nếu đã cấu hình): chuyển tới cổng VNPay → chọn ngân hàng → hoàn tất → quay về trang kết quả
6. Bấm **Xem thiệp** → chuyển tới trang xem thiệp

### Bước 3: Xem thiệp & RSVP (Web)

1. Truy cập link thiệp (vd: http://localhost:3000/thiep/minh-anh-15122025)
2. Kiểm tra:
   - Thiệp hiển thị đúng nội dung (chú rể, cô dâu, ngày, địa điểm…)
   - Phần "Xác nhận tham dự" ở dưới
3. Điền RSVP: chọn "Sẽ tham dự", số người, ghi chú → **Gửi xác nhận**
4. Kiểm tra thông báo "Cảm ơn bạn đã xác nhận"

### Bước 4: Đăng nhập Admin

1. Mở http://localhost:3001/login
2. Đăng nhập bằng email/password đã tạo (vd: `admin@test.com`)

### Bước 5: Quản lý đơn hàng (Admin)

1. Vào **Đơn hàng** (/don-hang)
2. Kiểm tra đơn vừa tạo
3. Bấm vào một đơn → trang chi tiết
4. Kiểm tra:
   - Thông tin đám cưới, khách hàng
   - Cập nhật trạng thái, thanh toán
   - Phần **Thiệp cưới**: danh sách thiệp, link "Xem"

### Bước 6: Tạo thiệp chung (Admin)

1. Trong trang chi tiết đơn, phần **Thiệp cưới**
2. Nếu chưa có thiệp chung: bấm **Tạo thiệp chung**
3. Sau khi tạo: xuất hiện link Xem thiệp chung

### Bước 7: Import khách Excel (Admin)

1. Chuẩn bị file Excel với các cột:
   - **Họ tên** (hoặc Tên, name)
   - **SĐT** (hoặc Phone) — tùy chọn
   - **Email** — tùy chọn
2. Ví dụ nội dung:

   | Họ tên     | SĐT       | Email           |
   |------------|-----------|-----------------|
   | Nguyễn A   | 0901111111| a@example.com    |
   | Trần B     | 0902222222|                 |

3. Trong trang chi tiết đơn → **Import danh sách khách** → chọn file Excel
4. Sau khi import: danh sách thiệp riêng xuất hiện với link từng khách

### Bước 8: Test thiệp riêng

1. Mở link thiệp riêng (vd: `http://localhost:3000/thiep/nguyen-a-xxxxx`)
2. Kiểm tra tên khách trên thiệp
3. Thử RSVP → kiểm tra dữ liệu trong bảng `guests` (Supabase → Table Editor)

### Bước 9: Export Excel đơn hàng (Admin)

1. Vào **Đơn hàng** (/don-hang)
2. Bấm nút **Export Excel**
3. Kiểm tra file tải về có danh sách đơn đầy đủ

### Bước 10: Cài đặt (Admin)

1. Vào **Cài đặt** (/cai-dat)
2. Kiểm tra URL Web, trạng thái VNPay
3. Link nhanh tới trang Nội dung

### Bước 11: Chỉnh nội dung CMS (Admin)

1. Vào **Nội dung** (/noi-dung)
2. Sửa **hero_title**, **hero_subtitle** → Lưu
3. Sửa **contact_zalo**, **contact_phone** → Footer trang chủ hiển thị số liên hệ
4. **show_rsvp**: true/false → Bật/tắt form RSVP trên thiệp

### Bước 12: Khách hàng & RSVP (Admin)

1. Vào **Khách hàng** (/khach-hang)
2. Xem danh sách khách mời, lọc theo RSVP, tìm theo tên/SĐT
3. Trong **Chi tiết đơn** → bảng **Khách & RSVP** hiển thị guests của đơn đó

### Bước 13: Quản lý Template (Admin)

1. Vào **Template** (/template)
2. Xem danh sách mẫu, bật/tắt Active, Featured
3. Vào **Thêm mới** (/template/moi) → tạo template mới với HTML/CSS/JS
4. Chỉnh sửa template có sẵn tại `/template/[id]`

---

## Phần 7: Kiểm tra dữ liệu trong Supabase

- **Table Editor**: xem `orders`, `invitations`, `guests`, `templates`, `packages`, `cms_content`
- **Authentication** → **Users**: danh sách user admin

---

## Phần 8: Các lỗi thường gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|-----|-------------|------------|
| Missing SUPABASE_... | Chưa cấu hình `.env.local` | Tạo `.env.local` như Phần 3 |
| Đặt hàng thất bại | Thiếu `SUPABASE_SERVICE_ROLE_KEY` | Thêm key vào `.env.local` |
| Không thấy template | Chưa chạy `002_seed_templates.sql` | Chạy migration trong SQL Editor |
| Không đăng nhập được Admin | Chưa tạo user | Làm theo Phần 5 |
| Link thiệp 404 | Sai slug hoặc chưa có invitation | Kiểm tra bảng `invitations` |
| CORS / Mixed content | Chạy HTTP khi dùng Supabase | Dùng `localhost`, không dùng IP |
| Thanh toán VNPay lỗi | Chưa cấu hình hoặc sai TMN/HashSecret | Đăng ký sandbox VNPay, thêm `VNPAY_TMN_CODE` và `VNPAY_HASH_SECRET` |

---

## Phần 9: Build production

```bash
pnpm build
```

- Web build → `apps/web/.next`
- Admin build → `apps/admin/.next`
- Chạy production: `pnpm start --filter=web` và `pnpm start --filter=admin`

---

## Tóm tắt checklist

- [ ] Tạo project Supabase
- [ ] Chạy `001_initial_schema.sql`
- [ ] Chạy `002_seed_templates.sql`
- [ ] Chạy `003_cms_rls.sql` (RLS cho CMS)
- [ ] Chạy `004_guests_select_policy.sql` (Admin đọc guests)
- [ ] Lấy Project URL, anon key, service_role key
- [ ] Tạo `.env.local` đầy đủ
- [ ] `pnpm install`
- [ ] `pnpm dev` (hoặc dev riêng web/admin)
- [ ] Tạo user Admin trong Supabase Auth
- [ ] Test Web: Trang chủ → Đặt hàng → Xem thiệp → RSVP
- [ ] Test Admin: Login → Đơn hàng → Chi tiết đơn → Tạo thiệp chung → Import Excel
- [ ] Test thiệp riêng và Export Excel
- [ ] (Tùy chọn) Cấu hình VNPay sandbox → Test thanh toán
- [ ] Share link thiệp lên Zalo/Facebook → kiểm tra OG image preview
