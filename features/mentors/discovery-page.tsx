import Link from "next/link";
import { Sparkles } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { MentorPortrait } from "@/components/ui/mentor-portrait";
import { Pill } from "@/components/ui/pill";
import { SurfaceCard } from "@/components/ui/surface-card";
import { discoveryFilters, discoveryMentors } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Mentor } from "@/types/domain";

function DiscoveryFilterChip({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-10 items-center rounded-full px-4 text-[0.74rem] font-semibold transition duration-200 ease-out",
        active
          ? "bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] text-[var(--on-accent)] shadow-[0_14px_28px_rgba(78,69,228,0.18)]"
          : "bg-white text-[var(--ink-muted)] shadow-[0_10px_24px_rgba(45,51,56,0.04)]",
      )}
    >
      {label}
    </button>
  );
}

function DiscoveryMentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <SurfaceCard className="p-4 sm:p-5">
      <Link href={`/mentors/${mentor.slug}`} className="flex items-start gap-4">
        <div className="relative shrink-0">
          <MentorPortrait
            initials={mentor.initials}
            gradient={mentor.avatarGradient}
            className="h-28 w-24 rounded-[22px]"
          />
          {mentor.badges?.[0] ? (
            <span className="absolute bottom-2 left-2 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-[0.22em] text-[var(--on-accent)]">
              {mentor.badges[0].label}
            </span>
          ) : null}
        </div>
        <div className="min-w-0 flex-1 space-y-3 pt-1">
          <div className="space-y-1.5">
            <h2 className="font-display text-[1.55rem] font-extrabold tracking-[-0.06em] text-[var(--ink)]">
              {mentor.name}
            </h2>
            <div className="space-y-0.5 text-[0.76rem] leading-5 text-[var(--ink-muted)]">
              <p className="font-semibold">{mentor.headline}</p>
              <p>{mentor.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {mentor.focusAreas.slice(0, 2).map((focus) => (
              <Pill key={focus.id} className="text-[0.55rem] tracking-[0.18em]">
                {focus.label}
              </Pill>
            ))}
          </div>
        </div>
      </Link>
      <div className="mt-5 flex items-end justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            Session Rate
          </p>
          <p className="font-display text-[2rem] font-extrabold tracking-[-0.08em] text-[var(--ink)]">
            ${mentor.hourlyRateUsd}
            <span className="pl-1 text-sm font-semibold tracking-normal text-[var(--ink-muted)]">
              /hr
            </span>
          </p>
        </div>
        <Link
          href={`/mentors/${mentor.slug}/book`}
          className={buttonStyles({ variant: "primary", className: "shrink-0 px-6" })}
        >
          Book Session
        </Link>
      </div>
    </SurfaceCard>
  );
}

function CuratorInsightCard() {
  return (
    <SurfaceCard tone="soft" className="relative overflow-hidden px-5 py-6 sm:px-6">
      <div className="absolute inset-y-6 left-4 w-1 rounded-full bg-[var(--accent)]" />
      <div className="space-y-3 pl-4">
        <p className="eyebrow inline-flex items-center gap-2">
          <Sparkles className="size-3.5" />
          Curator Insight
        </p>
        <p className="max-w-[34rem] text-sm leading-7 text-[var(--ink-muted)]">
          Based on your interest in <span className="font-semibold text-[var(--ink)]">Distributed Systems</span>,
          mentors with infrastructure experience currently yield a 40% higher promotion rate
          for mentees in your bracket.
        </p>
      </div>
    </SurfaceCard>
  );
}

export function MentorDiscoveryPage() {
  return (
    <div className="mx-auto max-w-[760px] space-y-6 pb-6">
      <section className="space-y-4">
        <div className="max-w-[22rem] space-y-2">
          <p className="eyebrow">Discovery</p>
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[0.94] tracking-[-0.08em] text-[var(--ink)] sm:text-[3.25rem]">
            Find your next breakthrough.
          </h1>
          <p className="text-sm leading-7 text-[var(--ink-muted)] sm:text-base">
            Curated mentorship from industry leaders at world-class companies.
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {discoveryFilters.map((filter, index) => (
            <DiscoveryFilterChip key={filter} label={filter} active={index === 0} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        {discoveryMentors.map((mentor, index) => (
          <div key={mentor.id} className="space-y-4">
            <DiscoveryMentorCard mentor={mentor} />
            {index === 1 ? <CuratorInsightCard /> : null}
          </div>
        ))}
      </section>
    </div>
  );
}
