import { createClient } from "./supabase/server";
import type { OrderStatus, PaymentStatus } from "@wedding-invitation/db";

export interface OrdersFilters {
  search?: string;
  status?: OrderStatus;
  payment_status?: PaymentStatus;
  package_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface OrdersResult {
  orders: Array<{
    id: string;
    order_code: string;
    groom_name: string;
    bride_name: string;
    wedding_date: string;
    customer_phone: string;
    status: OrderStatus;
    payment_status: PaymentStatus;
    total_amount: number | null;
    created_at: string;
    package_id: string | null;
    packages?: { name: string } | null;
  }>;
  total: number;
}

export async function getOrders(
  page = 1,
  pageSize = 10,
  filters: OrdersFilters = {}
): Promise<OrdersResult> {
  const supabase = await createClient();
  let query = supabase
    .from("orders")
    .select("*, packages(name)", { count: "exact" })
    .order("created_at", { ascending: false });

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.payment_status) {
    query = query.eq("payment_status", filters.payment_status);
  }
  if (filters.package_id) {
    query = query.eq("package_id", filters.package_id);
  }
  if (filters.date_from) {
    query = query.gte("created_at", filters.date_from);
  }
  if (filters.date_to) {
    query = query.lte("created_at", filters.date_to + "T23:59:59.999Z");
  }
  if (filters.search?.trim()) {
    const s = filters.search.trim();
    query = query.or(
      `order_code.ilike.%${s}%,groom_name.ilike.%${s}%,bride_name.ilike.%${s}%,customer_name.ilike.%${s}%,customer_phone.ilike.%${s}%`
    );
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await query.range(from, to);

  if (error) return { orders: [], total: 0 };

  return {
    orders: (data ?? []) as OrdersResult["orders"],
    total: count ?? 0,
  };
}

export async function getOrderById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, packages(*), templates(id, name, slug)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export async function getPackagesList() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("id, name")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}
