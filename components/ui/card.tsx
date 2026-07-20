import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "inset" | "dark";
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--card-radius-lg)] p-6 transition duration-200 ease-out",
        variant === "default" && "bg-white shadow-[var(--card-shadow)]",
        variant === "inset" && "bg-[var(--surface-low)]",
        variant === "dark" && "bg-[var(--dark-surface)] text-white shadow-[var(--card-shadow-dark)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold text-[var(--ink)]", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
