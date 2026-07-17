import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-[var(--ink-muted)]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
