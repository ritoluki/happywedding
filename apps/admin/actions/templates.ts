"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTemplate(formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!name || !slug) return { error: "Tên và slug không được để trống" };

  const row = {
    name,
    slug,
    description: String(formData.get("description") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    html_content: String(formData.get("html_content") ?? "").trim() || null,
    css_content: String(formData.get("css_content") ?? "").trim() || null,
    js_content: String(formData.get("js_content") ?? "").trim() || null,
    thumbnail_url: String(formData.get("thumbnail_url") ?? "").trim() || null,
    price_adjustment: Number(formData.get("price_adjustment") ?? 0),
    is_active: formData.get("is_active") === "on",
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  const { error } = await (supabase as any).from("templates").insert(row);
  if (error) return { error: error.message };
  revalidatePath("/template");
  revalidatePath("/");
  return { error: null };
}

export async function updateTemplate(id: string, formData: FormData) {
  const supabase = await createClient();
  const name = String(formData.get("name") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!name || !slug) return { error: "Tên và slug không được để trống" };

  const row = {
    name,
    slug,
    description: String(formData.get("description") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    html_content: String(formData.get("html_content") ?? "").trim() || null,
    css_content: String(formData.get("css_content") ?? "").trim() || null,
    js_content: String(formData.get("js_content") ?? "").trim() || null,
    thumbnail_url: String(formData.get("thumbnail_url") ?? "").trim() || null,
    price_adjustment: Number(formData.get("price_adjustment") ?? 0),
    is_active: formData.get("is_active") === "on",
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
    updated_at: new Date().toISOString(),
  };

  const { error } = await (supabase as any)
    .from("templates")
    .update(row)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/template");
  revalidatePath(`/template/${id}`);
  revalidatePath("/");
  return { error: null };
}

export async function toggleTemplateActive(id: string, isActive: boolean) {
  const supabase = await createClient();
  const { error } = await (supabase as any)
    .from("templates")
    .update({ is_active: isActive })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/template");
  revalidatePath(`/template/${id}`);
  revalidatePath("/");
  return { error: null };
}
