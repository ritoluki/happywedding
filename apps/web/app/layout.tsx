import type { Metadata } from "next";
import "@wedding-invitation/ui/globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thiệp Cưới Điện Tử",
  description: "Gửi lời mời đặc biệt đến từng người thân yêu",
  manifest: "/manifest.json",
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
