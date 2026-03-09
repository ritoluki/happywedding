import { createClient } from "./supabase/server";
import {
  startOfDay,
  startOfMonth,
  endOfMonth,
  subMonths,
  format,
} from "date-fns";
import type { OrderStatus, PackageType } from "@wedding-invitation/db";

export interface DashboardStats {
  ordersToday: number;
  revenueThisMonth: number;
  ordersProcessing: number;
  totalViews: number;
}

export interface RevenueByMonth {
  month: string;
  revenue: number;
}

export interface OrdersByPackage {
  name: string;
  value: number;
}

export interface OrdersByStatus {
  status: string;
  count: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  const today = startOfDay(new Date()).toISOString();
  const tomorrow = startOfDay(new Date(Date.now() + 86400000)).toISOString();
  const monthStart = startOfMonth(new Date()).toISOString();
  const monthEnd = endOfMonth(new Date()).toISOString();

  const [ordersTodayRes, revenueRes, ordersProcessingRes, viewsRes] =
    await Promise.all([
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .gte("created_at", today)
        .lt("created_at", tomorrow),
      supabase
        .from("orders")
        .select("total_amount")
        .eq("payment_status", "paid")
        .gte("created_at", monthStart)
        .lte("created_at", monthEnd),
      supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .in("status", ["pending", "confirmed", "processing"]),
      supabase.from("invitations").select("view_count"),
    ]);

  const ordersToday = ordersTodayRes.count ?? 0;
  const revenueThisMonth =
    revenueRes.data?.reduce(
      (sum, o) => sum + (Number((o as { total_amount?: number }).total_amount) || 0),
      0
    ) ?? 0;
  const ordersProcessing = ordersProcessingRes.count ?? 0;
  const totalViews =
    viewsRes.data?.reduce(
      (sum, i) => sum + ((i as { view_count?: number }).view_count || 0),
      0
    ) ?? 0;

  return {
    ordersToday,
    revenueThisMonth,
    ordersProcessing,
    totalViews,
  };
}

export async function getRevenueByMonth(): Promise<RevenueByMonth[]> {
  const supabase = await createClient();
  const months: RevenueByMonth[] = [];
  const now = new Date();

  for (let i = 11; i >= 0; i--) {
    const d = subMonths(now, i);
    const start = startOfMonth(d).toISOString();
    const end = endOfMonth(d).toISOString();

    const { data } = await supabase
      .from("orders")
      .select("total_amount")
      .eq("payment_status", "paid")
      .gte("created_at", start)
      .lte("created_at", end);

    const revenue =
      data?.reduce(
        (sum, o) =>
          sum + (Number((o as { total_amount?: number }).total_amount) || 0),
        0
      ) ?? 0;
    months.push({
      month: format(d, "MM/yyyy"),
      revenue,
    });
  }

  return months;
}

export async function getOrdersByPackage(): Promise<OrdersByPackage[]> {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("package_id");
  const { data: packages } = await supabase.from("packages").select("id, name");

  const pkgMap = new Map(
    (packages ?? []).map((p: { id: string; name: string }) => [p.id, p.name])
  );
  const countByPkg = new Map<string, number>();

  for (const o of orders ?? []) {
    const row = o as { package_id?: string };
    const name = row.package_id
      ? pkgMap.get(row.package_id) ?? "Chưa chọn"
      : "Chưa chọn";
    countByPkg.set(name, (countByPkg.get(name) ?? 0) + 1);
  }

  return Array.from(countByPkg.entries()).map(([name, value]) => ({
    name,
    value,
  }));
}

export async function getOrdersByStatus(): Promise<OrdersByStatus[]> {
  const supabase = await createClient();
  const { data } = await supabase.from("orders").select("status");

  const statusLabels: Record<OrderStatus, string> = {
    pending: "Chờ xử lý",
    confirmed: "Đã xác nhận",
    processing: "Đang xử lý",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };

  const countByStatus = new Map<string, number>();
  for (const o of data ?? []) {
    const row = o as { status?: OrderStatus };
    const status = row.status ?? "pending";
    const label = statusLabels[status];
    countByStatus.set(label, (countByStatus.get(label) ?? 0) + 1);
  }

  return Array.from(countByStatus.entries()).map(([status, count]) => ({
    status,
    count,
  }));
}

export async function getRecentOrders(limit = 10) {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      packages (name)
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return orders ?? [];
}
