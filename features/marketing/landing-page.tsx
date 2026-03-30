import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { buttonStyles } from "@/components/ui/button";
import { MentorPortrait } from "@/components/ui/mentor-portrait";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { dashboardPlan, faqItems, featuredMentors, trustStats } from "@/lib/mock-data";
import type { Mentor } from "@/types/domain";

const journeySteps = [
  {
    step: "01",
    title: "Define your direction with more clarity.",
    description:
      "Capture where you are, what you want next, and the operating constraints that actually matter.",
    note: "Structured onboarding. No noisy quiz funnels.",
  },
  {
    step: "02",
    title: "Meet mentors selected for signal, not volume.",
    description:
      "Browse a quieter network of experienced operators with focused session offerings and clearer positioning.",
    note: "Manual approval keeps the mentor layer deliberately selective.",
  },
  {
    step: "03",
    title: "Turn every session into visible momentum.",
    description:
      "Growth plans, next steps, AI briefs, and milestone tracking live in one composed operating layer.",
    note: "Guidance appears as documents and decisions, not chat bubbles.",
  },
];

const experienceSignals = [
  "Dual pathways for ambitious professionals and experienced mentors",
  "Quiet, editorial UI with tonal layering instead of default SaaS chrome",
  "Structured AI support that reinforces the mentorship relationship",
];

const companyStrip = ["Linear", "Stripe", "Netflix", "Forge Ventures"];

function CompactMentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <SurfaceCard className="flex h-full flex-col gap-5 p-5 md:p-6">
      <div className="flex items-start gap-4">
        <MentorPortrait
          initials={mentor.initials}
          gradient={mentor.avatarGradient}
          className="aspect-square w-24 shrink-0 rounded-[24px]"
        />
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {mentor.focusAreas.slice(0, 2).map((focus) => (
              <Pill key={focus.id}>{focus.label}</Pill>
            ))}
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-[1.8rem] font-bold tracking-[-0.05em] text-[var(--ink)]">
              {mentor.name}
            </h3>
            <p className="text-sm text-[var(--ink-muted)]">
              {mentor.headline} at {mentor.company}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm leading-7 text-[var(--ink-muted)]">{mentor.bio}</p>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-[var(--ink)]">${mentor.hourlyRateUsd}/hr</span>
        <Link href={`/mentors/${mentor.slug}`} className="text-sm font-semibold text-[var(--accent)]">
          View profile
        </Link>
      </div>
    </SurfaceCard>
  );
}

