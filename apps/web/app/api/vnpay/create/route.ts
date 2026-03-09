import { NextRequest, NextResponse } from "next/server";
import { createVnpayPaymentUrl } from "@/lib/vnpay";
import { getSupabaseServer } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const tmnCode = process.env.VNPAY_TMN_CODE;
  const hashSecret = process.env.VNPAY_HASH_SECRET;
  if (!tmnCode || !hashSecret) {
    return NextResponse.json({ error: "VNPay chưa được cấu hình" }, { status: 500 });
  }

  let body: { orderId: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { orderId } = body;
  if (!orderId) {
    return NextResponse.json({ error: "Thiếu orderId" }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { data: order, error } = await (supabase as any)
    .from("orders")
    .select("id, order_code, total_amount, groom_name, bride_name")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Đơn hàng không tồn tại" }, { status: 404 });
  }

  const amount = Number(order.total_amount ?? 0);
  if (amount <= 0) {
    return NextResponse.json({ error: "Đơn hàng không có số tiền" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL ?? request.nextUrl.origin;
  const returnUrl = `${baseUrl}/dat-hang/thanh-toan/return`;
  const ipnUrl = process.env.VNPAY_IPN_URL; // Optional: URL nhận callback từ VNPay (phải public)

  const txnRef = `ORD-${order.id}-${Date.now()}`;
  const orderInfo = `ORD:${order.id}`;

  const paymentUrl = createVnpayPaymentUrl({
    tmnCode,
    hashSecret,
    amount,
    txnRef,
    orderInfo,
    returnUrl,
    ipnUrl,
  });

  return NextResponse.json({ paymentUrl });
}
