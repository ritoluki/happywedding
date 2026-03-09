import { Button } from "@wedding-invitation/ui";
import Link from "next/link";

export default function CaiDatPage() {
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL;
  const hasVnpay = !!(process.env.VNPAY_TMN_CODE && process.env.VNPAY_HASH_SECRET);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <p className="mt-1 text-muted-foreground">Cấu hình hệ thống</p>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <div>
          <h2 className="font-semibold mb-2">URL Web</h2>
          <p className="text-sm text-muted-foreground">
            Dùng cho link thiệp, OG image. Chỉnh trong <code className="bg-muted px-1 rounded">.env.local</code>
          </p>
          <p className="mt-2 font-mono text-sm">{webUrl || "(chưa cấu hình)"}</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">VNPay</h2>
          <p className="text-sm text-muted-foreground">
            Thanh toán online. Cần <code className="bg-muted px-1 rounded">VNPAY_TMN_CODE</code> và{" "}
            <code className="bg-muted px-1 rounded">VNPAY_HASH_SECRET</code>
          </p>
          <p className="mt-2">
            <span className={hasVnpay ? "text-green-600" : "text-amber-600"}>
              {hasVnpay ? "Đã cấu hình" : "Chưa cấu hình"}
            </span>
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Nội dung trang chủ</h2>
          <p className="text-sm text-muted-foreground">Chỉnh tiêu đề, liên hệ tại trang Nội dung</p>
          <Button asChild variant="outline" size="sm" className="mt-2">
            <Link href="/noi-dung">Mở Nội dung</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
