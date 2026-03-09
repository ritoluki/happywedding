import { createClient } from "./supabase/server";

export const TEMPLATE_CATEGORIES = [
  "hiện đại",
  "cổ điển",
  "tối giản",
  "boho",
  "luxury",
] as const;

export async function getTemplates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    thumbnail_url: string | null;
    category: string | null;
    is_active: boolean;
    is_featured: boolean;
    sort_order: number;
    price_adjustment: number;
    created_at: string;
  }>;
}

export async function getTemplateById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Record<string, unknown>;
}

export { slugify } from "./slugify";
