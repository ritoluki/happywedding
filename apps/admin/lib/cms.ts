import { createClient } from "./supabase/server";

export async function getCmsContent() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cms_content")
    .select("key, value, type, label")
    .order("key");
  if (error) return [];
  return (data ?? []) as Array<{ key: string; value: string | null; type: string; label: string | null }>;
}

export async function updateCmsContent(key: string, value: string) {
  const supabase = await createClient();
  const { error } = await (supabase as any)
    .from("cms_content")
    .update({ value, updated_at: new Date().toISOString() })
    .eq("key", key);
  return { error: error?.message };
}
