import { Suspense } from "react";
import { getOrders, getPackagesList } from "@/lib/orders";
import type { OrderStatus, PaymentStatus } from "@wedding-invitation/db";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { OrdersFilters } from "@/components/orders/OrdersFilters";
import { OrdersPagination } from "@/components/orders/OrdersPagination";

const PAGE_SIZE = 10;

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function DonHangPage({ searchParams }: PageProps) {
  const params = searchParams;
  const page = Math.max(1, parseInt(String(params.page || "1"), 10));
  const search = String(params.search || "");
  const status = String(params.status || "");
  const payment_status = String(params.payment_status || "");
  const package_id = String(params.package_id || "");

  const [ordersResult, packages] = await Promise.all([
    getOrders(page, PAGE_SIZE, {
      search: search || undefined,
      status: (status || undefined) as OrderStatus | undefined,
      payment_status: (payment_status || undefined) as PaymentStatus | undefined,
      package_id: package_id || undefined,
    }),
    getPackagesList(),
  ]);

  const searchParamsForPagination = new URLSearchParams();
  if (search) searchParamsForPagination.set("search", search);
  if (status) searchParamsForPagination.set("status", status);
  if (payment_status) searchParamsForPagination.set("payment_status", payment_status);
  if (package_id) searchParamsForPagination.set("package_id", package_id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Đơn hàng</h1>
        <p className="mt-1 text-muted-foreground">
          Quản lý đơn hàng
        </p>
      </div>

      <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-muted" />}>
        <OrdersFilters packages={packages} />
      </Suspense>

      <OrdersTable orders={ordersResult.orders} />

      <OrdersPagination
        page={page}
        pageSize={PAGE_SIZE}
        total={ordersResult.total}
        searchParams={searchParamsForPagination}
      />
    </div>
  );
}
