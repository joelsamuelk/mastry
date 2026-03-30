import Link from "next/link";
import { Brand } from "@/components/brand/brand";

export function MarketingFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-12 pt-18 text-sm text-[var(--ink-muted)] md:px-8 md:pt-24">
      <div className="flex flex-col gap-6 rounded-[32px] bg-white/80 px-6 py-7 shadow-[0_12px_40px_rgba(45,51,56,0.04)] backdrop-blur-xl md:flex-row md:items-end md:justify-between md:px-8">
        <div className="space-y-4">
          <Brand />
          <p className="max-w-md leading-7">
            A premium mentorship operating system designed for calm, intentional growth.
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/login">Sign In</Link>
          <Link href="/signup">Find a Mentor</Link>
          <Link href="/become-a-mentor">Become a Mentor</Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-1 pt-1 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Mastry. Built for ambitious professionals and expert mentors.</p>
        <p>Premium Career OS</p>
      </div>
    </footer>
  );
}
