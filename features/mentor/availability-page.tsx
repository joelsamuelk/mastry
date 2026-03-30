"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  mentorAvailabilityQuote,
  mentorAvailabilityRules,
  mentorAvailabilitySteps,
  mentorAvailabilitySuggestion,
  mentorWeeklyAvailability,
} from "@/features/mentor/portal-data";
import { cn } from "@/lib/utils";

export function MentorAvailabilityManagementPage() {
  const [selectedDayId, setSelectedDayId] = useState(
    mentorWeeklyAvailability.find((day) => day.enabled)?.id ?? mentorWeeklyAvailability[0]?.id ?? "",
  );
  const selectedDay = useMemo(
    () => mentorWeeklyAvailability.find((day) => day.id === selectedDayId) ?? mentorWeeklyAvailability[0],
    [selectedDayId],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[240px_1fr]">
      <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
        <div className="space-y-4">
          <div>
            <p className="eyebrow">Availability Setup</p>
            <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)]">
              Curate your week.
            </h1>
          </div>
          <div className="space-y-4">
            {mentorAvailabilitySteps.map((step, index) => (
              <div key={step} className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 grid size-8 place-items-center rounded-full text-sm font-bold",
                    index === 2
                      ? "bg-[var(--accent)] text-[var(--on-accent)]"
                      : index === 1
                        ? "border border-[rgba(78,69,228,0.35)] text-[var(--accent)]"
                        : "bg-[var(--surface-high)] text-[var(--ink-muted)]",
                  )}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Step {index + 1}
                  </p>
                  <p className="text-sm font-semibold text-[var(--ink)]">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SurfaceCard tone="soft" className="p-5">
          <div className="space-y-4">
            <p className="text-sm italic leading-7 text-[var(--ink-muted)]">
              &quot;{mentorAvailabilityQuote.body}&quot;
            </p>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              {mentorAvailabilityQuote.source}
            </p>
          </div>
        </SurfaceCard>
      </aside>

      <div className="space-y-6">
        <section className="space-y-3">
          <p className="eyebrow">Availability Windows</p>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Set when you&apos;re available to mentor.
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
            Shape a weekly pattern that protects your focus while keeping the highest-demand
            windows bookable.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_340px]">
          <SurfaceCard className="p-6 md:p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                    Weekly Pattern
                  </h3>
                  <p className="pt-1 text-sm text-[var(--ink-muted)]">
                    Choose which days stay open and how dense each mentoring block should be.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {mentorWeeklyAvailability.map((day) => {
                  const selected = day.id === selectedDayId;

                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => setSelectedDayId(day.id)}
                      className={cn(
                        "rounded-[30px] p-5 text-left transition",
                        selected
                          ? "bg-white ring-2 ring-[rgba(78,69,228,0.8)] shadow-[0_14px_34px_rgba(45,51,56,0.08)]"
                          : "bg-[var(--surface-low)] hover:-translate-y-0.5",
                      )}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-lg font-semibold text-[var(--ink)]">{day.label}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                              {day.demand}
                            </p>
                          </div>
                          <span
                            className={cn(
                              "inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold",
                              day.enabled
                                ? "bg-[rgba(68,197,118,0.14)] text-[#2b9d5a]"
                                : "bg-white text-[var(--muted)]",
                            )}
                          >
                            {day.enabled ? "Open" : "Closed"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {day.windows.length ? (
                            day.windows.map((slot) => (
                              <span
                                key={slot}
                                className="rounded-full bg-white px-3 py-1 text-[0.68rem] font-semibold text-[var(--ink-muted)]"
                              >
                                {slot}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-[var(--ink-muted)]">
                              No bookable windows configured.
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </SurfaceCard>

          <div className="grid gap-5">
            <SurfaceCard tone="soft" className="p-6">
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  {selectedDay?.label ?? "Selected Day"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDay?.windows.length ? (
                    selectedDay.windows.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--ink)] shadow-[0_10px_24px_rgba(45,51,56,0.04)]"
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-[var(--ink-muted)]">
                      This day is currently closed. Reopen it to accept new requests.
                    </p>
                  )}
                </div>
                <button className={buttonStyles({ variant: "secondary" })}>Add Time Slot</button>
              </div>
            </SurfaceCard>

            <SurfaceCard className="p-6">
              <div className="space-y-4">
                <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Booking Rules
                </h3>
                <div className="space-y-3">
                  {mentorAvailabilityRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="rounded-[24px] bg-[var(--surface-low)] px-4 py-4"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        {rule.label}
                      </p>
                      <p className="pt-2 text-sm font-semibold text-[var(--ink)]">{rule.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SurfaceCard>
          </div>
        </section>

        <SurfaceCard tone="soft" className="p-6 md:p-7">
          <div className="space-y-4">
            <p className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="size-3.5" />
              Demand Signal
            </p>
            <p className="max-w-3xl text-sm leading-7 text-[var(--ink-muted)]">
              {mentorAvailabilitySuggestion}
            </p>
          </div>
        </SurfaceCard>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/mentor/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink-muted)]">
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <Link href="/mentor/bookings" className={buttonStyles({ variant: "primary", size: "lg" })}>
            Save Availability
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
