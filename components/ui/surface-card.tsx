import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SurfaceCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "soft" | "deep";
}

export function SurfaceCard({
  className,
  tone = "default",
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-[32px] shadow-[0_12px_40px_rgba(45,51,56,0.04)]",
        tone === "default" && "bg-white",
        tone === "soft" && "bg-[var(--surface-low)]",
        tone === "deep" && "bg-[var(--surface-high)]",
        className,
      )}
      {...props}
    />
  );
}
