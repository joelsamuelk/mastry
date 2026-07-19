import type { ReactNode } from "react";
import { Brand } from "@/components/brand/brand";

export const dynamic = "force-dynamic";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="mb-10">
        <Brand variant="mark" size="md" />
      </div>
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
