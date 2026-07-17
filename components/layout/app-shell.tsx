"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { Brand } from "@/components/brand/brand";
import { appNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  userName?: string | null;
}

export function AppShell({ children, userName }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 lg:justify-end">
          <Link href="/dashboard" className="lg:hidden">
            <Brand variant="mark" size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            {userName && (
              <span className="hidden text-sm font-medium text-[var(--ink-muted)] sm:block">
                {userName}
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface-low)] hover:text-[var(--ink)]"
              title="Sign out"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-6 pb-24 lg:pb-10">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white/80 px-2 py-2 backdrop-blur-xl lg:hidden">
        {appNavigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] font-semibold transition",
                isActive
                  ? "text-[var(--ink)]"
                  : "text-[var(--muted)]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
