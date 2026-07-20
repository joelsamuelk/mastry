import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "cta" | "ghost" | "quiet" | "danger";
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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/25 disabled:pointer-events-none disabled:opacity-60",
    variant === "primary" &&
      "bg-[#32373c] text-white shadow-none hover:bg-[#3d4349]",
    variant === "secondary" &&
      "bg-white text-[var(--ink)] hover:bg-[var(--surface)]",
    variant === "cta" &&
      "bg-white !text-[#111114] hover:bg-white/90",
    variant === "ghost" &&
      "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-low)]",
    variant === "quiet" &&
      "bg-[var(--surface-low)] text-[var(--ink)] hover:bg-[var(--surface-high)]",
    variant === "danger" &&
      "bg-[var(--danger)] text-white",
    size === "sm" && "h-[42px] px-[22px] text-[14.5px]",
    size === "md" && "h-12 px-6 text-[15px]",
    size === "lg" && "h-14 px-[30px] text-base",
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
