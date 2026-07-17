import Link from "next/link";
import { Brand } from "@/components/brand/brand";
import { buttonStyles } from "@/components/ui/button";

export function MarketingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="glass-panel mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Brand variant="mark" size="sm" />
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          <Link
            href="#how"
            className="text-sm font-medium text-[var(--ink-muted)] transition hover:text-[var(--ink)]"
          >
            How it works
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--ink-muted)] transition hover:text-[var(--ink)]"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            Get started
          </Link>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-3 sm:hidden">
          <Link
            href="/login"
            className={buttonStyles({ variant: "ghost", size: "sm" })}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
