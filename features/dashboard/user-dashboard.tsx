import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  PlayCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { MentorPortrait } from "@/components/ui/mentor-portrait";
import { Pill } from "@/components/ui/pill";
import { ProgressRing } from "@/components/ui/progress-ring";
import { SurfaceCard } from "@/components/ui/surface-card";
import { curatorInsights, dashboardPlan, featuredMentors } from "@/lib/mock-data";

function MobileGoalCard() {
  return (
    <section className="space-y-3 md:hidden">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
        Current Focus
      </p>
      <h1 className="font-display text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.08em] text-[var(--ink)]">
        Architecting the Next Era of Digital Infrastructure
      </h1>
    </section>
  );
}

function MobileNextStepCard() {
  return (
    <SurfaceCard className="overflow-hidden p-5 md:hidden">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
            Next Move
          </p>
          <h2 className="font-display text-[1.45rem] font-bold leading-tight tracking-[-0.06em] text-[var(--ink)]">
            Review Series A Deck
          </h2>
          <p className="text-[0.92rem] leading-6 text-[var(--ink-muted)]">
            Refine your competitive positioning and prepare precise questions for Thursday&apos;s
            session with Sarah.
          </p>
        </div>

        <Link
          href="/sessions"
          className={buttonStyles({ variant: "primary", className: "w-full justify-center" })}
        >
          Start Session
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </SurfaceCard>
  );
}

function MobileMomentumCard() {
  return (
    <SurfaceCard tone="soft" className="p-5 md:hidden">
      <div className="flex flex-col items-center gap-4 text-center">
        <ProgressRing value={75} label="Daily Momentum" />
        <p className="text-[0.82rem] leading-6 text-[var(--ink-muted)]">
          4/5 recommended habits completed this week.
        </p>
      </div>
    </SurfaceCard>
  );
}

