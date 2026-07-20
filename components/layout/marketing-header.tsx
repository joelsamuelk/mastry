"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Members", href: "#testimonials" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "/signup" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--dark)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-11 py-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/4.png"
            alt="Mastry"
            width={90}
            height={32}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 text-[15px] text-white/50 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/login"
            className="text-[15px] font-medium transition hover:opacity-70"
            style={{ color: "#ffffff" }}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-full px-[22px] text-[14.5px] font-medium transition duration-200 hover:opacity-80"
            style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#ffffff" }}
          >
            Get started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center text-white/70 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[var(--dark)] px-11 pb-8 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-[16px] text-white/60 transition hover:bg-white/[0.04] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-4 py-3 text-center text-[15px] font-medium text-white/60 transition hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className={buttonStyles({ variant: "primary", size: "md" })}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
