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

  const currentNav = appNavigation.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const routeTitle = currentNav?.label ?? "Dashboard";

  async function handleSignOut() {
    await fetch("/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-[var(--surface)]">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-[62px] items-center justify-between bg-[var(--surface)]/80 px-[34px] backdrop-blur-[12px]">
          <Link href="/dashboard" className="lg:hidden">
            <Brand variant="mark" size="sm" />
          </Link>
          <span className="hidden text-[15px] font-semibold tracking-[-0.01em] lg:block">
            {routeTitle}
          </span>
          <div className="flex items-center gap-[14px]">
            <span className="font-mono hidden text-[12px] text-[var(--muted)] sm:block">
              &#8984;K
            </span>
            {userName && (
              <span className="hidden text-[13px] font-medium text-[var(--muted)] sm:block">
                {userName}
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="text-[13px] text-[var(--muted)] transition hover:text-[var(--ink)]"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-[34px] pb-24 lg:pb-10">
          <div className="mx-auto w-full max-w-[1180px]">{children}</div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white/80 px-2 py-2 backdrop-blur-xl lg:hidden">
        {appNavigation.slice(0, 5).map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[10px] font-semibold transition",
                isActive ? "text-[var(--accent)]" : "text-[var(--muted)]",
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
