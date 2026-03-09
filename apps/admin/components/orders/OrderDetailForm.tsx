"use client";

import { useState } from "react";
import { Button, Input } from "@wedding-invitation/ui";
import {
  updateOrderStatus,
  updateOrderPaymentStatus,
  updateAdminNotes,
} from "@/actions/orders";
import type { OrderStatus, PaymentStatus } from "@wedding-invitation/db";

const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Chờ xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

const paymentOptions: { value: PaymentStatus; label: string }[] = [
  { value: "unpaid", label: "Chưa thanh toán" },
  { value: "pending", label: "Đang chờ" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "refunded", label: "Hoàn tiền" },
];

interface OrderDetailFormProps {
  orderId: string;
  currentStatus: OrderStatus;
  currentPaymentStatus: PaymentStatus;
  adminNotes: string;
}

export function OrderDetailForm({
  orderId,
  currentStatus,
  currentPaymentStatus,
  adminNotes,
}: OrderDetailFormProps) {
  const [status, setStatus] = useState(currentStatus);
  const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);
  const [notes, setNotes] = useState(adminNotes);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function handleStatusChange() {
    setSaving(true);
    setMessage(null);
    const result = await updateOrderStatus(orderId, status);
    setSaving(false);
    if (result.error) setMessage({ type: "error", text: result.error });
    else setMessage({ type: "success", text: "Đã cập nhật trạng thái" });
  }

  async function handlePaymentChange() {
    setSaving(true);
    setMessage(null);
    const result = await updateOrderPaymentStatus(orderId, paymentStatus);
    setSaving(false);
    if (result.error) setMessage({ type: "error", text: result.error });
    else setMessage({ type: "success", text: "Đã cập nhật thanh toán" });
  }

  async function handleNotesSave() {
    setSaving(true);
    setMessage(null);
    const result = await updateAdminNotes(orderId, notes);
    setSaving(false);
    if (result.error) setMessage({ type: "error", text: result.error });
    else setMessage({ type: "success", text: "Đã lưu ghi chú" });
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 font-semibold">Cập nhật đơn hàng</h2>
      {message && (
        <p
          className={`mb-4 text-sm ${
            message.type === "error" ? "text-destructive" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Button
            size="sm"
            className="mt-2"
            onClick={handleStatusChange}
            disabled={saving || status === currentStatus}
          >
            Cập nhật
          </Button>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Thanh toán</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {paymentOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Button
            size="sm"
            className="mt-2"
            onClick={handlePaymentChange}
            disabled={saving || paymentStatus === currentPaymentStatus}
          >
            Cập nhật
          </Button>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Ghi chú admin</label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ghi chú nội bộ..."
            className="mb-2"
          />
          <Button
            size="sm"
            onClick={handleNotesSave}
            disabled={saving || notes === adminNotes}
          >
            Lưu ghi chú
          </Button>
        </div>
      </div>
    </div>
  );
}
