import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "wordmark" | "text";
  theme?: "dark" | "light";
}

const markSizes = {
  sm: 24,
  md: 32,
  lg: 48,
};

export function Brand({ className, size = "md", variant = "text", theme = "dark" }: BrandProps) {
  if (variant === "mark") {
    const px = markSizes[size];
    return (
      <Image
        src={theme === "dark" ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
        alt="Mastry"
        width={px}
        height={px}
        className={className}
        priority
      />
    );
  }

  if (variant === "wordmark") {
    const px = markSizes[size];
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Image
          src={theme === "dark" ? "/brand/logo-dark.png" : "/brand/logo-light.png"}
          alt=""
          width={px}
          height={px}
          priority
        />
        <span
          className={cn(
            "font-display font-extrabold tracking-tight",
            theme === "dark" ? "text-[var(--ink)]" : "text-white",
            size === "sm" && "text-lg",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl",
          )}
        >
          Mastry
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "font-display font-extrabold tracking-tight text-[var(--ink)]",
        size === "sm" && "text-lg",
        size === "md" && "text-xl",
        size === "lg" && "text-2xl",
        className,
      )}
    >
      Mastry
    </span>
  );
}
