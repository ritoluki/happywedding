-- Cho phép public đọc orders để hiển thị thiệp cưới
CREATE POLICY "Public read orders for invitation" ON orders
FOR SELECT USING (true);
