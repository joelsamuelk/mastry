import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-14 w-full rounded-[24px] bg-white px-5 text-sm text-[var(--ink)] shadow-[0_12px_32px_rgba(45,51,56,0.06)] outline-none placeholder:text-[var(--muted)] focus-visible:ring-2 focus-visible:ring-[rgba(78,69,228,0.28)]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
