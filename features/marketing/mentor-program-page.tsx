import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { buttonStyles } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  mentorDashboardMetrics,
  mentorProgramBenefits,
  mentorSetupSteps,
} from "@/lib/mock-data";

export function MentorProgramPage() {
  return (
    <div className="overflow-x-clip">
      <MarketingHeader />
      <main className="px-4 pb-20 pt-10 md:px-8 md:pt-16">
        <div className="mx-auto max-w-7xl space-y-20">
          <section className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div className="space-y-6">
              <p className="eyebrow">Expert Portal</p>
              <h1 className="font-display text-balance text-5xl font-extrabold tracking-[-0.07em] md:text-7xl">
                Define how you wish to mentor.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-[var(--ink-muted)]">
                Create premium offerings, set your availability, and let Mastry handle the
                operating layer around your expertise.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/mentor/setup"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  Start Mentor Setup
                  <ArrowRight className="size-4" />
                </Link>
                <Link href="/mentor/dashboard" className={buttonStyles({ variant: "secondary", size: "lg" })}>
                  View Mentor OS
                </Link>
              </div>
            </div>
            <SurfaceCard className="p-6 md:p-8">
              <div className="space-y-6">
                <p className="eyebrow">Service Offering</p>
                <div className="grid gap-4">
                  {mentorSetupSteps.map((step, index) => (
                    <SurfaceCard key={step} tone="soft" className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex size-11 items-center justify-center rounded-full bg-white text-sm font-bold text-[var(--accent)]">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--ink)]">{step}</p>
                          <p className="text-xs text-[var(--ink-muted)]">
                            Designed to mirror the finalized Stitch mentor onboarding flow.
                          </p>
                        </div>
                      </div>
                    </SurfaceCard>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </section>

          <section className="space-y-10">
            <SectionHeading
              eyebrow="Mentor Benefits"
              title="A command center that respects your expertise."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {mentorProgramBenefits.map((benefit) => (
                <SurfaceCard key={benefit} tone="soft" className="p-6">
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">{benefit}</p>
                </SurfaceCard>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.84fr]">
            <SurfaceCard className="p-6 md:p-8">
              <div className="space-y-6">
                <p className="eyebrow">Mentor Momentum</p>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {mentorDashboardMetrics.map((metric) => (
                    <SurfaceCard key={metric.label} tone="soft" className="p-5">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        {metric.label}
                      </p>
                      <p className="pt-3 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                        {metric.value}
                      </p>
                      <p className="pt-1 text-xs text-[var(--accent)]">{metric.note}</p>
                    </SurfaceCard>
                  ))}
                </div>
              </div>
            </SurfaceCard>
            <SurfaceCard tone="soft" className="p-6 md:p-8">
              <div className="space-y-5">
                <p className="eyebrow">Why Mentors Join</p>
                <h2 className="font-display text-4xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Premium surface area, not a generic marketplace profile.
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Pill active>Quiet confidence</Pill>
                  <Pill>Structured session tools</Pill>
                  <Pill>Mentor-controlled pricing</Pill>
                </div>
                <p className="text-sm leading-7 text-[var(--ink-muted)]">
                  The design system prioritizes clarity, space, and authority so your expertise is
                  presented with the right visual weight across desktop and mobile.
                </p>
              </div>
            </SurfaceCard>
          </section>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
