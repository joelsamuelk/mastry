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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(78,69,228,0.35)] disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" &&
      "bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] text-[var(--on-accent)] shadow-[0_18px_34px_rgba(78,69,228,0.24)] hover:-translate-y-0.5",
    variant === "secondary" &&
      "bg-white text-[var(--ink)] shadow-[0_12px_32px_rgba(45,51,56,0.08)] hover:-translate-y-0.5 hover:bg-[var(--surface-low)]",
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
