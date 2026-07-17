import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(0,0,0,0.15)] disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" &&
      "bg-[var(--ink)] text-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:-translate-y-0.5",
    variant === "secondary" &&
      "bg-white text-[var(--ink)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:bg-[var(--surface-low)]",
    variant === "ghost" &&
      "bg-transparent text-[var(--ink)] hover:-translate-y-0.5 hover:bg-[var(--surface-low)]",
    variant === "quiet" &&
      "bg-[var(--surface-low)] text-[var(--ink)] hover:-translate-y-0.5 hover:bg-[var(--surface-high)]",
    variant === "danger" &&
      "bg-[var(--danger)] text-white hover:-translate-y-0.5",
    size === "sm" && "h-10 px-4 text-sm",
    size === "md" && "h-12 px-5 text-sm",
    size === "lg" && "h-14 px-6 text-base",
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
