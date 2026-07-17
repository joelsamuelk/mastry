import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--ink)]"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)] focus:bg-white disabled:opacity-60",
            error && "ring-2 ring-[var(--danger)]",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--danger)]">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
