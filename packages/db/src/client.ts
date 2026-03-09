import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export function createSupabaseClient(
  url: string,
  key: string,
  options?: { auth?: { persistSession?: boolean } }
): SupabaseClient<Database> {
  return createClient<Database>(url, key, options);
}

/** Client dùng anon key - cho client-side, tuân thủ RLS */
export function createBrowserClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createSupabaseClient(url, key);
}

/** Client dùng service_role key - bypass RLS, chỉ dùng server-side */
export function createServerClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createSupabaseClient(url, key);
}
