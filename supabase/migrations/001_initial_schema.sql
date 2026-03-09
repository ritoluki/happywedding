-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- ENUMS
-- =====================
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('unpaid', 'pending', 'paid', 'refunded');
CREATE TYPE payment_method AS ENUM ('vnpay', 'momo', 'zalopay', 'bank_transfer', 'zalo_manual');
CREATE TYPE invitation_type AS ENUM ('general', 'personal');
CREATE TYPE package_type AS ENUM ('basic', 'standard', 'premium');
CREATE TYPE rsvp_status AS ENUM ('pending', 'attending', 'not_attending', 'maybe');

-- =====================
-- PROFILES (Admin users)
-- =====================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TEMPLATES
-- =====================
CREATE TABLE templates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  preview_url TEXT,
  html_content TEXT,
  css_content TEXT,
  js_content TEXT,
  category TEXT,
  color_scheme TEXT[],
  tags TEXT[],
  price_adjustment DECIMAL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PACKAGES / PRICING
-- =====================
CREATE TABLE packages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type package_type UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  personal_invitation_limit INT DEFAULT 0,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0
);

-- Insert default packages
INSERT INTO packages (type, name, description, price, personal_invitation_limit, features, sort_order) VALUES
('basic', 'Gói Cơ Bản', 'Thiệp chung đơn giản, phù hợp ngân sách', 299000, 0, 
  '{"features": ["1 mẫu thiệp", "Thiệp chung (không tên người nhận)", "Link chia sẻ", "Hiệu lực 6 tháng"]}', 1),
('standard', 'Gói Tiêu Chuẩn', 'Thiệp riêng tên người nhận, đầy đủ tính năng', 699000, 50,
  '{"features": ["3 mẫu thiệp", "Thiệp riêng đến 50 người", "RSVP xác nhận tham dự", "Nhạc nền", "Bản đồ địa điểm", "Hiệu lực 12 tháng"]}', 2),
('premium', 'Gói Cao Cấp', 'Không giới hạn, ưu tiên xử lý', 1299000, -1,
  '{"features": ["Tất cả mẫu thiệp", "Thiệp riêng không giới hạn", "RSVP + Dashboard thống kê", "Nhạc nền custom", "Bản đồ + Lịch trình", "Hỗ trợ ưu tiên", "Hiệu lực vĩnh viễn"]}', 3);

-- =====================
-- ORDERS (requires order_seq for trigger - create sequence first)
-- =====================
CREATE SEQUENCE order_seq START 1;

CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_code TEXT UNIQUE NOT NULL,
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  wedding_time TIME,
  venue_name TEXT,
  venue_address TEXT,
  venue_maps_url TEXT,
  venue_lat DECIMAL,
  venue_lng DECIMAL,
  story TEXT,
  hashtag TEXT,
  music_url TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_zalo TEXT,
  package_id UUID REFERENCES packages(id),
  template_id UUID REFERENCES templates(id),
  status order_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'unpaid',
  payment_method payment_method,
  payment_transaction_id TEXT,
  paid_at TIMESTAMPTZ,
  couple_photos TEXT[],
  total_amount DECIMAL,
  admin_notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INVITATIONS
-- =====================
CREATE TABLE invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id),
  type invitation_type NOT NULL DEFAULT 'general',
  url_slug TEXT UNIQUE NOT NULL,
  guest_name TEXT,
  custom_data JSONB,
  view_count INT DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- GUESTS & RSVP
-- =====================
CREATE TABLE guests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  rsvp_status rsvp_status DEFAULT 'pending',
  rsvp_note TEXT,
  guest_count INT DEFAULT 1,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- MEDIA ASSETS
-- =====================
CREATE TABLE media_assets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  url TEXT NOT NULL,
  type TEXT,
  size_bytes BIGINT,
  linked_to TEXT,
  linked_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CMS CONTENT
-- =====================
CREATE TABLE cms_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_json JSONB,
  type TEXT DEFAULT 'text',
  label TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO cms_content (key, value, type, label) VALUES
('hero_title', 'Thiệp Cưới Điện Tử Đẹp & Sang Trọng', 'text', 'Tiêu đề Hero'),
('hero_subtitle', 'Gửi lời mời đặc biệt đến từng người thân yêu', 'text', 'Phụ đề Hero'),
('about_text', 'Chúng tôi tạo ra những thiệp cưới điện tử độc đáo...', 'text', 'Giới thiệu'),
('show_rsvp', 'true', 'boolean', 'Hiển thị tính năng RSVP'),
('contact_zalo', '0909090909', 'text', 'Số Zalo liên hệ'),
('contact_phone', '0909090909', 'text', 'Số điện thoại');

-- =====================
-- TESTIMONIALS
-- =====================
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  couple_name TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar_url TEXT,
  rating INT DEFAULT 5,
  wedding_date DATE,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- RLS POLICIES
-- =====================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active templates" ON templates FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active invitations" ON invitations FOR SELECT USING (is_active = true);
CREATE POLICY "Public update rsvp" ON guests FOR UPDATE USING (true);
CREATE POLICY "Public insert guest rsvp" ON guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access orders" ON orders FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin full access templates" ON templates FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- =====================
-- FUNCTIONS & TRIGGERS
-- =====================
CREATE OR REPLACE FUNCTION generate_order_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_code := 'WED-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(CAST(nextval('order_seq') AS TEXT), 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_order_code BEFORE INSERT ON orders FOR EACH ROW EXECUTE FUNCTION generate_order_code();

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
