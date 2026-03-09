import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, packages(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (orders ?? []).map((o: Record<string, unknown>) => ({
    "Mã đơn": o.order_code,
    "Chú rể": o.groom_name,
    "Cô dâu": o.bride_name,
    "Ngày cưới": o.wedding_date,
    "Địa điểm": o.venue_name,
    "Khách hàng": o.customer_name,
    "SĐT": o.customer_phone,
    "Email": o.customer_email,
    "Gói": (o.packages as { name?: string })?.name ?? "",
    "Trạng thái": o.status,
    "Thanh toán": o.payment_status,
    "Tổng tiền": o.total_amount,
    "Ngày tạo": o.created_at,
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Đơn hàng");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="don-hang-${new Date().toISOString().slice(0, 10)}.xlsx"`,
    },
  });
}
