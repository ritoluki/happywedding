-- RLS cho cms_content: public đọc, admin mới sửa được
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read cms" ON cms_content FOR SELECT USING (true);
CREATE POLICY "Admin update cms" ON cms_content FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin insert cms" ON cms_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
