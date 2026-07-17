"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/brand/brand";
import { appNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col gap-6 p-6 lg:flex">
      <Link href="/dashboard">
        <Brand variant="mark" size="md" />
      </Link>

      <nav className="flex flex-col gap-1">
        {appNavigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ease-out",
                isActive
                  ? "bg-white text-[var(--ink)] shadow-[0_12px_40px_rgba(45,51,56,0.04)]"
                  : "text-[var(--ink-muted)] hover:bg-[var(--surface-low)] hover:text-[var(--ink)]",
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
