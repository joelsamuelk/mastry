import Link from "next/link";
import { Brand } from "@/components/brand/brand";

export function MarketingFooter() {
  return (
    <footer className="bg-[#0a0a0a] px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <Brand variant="wordmark" size="sm" theme="light" />

        <nav className="flex items-center gap-6">
          {[
            { label: "How it works", href: "#how" },
            { label: "Sign in", href: "/login" },
            { label: "Get started", href: "/signup" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-white/40 transition hover:text-white/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-white/25">
          &copy; {new Date().getFullYear()} Mastry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
