import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold",
        variant === "default" && "bg-[var(--surface-low)] text-[var(--ink-muted)]",
        variant === "accent" && "bg-[var(--surface-low)] text-[var(--ink)]",
        variant === "success" && "bg-[rgba(16,185,129,0.1)] text-[var(--success)]",
        variant === "warning" && "bg-[rgba(245,158,11,0.1)] text-[var(--warning)]",
        variant === "danger" && "bg-[rgba(239,68,68,0.1)] text-[var(--danger)]",
        className,
      )}
      {...props}
    />
  );
}
