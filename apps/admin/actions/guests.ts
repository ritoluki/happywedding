"use server";

import { createClient } from "@/lib/supabase/server";

export async function createGeneralInvitation(
  orderId: string,
  templateId: string,
  urlSlug: string
) {
  const supabase = await createClient();
  const { error } = await (supabase as any).from("invitations").insert({
    order_id: orderId,
    template_id: templateId,
    type: "general",
    url_slug: urlSlug,
    guest_name: null,
  });
  return { error: error?.message };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function importGuestsFromExcel(
  orderId: string,
  templateId: string,
  fileBase64: string
): Promise<{ success: boolean; created: number; error?: string }> {
  const XLSX = (await import("xlsx")).default;
  let buf: Buffer;
  try {
    buf = Buffer.from(fileBase64, "base64");
  } catch {
    return { success: false, created: 0, error: "File không hợp lệ" };
  }

  const workbook = XLSX.read(buf, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

  const guests: Array<{ name: string; phone?: string; email?: string }> = [];
  for (const row of rows) {
    const name =
      row["Họ tên"] ?? row["Tên"] ?? row["name"] ?? row["Name"] ?? row["guest_name"] ?? "";
    if (!String(name).trim()) continue;
    const phone = row["SĐT"] ?? row["Phone"] ?? row["phone"] ?? "";
    const email = row["Email"] ?? row["email"] ?? "";
    guests.push({ name: String(name).trim(), phone: String(phone).trim() || undefined, email: String(email).trim() || undefined });
  }

  if (guests.length === 0) {
    return { success: false, created: 0, error: "Không tìm thấy dữ liệu khách. Cột: Họ tên hoặc Tên hoặc name" };
  }

  const supabase = await createClient();
  let created = 0;
  const usedSlugs = new Set<string>();

  for (const g of guests) {
    let urlSlug = slugify(g.name) + "-" + Date.now().toString(36);
    while (usedSlugs.has(urlSlug)) {
      urlSlug = slugify(g.name) + "-" + Math.random().toString(36).slice(2, 8);
    }
    usedSlugs.add(urlSlug);

    const { data: inv } = await (supabase as any)
      .from("invitations")
      .insert({
        order_id: orderId,
        template_id: templateId,
        type: "personal",
        url_slug: urlSlug,
        guest_name: g.name,
      })
      .select("id")
      .single();

    if (!inv?.id) continue;

    await (supabase as any).from("guests").insert({
      invitation_id: inv.id,
      order_id: orderId,
      name: g.name,
      phone: g.phone || null,
      email: g.email || null,
    });
    created++;
  }

  return { success: true, created };
}
