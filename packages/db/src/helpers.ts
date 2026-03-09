import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import type { Invitation, Order } from "./database.types";

/** Lấy invitation kèm order và template theo url_slug */
export async function getInvitationBySlug(
  client: SupabaseClient<Database>,
  slug: string
): Promise<{
  invitation: Invitation;
  order: Order;
  template: Database["public"]["Tables"]["templates"]["Row"] | null;
  package: Database["public"]["Tables"]["packages"]["Row"] | null;
} | null> {
  const { data: invitation, error: invError } = await client
    .from("invitations")
    .select("*")
    .eq("url_slug", slug)
    .eq("is_active", true)
    .single();

  if (invError || !invitation) return null;

  const invitationRow = invitation as Invitation;

  const { data: order, error: orderError } = await client
    .from("orders")
    .select("*")
    .eq("id", invitationRow.order_id)
    .single();

  if (orderError || !order) return null;

  const orderRow = order as Order;

  let template: Database["public"]["Tables"]["templates"]["Row"] | null = null;
  if (invitationRow.template_id) {
    const { data: t } = await client
      .from("templates")
      .select("*")
      .eq("id", invitationRow.template_id)
      .single();
    template = t;
  }

  let pkg: Database["public"]["Tables"]["packages"]["Row"] | null = null;
  if (orderRow.package_id) {
    const { data: p } = await client
      .from("packages")
      .select("*")
      .eq("id", orderRow.package_id)
      .single();
    pkg = p;
  }

  return { invitation: invitationRow, order: orderRow, template: template ?? null, package: pkg };
}

/** Lấy order theo ID kèm package và template */
export async function getOrderById(
  client: SupabaseClient<Database>,
  orderId: string
): Promise<{
  order: Order;
  package: Database["public"]["Tables"]["packages"]["Row"] | null;
  template: Database["public"]["Tables"]["templates"]["Row"] | null;
} | null> {
  const { data: order, error: orderError } = await client
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) return null;

  const orderRow = order as Order;

  let pkg: Database["public"]["Tables"]["packages"]["Row"] | null = null;
  if (orderRow.package_id) {
    const { data: p } = await client
      .from("packages")
      .select("*")
      .eq("id", orderRow.package_id)
      .single();
    pkg = p;
  }

  let template: Database["public"]["Tables"]["templates"]["Row"] | null = null;
  if (orderRow.template_id) {
    const { data: t } = await client
      .from("templates")
      .select("*")
      .eq("id", orderRow.template_id)
      .single();
    template = t;
  }

  return { order: orderRow, package: pkg, template: template ?? null };
}

/** Lấy danh sách template active cho landing */
export async function getActiveTemplates(
  client: Parameters<typeof getInvitationBySlug>[0],
  limit = 8
): Promise<Database["public"]["Tables"]["templates"]["Row"][]> {
  const { data, error } = await client
    .from("templates")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as Database["public"]["Tables"]["templates"]["Row"][];
}

/** Lấy danh sách packages cho landing */
export async function getPackages(
  client: Parameters<typeof getInvitationBySlug>[0]
): Promise<Database["public"]["Tables"]["packages"]["Row"][]> {
  const { data, error } = await client
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (error) return [];
  return (data ?? []) as Database["public"]["Tables"]["packages"]["Row"][];
}

/** Lấy CMS content theo key */
export async function getCmsByKey(
  client: Parameters<typeof getInvitationBySlug>[0],
  key: string
): Promise<string | null> {
  const { data, error } = await client
    .from("cms_content")
    .select("value")
    .eq("key", key)
    .single();
  if (error || !data) return null;
  return (data as { value: string | null }).value;
}

/** Tăng view_count và last_viewed_at cho invitation (cần service role) */
export async function incrementInvitationView(
  client: SupabaseClient<Database>,
  invitationId: string
): Promise<void> {
  const { data } = await client
    .from("invitations")
    .select("view_count")
    .eq("id", invitationId)
    .single();
  const current = (data as { view_count?: number } | null)?.view_count ?? 0;
  await (client as any)
    .from("invitations")
    .update({ view_count: current + 1, last_viewed_at: new Date().toISOString() })
    .eq("id", invitationId);
}
