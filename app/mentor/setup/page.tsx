import Link from "next/link";
import { SurfaceCard } from "@/components/ui/surface-card";
import { mentorSetupSteps } from "@/lib/mock-data";

export default function MentorSetupPage() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="eyebrow">Service Offering</p>
          <h1 className="font-display text-balance text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Define how you wish to mentor.
          </h1>
        </div>
      </SurfaceCard>
      <div className="grid gap-5 md:grid-cols-3">
        {mentorSetupSteps.map((step, index) => (
          <SurfaceCard key={step} tone="soft" className="p-6">
            <div className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--accent)]">
                {index + 1}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--ink)]">{step}</h2>
                <p className="pt-2 text-sm text-[var(--ink-muted)]">
                  Sculpt the mentor onboarding flow to match the finalized Stitch interaction model.
                </p>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
      <Link href="/mentor/dashboard" className="text-sm font-semibold text-[var(--accent)]">
        Skip ahead to mentor dashboard
      </Link>
    </div>
  );
}
