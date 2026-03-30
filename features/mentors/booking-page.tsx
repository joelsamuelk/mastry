"use client";

import { useState } from "react";
import Link from "next/link";
import {
  addDays,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ArrowLeft, CheckCircle2, ChevronDown, Circle } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import type { Mentor } from "@/types/domain";

interface BookingPageProps {
  mentor: Mentor;
  initialSessionId?: string;
}

const weekdayLabels = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

export function BookingPage({ mentor, initialSessionId }: BookingPageProps) {
  const selectedSession =
    mentor.sessionTypes.find((session) => session.id === initialSessionId) ??
    mentor.sessionTypes.find((session) => session.featured) ??
    mentor.sessionTypes[0];

  const availability = mentor.availability ?? [];
  const defaultDay = availability[0];
  const [selectedDayId, setSelectedDayId] = useState(defaultDay?.id ?? "");
  const activeDay = availability.find((day) => day.id === selectedDayId) ?? defaultDay;
  const defaultSlot = activeDay?.slots.find((slot) => slot.available);
  const [selectedSlotId, setSelectedSlotId] = useState(defaultSlot?.id ?? "");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const monthDate = activeDay ? startOfMonth(parseISO(activeDay.isoDate)) : startOfMonth(new Date());
  const calendarStart = startOfWeek(monthDate, { weekStartsOn: 1 });
  const calendarDays = Array.from({ length: 21 }, (_, index) => addDays(calendarStart, index));
  const selectedSlot = activeDay?.slots.find((slot) => slot.id === selectedSlotId) ?? defaultSlot;

  const handleDaySelect = (dayId: string) => {
    setIsConfirmed(false);
    setSelectedDayId(dayId);

    const day = availability.find((entry) => entry.id === dayId);
    const nextSlot = day?.slots.find((slot) => slot.available);
    setSelectedSlotId(nextSlot?.id ?? "");
  };

  const summaryDate = selectedSlot ? parseISO(selectedSlot.startsAt) : null;
  const summaryText =
    summaryDate && selectedSession
      ? `${format(summaryDate, "EEEE, MMM d")} at ${format(summaryDate, "hh:mm a")}. ${
          selectedSession.deliveryMode === "async"
            ? `A scheduled handoff for ${selectedSession.title.toLowerCase()} with recorded feedback and clear follow-through.`
            : selectedSession.description
        }`
      : "Select a session slot to build your booking summary.";

  return (
    <div className="mx-auto max-w-[760px] space-y-6 pb-8">
      <div className="flex items-center gap-3 px-1">
        <Link
          href={`/mentors/${mentor.slug}`}
          className="grid size-11 place-items-center rounded-full bg-white text-[var(--ink)] shadow-[0_12px_30px_rgba(45,51,56,0.05)]"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="font-semibold text-[var(--ink)]">Book Session</p>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {selectedSession?.title ?? "Mentor Session"}
          </p>
        </div>
      </div>

      <SurfaceCard className="p-5">
        <div className="flex items-center gap-4">
          <div
            className="grid size-16 shrink-0 place-items-center rounded-full text-base font-bold text-white shadow-[0_12px_28px_rgba(45,51,56,0.14)]"
            style={{ backgroundImage: mentor.avatarGradient }}
          >
            {mentor.initials}
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-[1.7rem] font-extrabold tracking-[-0.06em] text-[var(--ink)]">
              {mentor.name}
            </h1>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              {mentor.headline} &amp; {mentor.company}
            </p>
          </div>
        </div>
      </SurfaceCard>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3 px-1">
          <h2 className="font-display text-[2rem] font-extrabold tracking-[-0.07em] text-[var(--ink)]">
            Select Date
          </h2>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)] shadow-[0_10px_26px_rgba(45,51,56,0.04)]">
            {format(monthDate, "LLLL yyyy")}
            <ChevronDown className="size-4" />
          </div>
        </div>

        <SurfaceCard className="p-5">
          <div className="grid grid-cols-7 gap-y-4 text-center">
            {weekdayLabels.map((label) => (
              <span
                key={label}
                className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]"
              >
                {label}
              </span>
            ))}
            {calendarDays.map((day) => {
              const availableDay = availability.find((item) =>
                isSameDay(parseISO(item.isoDate), day),
              );
              const selected = activeDay ? isSameDay(parseISO(activeDay.isoDate), day) : false;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={!availableDay}
                  onClick={() => availableDay && handleDaySelect(availableDay.id)}
                  className={cn(
                    "mx-auto grid size-11 place-items-center rounded-full text-sm font-semibold transition duration-200 ease-out",
                    selected
                      ? "bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] text-[var(--on-accent)] shadow-[0_14px_28px_rgba(78,69,228,0.24)]"
                      : availableDay
                        ? "text-[var(--ink)] hover:bg-[var(--surface-low)]"
                        : isSameMonth(day, monthDate)
                          ? "text-[var(--muted)]"
                          : "text-[rgba(153,161,171,0.55)]",
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </SurfaceCard>
      </section>

      <section className="space-y-4">
        <h2 className="px-1 font-display text-[2rem] font-extrabold tracking-[-0.07em] text-[var(--ink)]">
          Available Slots
        </h2>

        {activeDay ? (
          <div className="grid grid-cols-2 gap-3">
            {activeDay.slots.map((slot) => {
              const selected = slot.id === selectedSlotId;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => {
                    setIsConfirmed(false);
                    setSelectedSlotId(slot.id);
                  }}
                  className={cn(
                    "flex h-16 items-center justify-between rounded-full px-5 text-left transition duration-200 ease-out",
                    selected
                      ? "bg-[rgba(78,69,228,0.1)] text-[var(--accent)] shadow-[0_10px_24px_rgba(78,69,228,0.08)] ring-1 ring-[rgba(78,69,228,0.3)]"
                      : slot.available
                        ? "bg-white text-[var(--ink)] shadow-[0_10px_24px_rgba(45,51,56,0.04)] hover:-translate-y-0.5"
                        : "bg-[rgba(255,255,255,0.5)] text-[rgba(153,161,171,0.75)]",
                  )}
                >
                  <span className="font-semibold">{format(parseISO(slot.startsAt), "hh:mm a")}</span>
                  {selected ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
                </button>
              );
            })}
          </div>
        ) : (
          <SurfaceCard tone="soft" className="p-5">
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Availability will appear here once this mentor opens new booking windows.
            </p>
          </SurfaceCard>
        )}
      </section>

      <SurfaceCard tone="soft" className="p-5">
        <div className="flex items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          <span>Session Summary</span>
          <span>{selectedSession?.durationMinutes ?? 0} Minutes</span>
        </div>
        <p className="pt-4 text-sm leading-7 text-[var(--ink-muted)]">{summaryText}</p>
      </SurfaceCard>

      <div className="space-y-3 pb-3">
        <button
          type="button"
          disabled={!selectedSlot}
          onClick={() => setIsConfirmed(true)}
          className={buttonStyles({
            variant: "primary",
            size: "lg",
            className: "w-full disabled:hover:translate-y-0",
          })}
        >
          {isConfirmed ? "Booking Reserved" : "Confirm Booking"}
        </button>
        <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Cancel anytime up to 24h before
        </p>

        {isConfirmed ? (
          <SurfaceCard className="p-5">
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Booking confirmed in preview mode. Payment and calendar delivery will connect here
              once the live checkout and Supabase booking writes are wired.
            </p>
          </SurfaceCard>
        ) : null}
      </div>
    </div>
  );
}
