import { createClient } from "./supabase/server";

export async function getInvitationsByOrderId(orderId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });
  if (error) return [];
  return data ?? [];
}
