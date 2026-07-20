"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand/brand";
import { appNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[236px] flex-shrink-0 flex-col bg-[var(--dark-surface)] p-[22px_14px] lg:flex">
      <Link href="/dashboard" className="flex items-center gap-[10px] px-[10px] pb-[22px]">
        <Brand variant="mark" size="sm" theme="light" />
        <span className="text-[17px] font-semibold text-white">Mastry</span>
      </Link>

      <nav className="flex flex-col gap-0.5">
        {appNavigation.map((item, i) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const num = String(i + 1).padStart(2, "0");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-[11px] rounded-[10px] px-[11px] py-[9px] text-left transition-colors duration-150",
                isActive
                  ? "bg-white/[0.08]"
                  : "hover:bg-white/[0.04]",
              )}
            >
              <span
                className={cn(
                  "font-mono w-4 text-[11px]",
                  isActive ? "text-[var(--blue-light)]" : "text-white/[0.25]",
                )}
              >
                {num}
              </span>
              <span
                className={cn(
                  "text-[13.5px]",
                  isActive
                    ? "font-semibold text-white"
                    : "font-medium text-white/[0.50]",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
