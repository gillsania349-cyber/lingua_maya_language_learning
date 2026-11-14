// Server-only: never import this from a "use client" file.
import { createClient } from "@supabase/supabase-js"

/** Server-only Supabase client with the service role key (bypasses RLS). */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}
