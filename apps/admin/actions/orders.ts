"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { OrderStatus, PaymentStatus } from "@wedding-invitation/db";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) return { error: error.message };
  revalidatePath("/don-hang");
  revalidatePath(`/don-hang/${orderId}`);
  revalidatePath("/");
  return { error: null };
}

export async function updateOrderPaymentStatus(
  orderId: string,
  payment_status: PaymentStatus
) {
  const supabase = await createClient();
  const updates: Record<string, unknown> = { payment_status };
  if (payment_status === "paid") {
    updates.paid_at = new Date().toISOString();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("orders")
    .update(updates)
    .eq("id", orderId);

  if (error) return { error: error.message };
  revalidatePath("/don-hang");
  revalidatePath(`/don-hang/${orderId}`);
  revalidatePath("/");
  return { error: null };
}

export async function updateAdminNotes(orderId: string, admin_notes: string) {
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("orders")
    .update({ admin_notes })
    .eq("id", orderId);

  if (error) return { error: error.message };
  revalidatePath(`/don-hang/${orderId}`);
  return { error: null };
}
