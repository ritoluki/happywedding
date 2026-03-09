-- Seed 4 mẫu thiệp: Classic, Modern, Boho, Luxury

INSERT INTO templates (name, slug, description, category, is_active, is_featured, sort_order, html_content, css_content, js_content) VALUES
(
  'Classic',
  'classic',
  'Thiết kế cổ điển, trang nhã với họa tiết hoa văn truyền thống',
  'classic',
  true,
  true,
  1,
  '<div class="invitation">
    <h1>{{groom_name}} & {{bride_name}}</h1>
    <p class="subtitle">Trân trọng kính mời</p>
    <p class="guest">Kính gửi: {{guest_name}}</p>
    <p class="date">{{wedding_date}}</p>
    <p class="venue">{{venue_name}}</p>
    <p class="address">{{venue_address}}</p>
    <p class="story">{{story}}</p>
  </div>',
  '.invitation { font-family: "Times New Roman", serif; text-align: center; padding: 2rem; max-width: 600px; margin: 0 auto; }
.invitation h1 { font-size: 2rem; margin-bottom: 0.5rem; }
.invitation .subtitle { font-style: italic; color: #666; }
.invitation .guest { font-weight: bold; }
.invitation .date, .invitation .venue { margin-top: 1rem; }',
  ''
),
(
  'Modern',
  'modern',
  'Phong cách hiện đại, tối giản với typography rõ ràng',
  'modern',
  true,
  true,
  2,
  '<div class="invitation">
    <div class="names">{{groom_name}} & {{bride_name}}</div>
    <p class="invite">Trân trọng kính mời</p>
    <p class="to">Kính gửi: {{guest_name}}</p>
    <p class="date">{{wedding_date}}</p>
    <p class="place">{{venue_name}}</p>
    <p class="addr">{{venue_address}}</p>
  </div>',
  '.invitation { font-family: system-ui, sans-serif; text-align: center; padding: 3rem; background: #fafafa; }
.invitation .names { font-size: 2.5rem; font-weight: 300; letter-spacing: 0.1em; }
.invitation .invite { text-transform: uppercase; letter-spacing: 0.3em; margin-top: 2rem; }
.invitation .date { font-size: 1.25rem; margin-top: 1.5rem; }',
  ''
),
(
  'Boho',
  'boho',
  'Phong cách boho, gần gũi thiên nhiên với tông màu ấm',
  'boho',
  true,
  false,
  3,
  '<div class="invitation">
    <h1>{{groom_name}} & {{bride_name}}</h1>
    <p class="tagline">Cùng nhau viết câu chuyện mới</p>
    <p class="guest">Kính gửi {{guest_name}}</p>
    <p class="date">{{wedding_date}}</p>
    <p class="venue">{{venue_name}}</p>
  </div>',
  '.invitation { font-family: Georgia, serif; text-align: center; padding: 2rem; background: linear-gradient(135deg, #f5e6d3 0%, #e8d5c4 100%); }
.invitation h1 { color: #8b4513; font-size: 2rem; }
.invitation .tagline { font-style: italic; color: #6b4423; }',
  ''
),
(
  'Luxury',
  'luxury',
  'Sang trọng, cao cấp với họa tiết vàng kim',
  'luxury',
  true,
  true,
  4,
  '<div class="invitation">
    <h1>{{groom_name}} & {{bride_name}}</h1>
    <p class="sub">Trân trọng kính mời</p>
    <p class="guest">Kính gửi: {{guest_name}}</p>
    <p class="date">{{wedding_date}}</p>
    <p class="venue">{{venue_name}}</p>
  </div>',
  '.invitation { font-family: "Playfair Display", serif; text-align: center; padding: 3rem; background: #1a1a1a; color: #d4af37; }
.invitation h1 { font-size: 2.5rem; }
.invitation .sub { letter-spacing: 0.5em; text-transform: uppercase; }',
  ''
)
ON CONFLICT (slug) DO NOTHING;
