"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button, Input } from "@wedding-invitation/ui";
import { Search } from "lucide-react";

const rsvpOptions = [
  { value: "", label: "Tất cả RSVP" },
  { value: "pending", label: "Chờ phản hồi" },
  { value: "attending", label: "Sẽ tham dự" },
  { value: "not_attending", label: "Không tham dự" },
  { value: "maybe", label: "Chưa chắc chắn" },
];

export function GuestsFilters({ orderId }: { orderId?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [rsvp, setRsvp] = useState(searchParams.get("rsvp_status") ?? "");

  function apply() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (rsvp) params.set("rsvp_status", rsvp);
    if (orderId) params.set("order_id", orderId);
    params.set("page", "1");
    router.push(`/khach-hang?${params.toString()}`);
  }

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Tìm kiếm</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tên, SĐT, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && apply()}
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">RSVP</label>
          <select
            value={rsvp}
            onChange={(e) => setRsvp(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            {rsvpOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <Button onClick={apply}>Lọc</Button>
        </div>
      </div>
    </div>
  );
}
