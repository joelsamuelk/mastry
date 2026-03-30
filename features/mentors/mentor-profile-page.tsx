"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Rocket, Sparkles, Target } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { MentorPortrait } from "@/components/ui/mentor-portrait";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { Mentor } from "@/types/domain";

interface MentorProfilePageProps {
  mentor: Mentor;
}

const expertiseIcons = {
  sparkles: Sparkles,
  briefcase: BriefcaseBusiness,
  target: Target,
  rocket: Rocket,
} as const;

export function MentorProfilePage({ mentor }: MentorProfilePageProps) {
  const [selectedSessionId, setSelectedSessionId] = useState(
    mentor.sessionTypes.find((session) => session.featured)?.id ?? mentor.sessionTypes[0]?.id ?? "",
  );

  const selectedSession =
    mentor.sessionTypes.find((session) => session.id === selectedSessionId) ?? mentor.sessionTypes[0];

  return (
    <div className="mx-auto max-w-[760px] space-y-7 pb-8">
      <section className="space-y-4">
        <SurfaceCard className="p-3">
          <div className="relative">
            <MentorPortrait
              initials={mentor.initials}
              gradient={mentor.avatarGradient}
              className="aspect-[5/5.6] w-full rounded-[28px] sm:aspect-[5/4.4]"
            />
            {mentor.badges?.length ? (
              <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-2">
                {mentor.badges.map((badge) => (
                  <span
                    key={badge.id}
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em]",
                      badge.tone === "accent"
                        ? "bg-[var(--accent)] text-[var(--on-accent)]"
                        : "bg-white/92 text-[var(--ink)]",
                    )}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </SurfaceCard>

        <div className="space-y-4 px-1">
          <div className="space-y-2">
            <div>
              <h1 className="font-display text-[2.4rem] font-extrabold leading-[0.94] tracking-[-0.08em] text-[var(--ink)] sm:text-[3rem]">
                {mentor.name}
              </h1>
              <p className="pt-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {mentor.headline} at {mentor.company}
              </p>
            </div>
            <p className="max-w-[38rem] text-sm leading-7 text-[var(--ink-muted)]">{mentor.bio}</p>
          </div>

          {mentor.profileStats?.length ? (
            <div className="grid grid-cols-3 gap-3">
              {mentor.profileStats.map((stat) => (
                <div key={stat.id} className="rounded-[24px] bg-white px-4 py-4 shadow-[0_10px_28px_rgba(45,51,56,0.04)]">
                  <p className="font-display text-[1.35rem] font-extrabold tracking-[-0.06em] text-[var(--ink)]">
                    {stat.value}
                  </p>
                  <p className="pt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {mentor.expertise?.length ? (
        <section className="space-y-3">
          <h2 className="px-1 text-lg font-semibold text-[var(--ink)]">Expertise</h2>
          <div className="space-y-3">
            {mentor.expertise.map((item) => {
              const Icon = expertiseIcons[item.icon ?? "sparkles"];

              return (
                <SurfaceCard key={item.id} tone="soft" className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-white text-[var(--accent)]">
                        <Icon className="size-4" />
                      </div>
                      {item.eyebrow ? <p className="eyebrow">{item.eyebrow}</p> : null}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-[1.3rem] font-bold tracking-[-0.05em] text-[var(--ink)]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-7 text-[var(--ink-muted)]">{item.description}</p>
                    </div>
                  </div>
                </SurfaceCard>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3 px-1">
          <h2 className="text-lg font-semibold text-[var(--ink)]">Available Sessions</h2>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {mentor.location}
          </p>
        </div>
        <div className="space-y-3">
          {mentor.sessionTypes.map((session) => {
            const selected = session.id === selectedSessionId;

            return (
              <button
                key={session.id}
                type="button"
                onClick={() => setSelectedSessionId(session.id)}
                className={cn(
                  "w-full rounded-[28px] p-5 text-left transition duration-200 ease-out",
                  selected
                    ? "bg-white shadow-[0_14px_32px_rgba(45,51,56,0.08)]"
                    : "bg-[var(--surface-low)] hover:-translate-y-0.5",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "mt-1 grid size-6 shrink-0 place-items-center rounded-full border transition",
                      selected
                        ? "border-[var(--accent)] bg-[var(--accent)]"
                        : "border-[rgba(172,179,184,0.3)] bg-white",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full transition",
                        selected ? "bg-[var(--on-accent)]" : "bg-transparent",
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-display text-[1.2rem] font-bold tracking-[-0.05em] text-[var(--ink)]">
                          {session.title}
                        </h3>
                        <p className="text-sm leading-6 text-[var(--ink-muted)]">{session.description}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-display text-[1.35rem] font-extrabold tracking-[-0.06em] text-[var(--ink)]">
                          ${session.priceUsd}
                        </p>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                          {session.deliveryMode === "async" ? "Async" : "Per Session"}
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {session.durationMinutes} minutes
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {mentor.careerHistory?.length ? (
        <section className="space-y-3">
          <h2 className="px-1 text-lg font-semibold text-[var(--ink)]">Career History</h2>
          <div className="space-y-4">
            {mentor.careerHistory.map((entry) => (
              <div key={entry.id} className="relative pl-7">
                <div className="absolute left-1 top-2 size-2.5 rounded-full bg-[var(--accent)]" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-[var(--ink)]">{entry.company}</h3>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[var(--accent)]">{entry.role}</p>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">{entry.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {selectedSession ? (
        <SurfaceCard tone="soft" className="p-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Selected Session</p>
                <h2 className="pt-2 font-display text-[1.45rem] font-bold tracking-[-0.05em] text-[var(--ink)]">
                  {selectedSession.title}
                </h2>
                <p className="pt-1 text-sm text-[var(--ink-muted)]">
                  {selectedSession.durationMinutes} minutes with {mentor.name.split(" ")[0]}
                </p>
              </div>
              <p className="font-display text-[1.6rem] font-extrabold tracking-[-0.06em] text-[var(--ink)]">
                ${selectedSession.priceUsd}
              </p>
            </div>
            <Link
              href={`/mentors/${mentor.slug}/book?session=${selectedSession.id}`}
              className={buttonStyles({ variant: "primary", size: "lg", className: "w-full" })}
            >
              Book Session
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </SurfaceCard>
      ) : null}
    </div>
  );
}