function MobileAiGuidanceCard() {
  return (
    <SurfaceCard tone="soft" className="overflow-hidden p-5 md:hidden">
      <div className="relative pl-5">
        <div className="absolute inset-y-1 left-0 w-1 rounded-full bg-[var(--accent)]" />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-[var(--accent)]" />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Strategic Insights
            </p>
          </div>
          <p className="text-[0.95rem] leading-6 text-[var(--ink)]">
            Your output volume has increased by 12% this week, but focus depth is shifting later in
            the day.
          </p>

          <div className="space-y-3">
            <div className="rounded-[24px] bg-white p-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Insight
              </p>
              <p className="pt-2 text-[0.85rem] leading-6 text-[var(--ink-muted)]">
                Meeting density between 10 AM - 12 PM is crowding your deep work block.
              </p>
            </div>
            <div className="rounded-[24px] bg-white p-4">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Recommendation
              </p>
              <p className="pt-2 text-[0.85rem] leading-6 text-[var(--ink-muted)]">
                Batch administrative tasks at 4 PM. Protect the morning for architectural review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}

function MobileMentorBlock() {
  const mentors = featuredMentors.slice(0, 2);

  return (
    <section className="space-y-4 md:hidden">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            Curated Mentors
          </p>
          <h2 className="font-display text-[1.9rem] font-bold leading-none tracking-[-0.06em] text-[var(--ink)]">
            Scale Your Vision
          </h2>
        </div>
        <Link href="/mentors" className="text-[0.82rem] font-semibold text-[var(--accent)]">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {mentors.map((mentor) => (
          <SurfaceCard key={mentor.id} className="overflow-hidden p-3">
            <div className="space-y-3">
              <MentorPortrait
                initials={mentor.initials}
                gradient={mentor.avatarGradient}
                className="aspect-[1.2/1] w-full rounded-[24px]"
              />
              <div className="space-y-2 px-1 pb-1">
                <div className="flex flex-wrap gap-2">
                  {mentor.focusAreas.slice(0, 2).map((focus) => (
                    <Pill key={focus.id}>{focus.label}</Pill>
                  ))}
                </div>
                <div>
                  <h3 className="font-display text-[1.2rem] font-bold tracking-[-0.05em] text-[var(--ink)]">
                    {mentor.name}
                  </h3>
                  <p className="text-[0.82rem] leading-5 text-[var(--ink-muted)]">
                    {mentor.headline} at {mentor.company}
                  </p>
                </div>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}

function DesktopDashboard() {
  return (
    <div className="hidden space-y-6 md:block">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="eyebrow">Current Focus</p>
              <h1 className="font-display text-balance text-4xl font-extrabold tracking-[-0.06em] md:text-5xl">
                {dashboardPlan.title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
                {dashboardPlan.summary}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-[0.78fr_0.22fr]">
              <div className="space-y-4">
                {dashboardPlan.milestones.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="relative rounded-[28px] bg-[var(--surface-low)] p-5"
                  >
                    <div className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-[var(--accent)]/10" />
                    <div className="space-y-3 pl-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold text-[var(--ink)]">{milestone.title}</p>
                          <p className="text-sm text-[var(--ink-muted)]">{milestone.description}</p>
                        </div>
                        <Pill active={index === 1}>{milestone.state}</Pill>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {milestone.tags.map((tag) => (
                          <Pill key={tag}>{tag}</Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <ProgressRing value={75} label="Daily Momentum" />
              </div>
            </div>
          </div>
        </SurfaceCard>
        <div className="grid gap-5">
          <SurfaceCard className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="eyebrow">Upcoming Session</p>
                  <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                    Sarah Jenkins
                  </h2>
                </div>
                <div className="grid size-11 place-items-center rounded-full bg-[var(--surface-low)] text-[var(--accent)]">
                  <CalendarClock className="size-5" />
                </div>
              </div>
              <p className="text-sm leading-7 text-[var(--ink-muted)]">
                Tomorrow, 10:00 AM. Review the architecture series deck and arrive with two
                concrete trade-off decisions to pressure test.
              </p>
              <Link href="/sessions" className={buttonStyles({ variant: "primary" })}>
                Join Session Workspace
              </Link>
            </div>
          </SurfaceCard>
          <SurfaceCard tone="soft" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-white text-[var(--accent)]">
                  <TrendingUp className="size-5" />
                </div>
                <div>
                  <p className="eyebrow">Skill Velocity</p>
                  <p className="font-display text-4xl font-bold tracking-[-0.06em] text-[var(--ink)]">
                    +24%
                  </p>
                </div>
              </div>
              <div className="grid h-24 grid-cols-5 items-end gap-3">
                {[34, 46, 39, 61, 84].map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="rounded-t-full bg-[var(--surface-high)]"
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-5">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="eyebrow">Recommended Mentors</p>
                <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Curated for your current milestone.
                </h2>
              </div>
              <Link href="/mentors" className="text-sm font-semibold text-[var(--accent)]">
                View all experts
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredMentors.slice(0, 3).map((mentor) => (
                <SurfaceCard key={mentor.id} className="flex h-full flex-col gap-5 p-4 md:p-5">
                  <MentorPortrait
                    initials={mentor.initials}
                    gradient={mentor.avatarGradient}
                    className="aspect-[5/6] w-full"
                  />
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {mentor.focusAreas.slice(0, 2).map((focus) => (
                        <Pill key={focus.id}>{focus.label}</Pill>
                      ))}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-[var(--ink-muted)]">
                        {mentor.headline} at {mentor.company}
                      </p>
                    </div>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </div>
        </SurfaceCard>
        <SurfaceCard tone="soft" className="overflow-hidden p-6 md:p-7">
          <div className="relative pl-4">
            <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-[var(--accent)]" />
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                <Sparkles className="size-3.5" />
                {curatorInsights[0].eyebrow}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-[var(--ink)]">
                {curatorInsights[0].title}
              </h3>
              <p className="text-sm leading-7 text-[var(--ink-muted)]">{curatorInsights[0].body}</p>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <SurfaceCard tone="soft" className="p-6">
          <div className="space-y-3">
            <p className="eyebrow">Next Step</p>
            <h3 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
              Review Series A deck
            </h3>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">{dashboardPlan.nextStep}</p>
            <Link href="/guidance" className={buttonStyles({ variant: "secondary" })}>
              Open Guidance
            </Link>
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6">
          <div className="space-y-3">
            <p className="eyebrow">Weekly Focus</p>
            <h3 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
              {dashboardPlan.weeklyFocus}
            </h3>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Stay on the same thread this week: stronger architecture narrative, tighter trade-off
              framing, and more visible staff-level judgment.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
              <PlayCircle className="size-4" />
              Continue roadmap
            </div>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}

export function UserDashboard() {
  return (
    <>
      <div className="space-y-5 px-1 pb-4 md:hidden">
        <MobileGoalCard />
        <MobileNextStepCard />
        <MobileMomentumCard />
        <MobileAiGuidanceCard />
        <MobileMentorBlock />
      </div>
      <DesktopDashboard />
    </>
  );
}
