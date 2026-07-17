import { Brand } from "@/components/brand/brand";

export function MarketingFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <Brand size="sm" />
        <p className="text-sm text-[var(--muted)]">
          The AI Career Mastery Platform.
        </p>
        <p className="text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Mastry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
