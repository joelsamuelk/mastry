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
      {eyebrow && <p className="eyebrow-mono mb-3">{eyebrow}</p>}
      <h2 className="font-display text-[33px] font-medium tracking-[-0.015em] text-[var(--ink)]">
        {title}
      </h2>
      {description && (
        <p className="mt-[5px] max-w-2xl text-[14.5px] text-[var(--muted)]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
