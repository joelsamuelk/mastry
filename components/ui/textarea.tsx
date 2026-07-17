import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "min-h-[120px] w-full rounded-2xl bg-[var(--surface-low)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)] transition duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)] focus:bg-white disabled:opacity-60 resize-y",
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

Textarea.displayName = "Textarea";
