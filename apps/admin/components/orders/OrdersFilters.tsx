"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@wedding-invitation/ui";
import { Search, Download } from "lucide-react";

interface OrdersFiltersProps {
  packages: { id: string; name: string }[];
}

const statusOptions = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

const paymentOptions = [
  { value: "", label: "Tất cả thanh toán" },
  { value: "unpaid", label: "Chưa thanh toán" },
  { value: "pending", label: "Đang chờ" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "refunded", label: "Hoàn tiền" },
];

export function OrdersFilters({ packages }: OrdersFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [payment, setPayment] = useState(searchParams.get("payment_status") ?? "");
  const [packageId, setPackageId] = useState(searchParams.get("package_id") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (payment) params.set("payment_status", payment);
    if (packageId) params.set("package_id", packageId);
    params.set("page", "1");
    router.push(`/don-hang?${params.toString()}`);
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-medium">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Mã đơn, tên, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {statusOptions.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Thanh toán</label>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {paymentOptions.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Gói</label>
          <select
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Tất cả gói</option>
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={applyFilters}>Lọc</Button>
        <Button variant="outline" asChild>
          <a href="/api/orders/export">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </a>
        </Button>
      </div>
    </div>
  );
}
