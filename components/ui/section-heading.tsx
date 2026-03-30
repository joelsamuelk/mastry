import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div className="space-y-3">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-extrabold tracking-[-0.05em] text-[var(--ink)] md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="hidden items-center gap-2 text-sm font-semibold text-[var(--accent)] md:inline-flex"
        >
          {actionLabel}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
