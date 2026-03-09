"use server";

import { getSupabase } from "@/lib/supabase";

type RsvpStatus = "attending" | "not_attending" | "maybe";

export async function submitRsvp(
  invitationId: string,
  orderId: string,
  data: { status: RsvpStatus; guest_count: number; note: string | null }
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabase();

  // Tìm guest theo invitation_id (thiệp riêng đã có guest)
  const { data: existingGuest } = await supabase
    .from("guests")
    .select("id")
    .eq("invitation_id", invitationId)
    .limit(1)
    .maybeSingle();

  if (existingGuest) {
    const { error } = await (supabase as any)
      .from("guests")
      .update({
        rsvp_status: data.status,
        rsvp_note: data.note,
        guest_count: data.guest_count,
        responded_at: new Date().toISOString(),
      })
      .eq("invitation_id", invitationId);
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  // Thiệp chung: tạo guest mới
  const { data: inv } = await supabase
    .from("invitations")
    .select("guest_name")
    .eq("id", invitationId)
    .single();
  const guestName = (inv as { guest_name?: string } | null)?.guest_name ?? "Khách";

  const { error } = await (supabase as any).from("guests").insert({
    invitation_id: invitationId,
    order_id: orderId,
    name: guestName,
    rsvp_status: data.status,
    rsvp_note: data.note,
    guest_count: data.guest_count,
    responded_at: new Date().toISOString(),
  });
  if (error) return { success: false, error: error.message };
  return { success: true };
}
