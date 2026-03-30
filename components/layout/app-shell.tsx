"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand/brand";
import {
  adminNavigation,
  mentorNavigation,
  type NavItem,
  userNavigation,
} from "@/config/navigation";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShellVariant = "user" | "mentor" | "admin";

const config: Record<
  ShellVariant,
  {
    nav: NavItem[];
    sidebarCta: string;
    sidebarHref: string;
  }
> = {
  user: {
    nav: userNavigation,
    sidebarCta: "Upgrade",
    sidebarHref: "/profile",
  },
  mentor: {
    nav: mentorNavigation,
    sidebarCta: "Invite Member",
    sidebarHref: "/mentor/profile",
  },
  admin: {
    nav: adminNavigation,
    sidebarCta: "Review Mentors",
    sidebarHref: "/admin/mentors",
  },
};

interface AppShellProps {
  variant: ShellVariant;
  children: ReactNode;
}

export function AppShell({ variant, children }: AppShellProps) {
  const pathname = usePathname();
  const shell = config[variant];

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-8 px-4 pb-28 pt-4 md:px-6 md:pb-10 md:pt-6">
        <aside className="hidden w-[248px] shrink-0 flex-col justify-between rounded-[36px] bg-white/75 p-5 shadow-[0_12px_40px_rgba(45,51,56,0.04)] backdrop-blur-xl lg:flex">
          <div className="space-y-10">
            <Brand />
            <nav className="space-y-2">
              {shell.nav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-[var(--surface-low)] text-[var(--accent)]"
                        : "text-[var(--ink-muted)] hover:bg-[var(--surface-low)] hover:text-[var(--ink)]",
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="space-y-5">
            <Link href={shell.sidebarHref} className={buttonStyles({ variant: "primary" })}>
              {shell.sidebarCta}
            </Link>
            <div className="space-y-3 text-sm text-[var(--ink-muted)]">
              <Link href="/" className="block">
                Help Center
              </Link>
              <Link href="/auth/signout" className="block">
                Sign Out
              </Link>
            </div>
          </div>
        </aside>
        <div className="flex min-h-full min-w-0 flex-1 flex-col gap-6">
          <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <Brand compact />
            </div>
            <div className="hidden flex-1 items-center lg:flex">
              <div className="flex h-12 w-full max-w-md items-center gap-3 rounded-full bg-white px-4 shadow-[0_12px_32px_rgba(45,51,56,0.06)]">
                <Search className="size-4 text-[var(--muted)]" />
                <span className="text-sm text-[var(--muted)]">Search Mastry OS...</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full bg-white text-[var(--ink)] shadow-[0_12px_32px_rgba(45,51,56,0.06)]"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
              </button>
              <div className="flex size-11 items-center justify-center rounded-full bg-[linear-gradient(145deg,#2d3338_0%,#4e45e4_100%)] text-sm font-bold text-white">
                MA
              </div>
            </div>
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <nav className="glass-panel fixed inset-x-4 bottom-4 z-30 flex items-center justify-between px-2 py-2 lg:hidden">
        {shell.nav.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[18px] px-2 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em]",
                isActive ? "text-[var(--accent)]" : "text-[var(--muted)]",
              )}
            >
              <Icon className="size-4" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
