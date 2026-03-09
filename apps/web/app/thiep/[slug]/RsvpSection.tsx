"use client";

import { useState } from "react";
import { Button } from "@wedding-invitation/ui";
import { submitRsvp } from "./actions";

type Status = "idle" | "loading" | "success" | "error";

export function RsvpSection({
  invitationId,
  orderId,
  guestName,
}: {
  invitationId: string;
  orderId: string;
  guestName: string | null;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [rsvpStatus, setRsvpStatus] = useState<"attending" | "not_attending" | "maybe">(
    "attending"
  );
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.target as HTMLFormElement);
    const result = await submitRsvp(invitationId, orderId, {
      status: formData.get("status") as "attending" | "not_attending" | "maybe",
      guest_count: Number(formData.get("guest_count")) || 1,
      note: (formData.get("note") as string) || null,
    });
    if (result?.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="py-12 px-4 bg-rose-50">
        <div className="mx-auto max-w-md text-center">
          <p className="text-lg font-medium text-rose-800">
            Cảm ơn bạn đã xác nhận! Chúng tôi rất mong được đón tiếp bạn.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50 border-t">
      <div className="mx-auto max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
          Xác nhận tham dự
        </h3>
        {guestName && (
          <p className="text-center text-gray-600 mb-4">
            Kính gửi: <strong>{guestName}</strong>
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bạn có thể tham dự không?
            </label>
            <div className="flex gap-4">
              {[
                { value: "attending", label: "Sẽ tham dự" },
                { value: "not_attending", label: "Không tham dự" },
                { value: "maybe", label: "Chưa chắc chắn" },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={rsvpStatus === value}
                    onChange={() => setRsvpStatus(value as typeof rsvpStatus)}
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số người tham dự
            </label>
            <input
              type="number"
              name="guest_count"
              min={1}
              max={20}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value) || 1)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú (tùy chọn)
            </label>
            <textarea
              name="note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="Địa chỉ, dị ứng, yêu cầu đặc biệt..."
            />
          </div>
          {status === "error" && (
            <p className="text-sm text-red-600">Có lỗi xảy ra, vui lòng thử lại.</p>
          )}
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {status === "loading" ? "Đang gửi..." : "Gửi xác nhận"}
          </Button>
        </form>
      </div>
    </section>
  );
}
