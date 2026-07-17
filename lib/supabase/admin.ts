import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/config";

export function createSupabaseAdminClient() {
  const env = getSupabaseEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!env || !serviceRoleKey) {
    return null;
  }

  return createClient(env.url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
