"use server";

import { getSupabase, getSupabaseServer } from "@/lib/supabase";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type CreateOrderInput = {
  package_id: string;
  template_id: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  wedding_time?: string;
  venue_name?: string;
  venue_address?: string;
  venue_maps_url?: string;
  story?: string;
  hashtag?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_zalo?: string;
};

export async function createOrder(
  input: CreateOrderInput
): Promise<{ success: true; orderId: string; urlSlug: string } | { success: false; error: string }> {
  let supabase;
  try {
    supabase = getSupabaseServer();
  } catch {
    return { success: false, error: "Cấu hình server chưa đúng. Vui lòng liên hệ admin." };
  }

  // Lấy giá gói
  const { data: pkg, error: pkgErr } = await (supabase as any)
    .from("packages")
    .select("id, price")
    .eq("id", input.package_id)
    .single();
  if (pkgErr || !pkg) return { success: false, error: "Gói dịch vụ không hợp lệ." };

  const totalAmount = Number(pkg.price);

  const orderRow = {
    groom_name: input.groom_name,
    bride_name: input.bride_name,
    wedding_date: input.wedding_date,
    wedding_time: input.wedding_time || null,
    venue_name: input.venue_name || null,
    venue_address: input.venue_address || null,
    venue_maps_url: input.venue_maps_url || null,
    story: input.story || null,
    hashtag: input.hashtag || null,
    customer_name: input.customer_name,
    customer_phone: input.customer_phone,
    customer_email: input.customer_email || null,
    customer_zalo: input.customer_zalo || null,
    package_id: input.package_id,
    template_id: input.template_id,
    total_amount: totalAmount,
  };

  const { data: order, error: orderErr } = await (supabase as any)
    .from("orders")
    .insert(orderRow)
    .select("id, order_code")
    .single();
  if (orderErr || !order) {
    return { success: false, error: orderErr?.message ?? "Không thể tạo đơn hàng." };
  }

  const baseSlug =
    slugify(input.groom_name) + "-" + slugify(input.bride_name) + "-" + input.wedding_date.replace(/-/g, "");
  let urlSlug = baseSlug;
  for (let i = 0; i < 10; i++) {
    const { data: existing } = await supabase.from("invitations").select("id").eq("url_slug", urlSlug).maybeSingle();
    if (!existing) break;
    urlSlug = baseSlug + "-" + Math.random().toString(36).slice(2, 6);
  }

  const { error: invErr } = await (supabase as any).from("invitations").insert({
    order_id: order.id,
    template_id: input.template_id,
    type: "general",
    url_slug: urlSlug,
    guest_name: null,
  });
  if (invErr) {
    return { success: false, error: "Tạo thiệp thất bại: " + invErr.message };
  }

  return { success: true, orderId: order.id, urlSlug };
}