export function LandingPage() {
  const heroMentor = featuredMentors[0];
  const leadMentor = featuredMentors[1];

  return (
    <div className="overflow-x-clip">
      <MarketingHeader />
      <main className="pb-24 md:pb-32">
        <section className="px-4 pt-8 md:px-8 md:pt-12 lg:pt-16">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(460px,0.98fr)] lg:gap-14">
            <div className="space-y-8 pt-6 md:space-y-10 lg:pt-16">
              <div className="space-y-6">
                <p className="eyebrow">Premium Mentorship OS</p>
                <h1 className="font-display text-balance text-[3.65rem] font-extrabold leading-[0.92] tracking-[-0.09em] text-[var(--ink)] md:text-[5.25rem] lg:max-w-[11ch] lg:text-[6.25rem]">
                  Elite mentorship, arranged with more clarity.
                </h1>
                <p className="max-w-[35rem] text-[1.02rem] leading-8 text-[var(--ink-muted)] md:text-[1.12rem]">
                  Mastry is a premium mentorship platform for ambitious professionals and proven
                  mentors. The experience is intentionally calm: clearer discovery, stronger
                  structure, and quieter interfaces that help growth feel composed rather than busy.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className={buttonStyles({ variant: "primary", size: "lg" })}>
                  Find a Mentor
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/become-a-mentor"
                  className={buttonStyles({ variant: "secondary", size: "lg" })}
                >
                  Become a Mentor
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {experienceSignals.map((signal) => (
                  <SurfaceCard key={signal} tone="soft" className="p-4">
                    <p className="text-sm leading-6 text-[var(--ink-muted)]">{signal}</p>
                  </SurfaceCard>
                ))}
              </div>
            </div>

            <div className="relative lg:pt-8">
              <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[rgba(78,69,228,0.14)] blur-3xl" />
              <div className="absolute -left-16 bottom-8 h-48 w-48 rounded-full bg-[rgba(78,69,228,0.08)] blur-3xl" />

              <div className="relative grid gap-4 md:grid-cols-[1.08fr_0.92fr] md:items-start">
                <SurfaceCard className="overflow-hidden p-5 md:row-span-2 md:p-6">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="eyebrow">Curated Match</p>
                        <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                          {heroMentor.name}
                        </h2>
                      </div>
                      <Pill active>${heroMentor.hourlyRateUsd}/hr</Pill>
                    </div>

                    <MentorPortrait
                      initials={heroMentor.initials}
                      gradient={heroMentor.avatarGradient}
                      className="aspect-[4/3.7] w-full"
                    />

                    <div className="space-y-3">
                      <p className="text-lg font-semibold text-[var(--ink)]">
                        {heroMentor.headline} at {heroMentor.company}
                      </p>
                      <p className="text-sm leading-7 text-[var(--ink-muted)]">
                        {heroMentor.featuredQuote}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[28px] bg-[var(--surface-low)] p-4">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                          Session Focus
                        </p>
                        <p className="pt-2 text-sm font-semibold text-[var(--ink)]">
                          1:1 Strategy Audit
                        </p>
                      </div>
                      <div className="rounded-[28px] bg-[var(--surface-low)] p-4">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                          Rating
                        </p>
                        <p className="pt-2 text-sm font-semibold text-[var(--ink)]">
                          {heroMentor.rating.toFixed(1)} from {heroMentor.reviewCount} reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </SurfaceCard>

                <SurfaceCard tone="soft" className="soft-grid p-5 md:p-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="eyebrow">Growth Plan Preview</p>
                      <h3 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.06em] text-[var(--ink)]">
                        {dashboardPlan.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {dashboardPlan.milestones.slice(0, 2).map((milestone, index) => (
                        <div key={milestone.id} className="surface-panel p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-[var(--ink)]">
                                {milestone.title}
                              </p>
                              <span className="text-sm font-semibold text-[var(--accent)]">
                                {index === 0 ? "Complete" : `${milestone.masteryPercent}%`}
                              </span>
                            </div>
                            <p className="text-xs leading-6 text-[var(--ink-muted)]">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SurfaceCard>

                <SurfaceCard className="p-5 md:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-2">
                        <p className="eyebrow">Next Session</p>
                        <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                          Thursday, 10:00 AM
                        </h3>
                      </div>
                      <div className="grid size-12 place-items-center rounded-full bg-[var(--surface-low)] text-[var(--accent)]">
                        <CalendarCheck2 className="size-5" />
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-[var(--ink-muted)]">
                      Review the architecture deck, arrive with two trade-off decisions, and turn
                      the session into a sharper milestone update.
                    </p>

                    <Link href="/signup" className={buttonStyles({ variant: "quiet" })}>
                      Enter Mastry
                    </Link>
                  </div>
                </SurfaceCard>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-20 md:px-8 md:pt-28">
          <div className="mx-auto grid max-w-[1440px] gap-4 xl:grid-cols-[0.74fr_1.26fr]">
            <SurfaceCard tone="soft" className="p-6 md:p-8">
              <div className="space-y-4">
                <p className="eyebrow">Why professionals trust it</p>
                <h2 className="font-display text-balance text-[2.6rem] font-bold leading-[1] tracking-[-0.07em] text-[var(--ink)] md:text-[3.2rem]">
                  A quieter mentorship experience with a higher signal floor.
                </h2>
                <p className="max-w-xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
                  The Stitch direction is clear: premium spacing, stronger editorial hierarchy, and
                  a product that feels more like a composed operating system than a crowded
                  marketplace.
                </p>
              </div>
            </SurfaceCard>

            <div className="grid gap-4 md:grid-cols-3">
              {trustStats.map((stat) => (
                <SurfaceCard key={stat.label} className="p-6 md:p-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {stat.label}
                  </p>
                  <p className="font-display pt-6 text-[3rem] font-bold leading-none tracking-[-0.07em] text-[var(--ink)]">
                    {stat.value}
                  </p>
                </SurfaceCard>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-4 grid max-w-[1440px] gap-4 rounded-[32px] bg-white/80 px-6 py-5 shadow-[0_12px_40px_rgba(45,51,56,0.04)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
            {companyStrip.map((company) => (
              <div key={company} className="text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
                {company}
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="px-4 pt-24 md:px-8 md:pt-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-5 lg:pt-4">
              <SectionHeading
                eyebrow="How It Works"
                title="The rhythm is intentionally simple."
                description="The designs imply a very deliberate interaction model: fewer decisions per screen, more visual breathing room, and a stronger sense of composed momentum."
              />
            </div>

            <div className="grid gap-5">
              {journeySteps.map((step) => (
                <SurfaceCard key={step.step} tone="soft" className="p-6 md:p-8">
                  <div className="grid gap-6 md:grid-cols-[88px_1fr_280px] md:items-start">
                    <div className="flex size-16 items-center justify-center rounded-full bg-white text-lg font-bold text-[var(--accent)] shadow-[0_12px_40px_rgba(45,51,56,0.06)]">
                      {step.step}
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.06em] text-[var(--ink)]">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-7 text-[var(--ink-muted)] md:text-base">
                        {step.description}
                      </p>
                    </div>
                    <div className="rounded-[28px] bg-white p-4">
                      <p className="text-sm leading-7 text-[var(--ink-muted)]">{step.note}</p>
                    </div>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-mentors" className="px-4 pt-24 md:px-8 md:pt-32">
          <div className="mx-auto max-w-[1440px] space-y-10">
            <SectionHeading
              eyebrow="Featured Mentors"
              title="Curated operators with real pattern recognition."
              description="Discovery should feel edited rather than infinite. The landing page now follows that same principle."
              actionLabel="Browse all mentors"
              actionHref="/mentors"
            />

            <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
              <SurfaceCard className="overflow-hidden p-6 md:p-8">
                <div className="grid gap-6 md:grid-cols-[0.88fr_1.12fr]">
                  <MentorPortrait
                    initials={leadMentor.initials}
                    gradient={leadMentor.avatarGradient}
                    className="aspect-[4/5] w-full"
                  />

                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {leadMentor.focusAreas.map((focus) => (
                        <Pill key={focus.id}>{focus.label}</Pill>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display text-[3rem] font-bold leading-[0.95] tracking-[-0.07em] text-[var(--ink)]">
                        {leadMentor.name}
                      </h3>
                      <p className="text-[1.02rem] leading-8 text-[var(--ink-muted)]">
                        {leadMentor.headline} at {leadMentor.company}. {leadMentor.bio}
                      </p>
                    </div>

                    <div className="rounded-[32px] bg-[var(--surface-low)] p-5">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                        Featured Quote
                      </p>
                      <p className="pt-3 text-base leading-8 text-[var(--ink)]">
                        {leadMentor.featuredQuote}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={`/mentors/${leadMentor.slug}`}
                        className={buttonStyles({ variant: "primary", size: "lg" })}
                      >
                        Book with {leadMentor.name.split(" ")[0]}
                      </Link>
                      <Link
                        href="/mentors"
                        className={buttonStyles({ variant: "secondary", size: "lg" })}
                      >
                        Explore More Mentors
                      </Link>
                    </div>
                  </div>
                </div>
              </SurfaceCard>

              <div className="grid gap-5">
                {featuredMentors
                  .filter((mentor) => mentor.id !== leadMentor.id)
                  .slice(0, 3)
                  .map((mentor) => (
                    <CompactMentorCard key={mentor.id} mentor={mentor} />
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pt-24 md:px-8 md:pt-32">
          <div className="mx-auto grid max-w-[1440px] gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <SurfaceCard tone="soft" className="p-7 md:p-9">
              <div className="space-y-7">
                <div className="space-y-4">
                  <p className="eyebrow">Why It Feels Different</p>
                  <h2 className="font-display text-balance text-[3rem] font-bold leading-[0.98] tracking-[-0.07em] text-[var(--ink)] md:text-[3.8rem]">
                    Less marketplace noise. More trajectory clarity.
                  </h2>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-4 rounded-[28px] bg-white p-5">
                    <CheckCircle2 className="mt-0.5 size-5 text-[var(--accent)]" />
                    <p className="text-sm leading-7 text-[var(--ink-muted)]">
                      Structured next steps after every mentor interaction instead of a loose trail
                      of chats, links, and notes.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 rounded-[28px] bg-white p-5">
                    <ShieldCheck className="mt-0.5 size-5 text-[var(--accent)]" />
                    <p className="text-sm leading-7 text-[var(--ink-muted)]">
                      Manual mentor approvals and softer trust cues borrowed from the desktop
                      product screens rather than generic badge-heavy marketplace patterns.
                    </p>
                  </div>
                  <div className="flex items-start gap-4 rounded-[28px] bg-white p-5">
                    <Sparkles className="mt-0.5 size-5 text-[var(--accent)]" />
                    <p className="text-sm leading-7 text-[var(--ink-muted)]">
                      AI support expressed as documents, milestones, and briefs so the product stays
                      analytical and composed.
                    </p>
                  </div>
                </div>
              </div>
            </SurfaceCard>

            <SurfaceCard className="overflow-hidden p-7 md:p-9">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="eyebrow">Guidance Preview</p>
                  <h3 className="font-display text-[2.8rem] font-bold leading-[0.98] tracking-[-0.07em] text-[var(--ink)]">
                    AI support that reads like a document.
                  </h3>
                </div>

                <div className="rounded-[32px] bg-[var(--surface-low)] p-6">
                  <div className="relative pl-5">
                    <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-[var(--accent)]" />
                    <div className="space-y-4">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                        Curator Brief
                      </p>
                      <h4 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                        Architecting Global Influence
                      </h4>
                      <p className="text-sm leading-7 text-[var(--ink-muted)]">
                        Curate case-study fluency, publish sharper thought leadership, and build a
                        repeatable decision narrative for principal-level scope.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {dashboardPlan.milestones.map((milestone) => (
                    <div key={milestone.id} className="rounded-[28px] bg-[var(--surface-low)] p-5">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-[var(--ink)]">{milestone.title}</p>
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                            {milestone.state}
                          </span>
                        </div>
                        <p className="text-xs leading-6 text-[var(--ink-muted)]">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </div>
        </section>

        <section id="faq" className="px-4 pt-24 md:px-8 md:pt-32">
          <div className="mx-auto max-w-[1440px] space-y-10">
            <SectionHeading
              eyebrow="FAQ"
              title="Built for people who value signal."
              description="The landing page stays sparse on purpose. These are the few questions worth answering clearly."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {faqItems.map((faq) => (
                <SurfaceCard key={faq.id} className="p-6 md:p-8">
                  <div className="space-y-4">
                    <h3 className="font-display text-[2rem] font-bold leading-tight tracking-[-0.06em] text-[var(--ink)]">
                      {faq.question}
                    </h3>
                    <p className="text-sm leading-7 text-[var(--ink-muted)] md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-24 md:px-8 md:pt-32">
          <div className="mx-auto max-w-[1440px]">
            <SurfaceCard className="overflow-hidden bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] p-8 text-white shadow-[0_18px_44px_rgba(78,69,228,0.26)] md:p-12 lg:p-14">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <div className="space-y-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/72">
                    Final CTA
                  </p>
                  <h2 className="font-display text-balance text-[3rem] font-bold leading-[0.96] tracking-[-0.08em] md:text-[4.4rem]">
                    Start with one focused session, then build the system around it.
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/82">
                    The product direction is intentionally premium: calm surfaces, tighter
                    hierarchy, and growth that feels structured from the first click.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/signup"
                    className={buttonStyles({
                      variant: "secondary",
                      size: "lg",
                      className: "bg-white text-[var(--accent)] hover:bg-white/90",
                    })}
                  >
                    Find a Mentor
                  </Link>
                  <Link
                    href="/become-a-mentor"
                    className={buttonStyles({
                      variant: "ghost",
                      size: "lg",
                      className: "bg-white/10 text-white hover:bg-white/18",
                    })}
                  >
                    Become a Mentor
                  </Link>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
