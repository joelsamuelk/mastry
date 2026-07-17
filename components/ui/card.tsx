import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "inset";
}

export function Card({ className, variant = "default", children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] p-6 transition duration-200 ease-out",
        variant === "default" && "bg-white shadow-[0_12px_40px_rgba(45,51,56,0.04)]",
        variant === "inset" && "bg-[var(--surface-low)]",
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
      className={cn("font-display text-lg font-bold text-[var(--ink)]", className)}
      {...props}
    >
      {children}
    </h3>
  );
}
