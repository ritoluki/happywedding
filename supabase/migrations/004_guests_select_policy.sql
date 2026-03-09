-- Admin cần đọc được danh sách guests
CREATE POLICY "Admin read guests" ON guests FOR SELECT USING (auth.role() = 'authenticated');
