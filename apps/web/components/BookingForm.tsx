"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@wedding-invitation/ui";
import { createOrder } from "@/app/dat-hang/actions";

type Package = { id: string; type: string; name: string; price: number; description: string | null };
type Template = { id: string; name: string; slug: string; description: string | null };

export function BookingForm({
  packages,
  templates,
}: {
  packages: Package[];
  templates: Template[];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<{ orderId: string; urlSlug: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [paying, setPaying] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const weddingDate = formData.get("wedding_date") as string;
    if (!weddingDate) {
      setErrorMsg("Vui lòng chọn ngày cưới.");
      setStatus("error");
      return;
    }
    const r = await createOrder({
      package_id: formData.get("package_id") as string,
      template_id: formData.get("template_id") as string,
      groom_name: (formData.get("groom_name") as string).trim(),
      bride_name: (formData.get("bride_name") as string).trim(),
      wedding_date: weddingDate,
      wedding_time: (formData.get("wedding_time") as string) || undefined,
      venue_name: (formData.get("venue_name") as string) || undefined,
      venue_address: (formData.get("venue_address") as string) || undefined,
      venue_maps_url: (formData.get("venue_maps_url") as string) || undefined,
      story: (formData.get("story") as string) || undefined,
      hashtag: (formData.get("hashtag") as string) || undefined,
      customer_name: (formData.get("customer_name") as string).trim(),
      customer_phone: (formData.get("customer_phone") as string).trim(),
      customer_email: (formData.get("customer_email") as string) || undefined,
      customer_zalo: (formData.get("customer_zalo") as string) || undefined,
    });
    if (r.success) {
      setResult({ orderId: r.orderId, urlSlug: r.urlSlug });
      setStatus("success");
    } else {
      setErrorMsg(r.error);
      setStatus("error");
    }
  }

  async function handlePayVnpay() {
    if (!result?.orderId) return;
    setPaying(true);
    try {
      const res = await fetch("/api/vnpay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: result.orderId }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setErrorMsg(data.error ?? "Không thể tạo link thanh toán");
      }
    } catch {
      setErrorMsg("Có lỗi xảy ra");
    } finally {
      setPaying(false);
    }
  }

  if (status === "success" && result) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h2 className="text-xl font-bold text-green-800">Đặt hàng thành công!</h2>
        <p className="mt-2 text-green-700">
          Chúng tôi sẽ liên hệ xác nhận. Bạn có thể xem thiệp của mình tại:
        </p>
        <a
          href={`/thiep/${result.urlSlug}`}
          className="mt-4 inline-block text-rose-600 font-medium underline"
        >
          /thiep/{result.urlSlug}
        </a>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <Button onClick={handlePayVnpay} disabled={paying}>
            {paying ? "Đang chuyển hướng..." : "Thanh toán VNPay"}
          </Button>
          <Button asChild variant="outline">
            <Link href={`/thiep/${result.urlSlug}`}>Xem thiệp</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
        {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">1. Chọn gói & mẫu thiệp</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-2">Gói dịch vụ *</label>
            <select
              name="package_id"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">— Chọn gói —</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(p.price)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mẫu thiệp *</label>
            <select
              name="template_id"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">— Chọn mẫu —</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">2. Thông tin đám cưới</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Chú rể *</label>
            <Input name="groom_name" required placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cô dâu *</label>
            <Input name="bride_name" required placeholder="Trần Thị B" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ngày cưới *</label>
            <Input name="wedding_date" type="date" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Giờ cưới</label>
            <Input name="wedding_time" type="time" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Địa điểm</label>
            <Input name="venue_name" placeholder="Tên địa điểm" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Địa chỉ chi tiết</label>
            <Input name="venue_address" placeholder="Số nhà, đường, quận..." />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Link Google Maps</label>
            <Input name="venue_maps_url" type="url" placeholder="https://maps.google.com/..." />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Câu chuyện tình yêu</label>
            <textarea
              name="story"
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Chia sẻ câu chuyện của bạn (tùy chọn)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hashtag</label>
            <Input name="hashtag" placeholder="#MinhAnh2025" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">3. Thông tin liên hệ</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Họ tên người đặt *</label>
            <Input name="customer_name" required placeholder="Nguyễn Văn A" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại *</label>
            <Input name="customer_phone" required placeholder="0901234567" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="customer_email" type="email" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zalo</label>
            <Input name="customer_zalo" placeholder="Số Zalo" />
          </div>
        </div>
      </div>

      {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

      <div className="flex gap-4">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Đang gửi..." : "Đặt hàng"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/">Hủy</Link>
        </Button>
      </div>
    </form>
  );
}
