import Link from "next/link";
import { Brand } from "@/components/brand/brand";
import { buttonStyles } from "@/components/ui/button";

export function MarketingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="glass-panel flex items-center justify-between gap-8 px-6 py-3 w-full max-w-5xl mx-auto">
        <Link href="/">
          <Brand variant="mark" size="sm" />
        </Link>
        <div className="flex items-center gap-3">
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
