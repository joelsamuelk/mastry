import type { ReactNode } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient();
  let userName: string | null = null;

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userName = user?.user_metadata?.full_name ?? user?.email ?? null;
  }

  return <AppShell userName={userName}>{children}</AppShell>;
}
