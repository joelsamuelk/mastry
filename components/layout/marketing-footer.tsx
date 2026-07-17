import Link from "next/link";
import { Brand } from "@/components/brand/brand";

export function MarketingFooter() {
  return (
    <footer className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-col items-center gap-6 text-center">
        <Brand variant="wordmark" size="sm" />

        <nav className="flex items-center gap-6">
          {[
            { label: "How it works", href: "#how" },
            { label: "Sign in", href: "/login" },
            { label: "Get started", href: "/signup" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Mastry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
