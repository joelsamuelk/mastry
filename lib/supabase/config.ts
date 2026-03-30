interface SupabaseEnv {
  url: string;
  anonKey: string;
}

const PLACEHOLDER_PREFIXES = [
  "your_supabase_project_url",
  "your_supabase_anon_key",
  "your_supabase_service_role_key",
];

function isPlaceholder(value?: string | null) {
  if (!value) {
    return true;
  }

  return PLACEHOLDER_PREFIXES.some((placeholder) => value.includes(placeholder));
}

export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (isPlaceholder(url) || isPlaceholder(anonKey)) {
    return null;
  }

  return {
    url: url!,
    anonKey: anonKey!,
  };
}

export function isSupabaseConfigured() {
  return getSupabaseEnv() !== null;
}
