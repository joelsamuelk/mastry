import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandProps {
  compact?: boolean;
  className?: string;
  muted?: boolean;
}

export function Brand({ compact = false, className, muted = false }: BrandProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3", compact && "gap-2", className)}
    >
      <span
        className={cn(
          "flex size-10 items-center justify-center rounded-2xl bg-white shadow-[0_12px_40px_rgba(45,51,56,0.08)]",
          compact && "size-8 rounded-xl",
        )}
      >
        <svg
          width={compact ? 18 : 22}
          height={compact ? 18 : 22}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9 28.5V11.5L15.8 28.5L22.3 11.5L31 28.5"
            stroke="#2D3338"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="31" cy="28.5" r="3" fill="#4E45E4" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-[-0.04em] text-[var(--ink)]",
            compact && "text-base",
            muted && "text-[var(--ink-muted)]",
          )}
        >
          Mastry
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]",
            compact && "text-[0.58rem]",
          )}
        >
          The Personal OS
        </span>
      </span>
    </Link>
  );
}
