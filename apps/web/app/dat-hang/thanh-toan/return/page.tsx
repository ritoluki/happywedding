import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@wedding-invitation/ui";
import { verifyVnpayReturn } from "@/lib/vnpay";
import { getSupabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function VnpayReturnPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const hashSecret = process.env.VNPAY_HASH_SECRET;

  if (!hashSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-red-600">Lỗi cấu hình</h1>
          <p className="mt-2 text-gray-600">VNPay chưa được cấu hình.</p>
          <Button asChild className="mt-4">
            <Link href="/">Về trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isValid = verifyVnpayReturn(params, hashSecret);
  const responseCode = params.vnp_ResponseCode;
  const txnRef = params.vnp_TxnRef;
  const orderId = params.vnp_OrderInfo?.match(/^ORD:([a-f0-9-]+)$/i)?.[1];

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl font-bold text-red-600">Giao dịch không hợp lệ</h1>
          <p className="mt-2 text-gray-600">Chữ ký xác thực không đúng. Vui lòng thử lại.</p>
          <Button asChild className="mt-4">
            <Link href="/dat-hang">Quay lại đặt hàng</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (responseCode === "00" && orderId) {
    // Success - cập nhật payment_status
    const supabase = getSupabaseServer();
    const { data: order } = await (supabase as any)
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .single();
    if (order) {
      await (supabase as any)
        .from("orders")
        .update({
          payment_status: "paid",
          payment_method: "vnpay",
          payment_transaction_id: txnRef,
          paid_at: new Date().toISOString(),
        })
        .eq("id", order.id);
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-green-700">Thanh toán thành công!</h1>
          <p className="mt-2 text-gray-600">
            Cảm ơn bạn. Đơn hàng của bạn đã được xác nhận thanh toán.
          </p>
          <p className="mt-1 text-sm text-gray-500">Mã giao dịch: {txnRef}</p>
          <div className="mt-6 flex gap-4 justify-center">
            <Button asChild>
              <Link href="/">Về trang chủ</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-xl font-bold text-amber-700">Thanh toán chưa hoàn tất</h1>
        <p className="mt-2 text-gray-600">
          Bạn đã hủy hoặc giao dịch không thành công. Mã: {responseCode}
        </p>
        <Button asChild className="mt-4">
          <Link href="/dat-hang">Thử thanh toán lại</Link>
        </Button>
      </div>
    </div>
  );
}
