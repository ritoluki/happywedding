import { createBrowserClient, createServerClient } from "@wedding-invitation/db";

/** Supabase client dùng anon key - đọc public data */
export function getSupabase() {
  return createBrowserClient();
}

/** Supabase server client (service role) - cho RSVP, view_count. Cần SUPABASE_SERVICE_ROLE_KEY */
export function getSupabaseServer() {
  return createServerClient();
}
