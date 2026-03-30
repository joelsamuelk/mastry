"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Brand } from "@/components/brand/brand";
import { buttonStyles } from "@/components/ui/button";

const links = [
  { href: "/become-a-mentor", label: "Expert Portal" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 px-4 pt-4 md:px-8 md:pt-6">
        <div className="glass-panel mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 md:px-6">
          <Brand compact />
          <nav className="hidden items-center gap-8 text-sm font-semibold text-[var(--ink-muted)] md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[var(--ink)]">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className={buttonStyles({ variant: "ghost" })}>
              Sign In
            </Link>
            <Link href="/signup" className={buttonStyles({ variant: "primary" })}>
              Find a Mentor
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="grid size-11 place-items-center rounded-full bg-white text-[var(--ink)] shadow-[0_12px_32px_rgba(45,51,56,0.08)] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </header>
      {isOpen ? (
        <div className="fixed inset-0 z-40 bg-[rgba(249,249,251,0.92)] px-4 py-6 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-8">
            <div className="flex items-center justify-between">
              <Brand compact />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-white shadow-[0_12px_32px_rgba(45,51,56,0.08)]"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="surface-panel flex flex-col gap-2 p-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-[24px] px-4 py-4 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--surface-low)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className={buttonStyles({ variant: "secondary", size: "lg" })}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                Find a Mentor
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
