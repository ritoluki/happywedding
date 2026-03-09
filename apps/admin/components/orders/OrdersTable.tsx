"use client";

import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Button, Badge } from "@wedding-invitation/ui";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Eye, FileText } from "lucide-react";
import type { OrderStatus, PaymentStatus } from "@wedding-invitation/db";

interface OrderRow {
  id: string;
  order_code: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  total_amount: number | null;
  created_at: string;
  packages?: { name: string } | null;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  processing: "Đang xử lý",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const statusVariants: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  confirmed: "secondary",
  processing: "default",
  completed: "default",
  cancelled: "destructive",
};

const paymentLabels: Record<PaymentStatus, string> = {
  unpaid: "Chưa thanh toán",
  pending: "Đang chờ",
  paid: "Đã thanh toán",
  refunded: "Hoàn tiền",
};

const columnHelper = createColumnHelper<OrderRow>();

const columns = [
  columnHelper.accessor("order_code", {
    header: "Mã đơn",
    cell: (info) => (
      <span className="font-mono text-xs">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor((r) => `${r.groom_name} & ${r.bride_name}`, {
    id: "couple",
    header: "Cô dâu & Chú rể",
  }),
  columnHelper.accessor("wedding_date", {
    header: "Ngày cưới",
    cell: (info) =>
      format(new Date(info.getValue()), "dd/MM/yyyy", { locale: vi }),
  }),
  columnHelper.accessor((r) => r.packages?.name ?? "—", {
    id: "package",
    header: "Gói",
  }),
  columnHelper.accessor("payment_status", {
    header: "Thanh toán",
    cell: (info) => (
      <Badge
        variant={
          info.getValue() === "paid" ? "default" : "secondary"
        }
      >
        {paymentLabels[info.getValue() as PaymentStatus]}
      </Badge>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Trạng thái",
    cell: (info) => (
      <Badge variant={statusVariants[info.getValue() as OrderStatus]}>
        {statusLabels[info.getValue() as OrderStatus]}
      </Badge>
    ),
  }),
  columnHelper.accessor("created_at", {
    header: "Ngày tạo",
    cell: (info) =>
      format(new Date(info.getValue()), "dd/MM/yyyy HH:mm", { locale: vi }),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex gap-1">
        <Link href={`/don-hang/${row.original.id}`}>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
        <Link href={`/don-hang/${row.original.id}?tab=invitation`}>
          <Button variant="ghost" size="sm">
            <FileText className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    ),
  }),
];

interface OrdersTableProps {
  orders: OrderRow[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  Không có đơn hàng nào
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
