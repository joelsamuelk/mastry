import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export function Pill({ children, className, active = false }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em]",
        active
          ? "bg-[rgba(78,69,228,0.12)] text-[var(--accent)]"
          : "bg-[var(--surface-low)] text-[var(--ink-muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
