import type { Metadata } from "next";
import "@wedding-invitation/ui/globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin - Thiệp Cưới Điện Tử",
  description: "Admin Panel quản trị thiệp cưới điện tử",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
