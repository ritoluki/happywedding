import { createClient } from "./supabase/server";

export interface GuestsFilters {
  order_id?: string;
  rsvp_status?: string;
  search?: string;
}

export async function getGuests(
  page = 1,
  pageSize = 20,
  filters: GuestsFilters = {}
) {
  const supabase = await createClient();
  let query = supabase
    .from("guests")
    .select("*, orders(groom_name, bride_name, order_code), invitations(url_slug, type)", {
      count: "exact",
    })
    .order("created_at", { ascending: false });

  if (filters.order_id) {
    query = query.eq("order_id", filters.order_id);
  }
  if (filters.rsvp_status) {
    query = query.eq("rsvp_status", filters.rsvp_status);
  }
  if (filters.search?.trim()) {
    const s = filters.search.trim();
    query = query.or(`name.ilike.%${s}%,phone.ilike.%${s}%,email.ilike.%${s}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await query.range(from, to);

  if (error) return { guests: [], total: 0 };
  return { guests: data ?? [], total: count ?? 0 };
}

export async function getGuestsByOrderId(orderId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*, invitations(url_slug, guest_name)")
    .eq("order_id", orderId)
    .order("responded_at", { ascending: false, nullsFirst: false });
  if (error) return [];
  return data ?? [];
}
