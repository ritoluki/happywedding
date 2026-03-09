import Link from "next/link";
import { Button, Badge } from "@wedding-invitation/ui";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
interface OrderWithPackage {
  id: string;
  order_code: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  status: string;
  payment_status: string;
  packages?: { name: string } | null;
}

interface RecentOrdersTableProps {
  orders: OrderWithPackage[];
}

const statusLabels: Record<string, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  processing: "Đang xử lý",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const statusVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  confirmed: "secondary",
  processing: "default",
  completed: "default",
  cancelled: "destructive",
};

const paymentLabels: Record<string, string> = {
  unpaid: "Chưa thanh toán",
  pending: "Đang chờ",
  paid: "Đã thanh toán",
  refunded: "Hoàn tiền",
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold">Đơn hàng gần đây</h2>
        <p className="mt-4 text-sm text-muted-foreground">Chưa có đơn hàng nào.</p>
        <Link href="/don-hang" className="mt-4 inline-block">
          <Button size="sm">Xem đơn hàng</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Đơn hàng gần đây</h2>
        <Link href="/don-hang">
          <Button size="sm">Xem tất cả</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Mã đơn</th>
              <th className="px-4 py-3 text-left font-medium">Cô dâu & Chú rể</th>
              <th className="px-4 py-3 text-left font-medium">Ngày cưới</th>
              <th className="px-4 py-3 text-left font-medium">Gói</th>
              <th className="px-4 py-3 text-left font-medium">Thanh toán</th>
              <th className="px-4 py-3 text-left font-medium">Trạng thái</th>
              <th className="px-4 py-3 text-right font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                <td className="px-4 py-3 font-mono text-xs">{order.order_code}</td>
                <td className="px-4 py-3">
                  {order.groom_name} & {order.bride_name}
                </td>
                <td className="px-4 py-3">
                  {format(new Date(order.wedding_date), "dd/MM/yyyy", { locale: vi })}
                </td>
                <td className="px-4 py-3">{order.packages?.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <Badge variant={order.payment_status === "paid" ? "default" : "secondary"}>
                    {paymentLabels[order.payment_status] ?? order.payment_status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariants[order.status] ?? "outline"}>
                    {statusLabels[order.status] ?? order.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/don-hang/${order.id}`}>
                    <Button variant="ghost" size="sm">
                      Xem
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
