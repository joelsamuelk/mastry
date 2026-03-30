"use client";

import { useState } from "react";
import { CalendarDays, MessageSquareQuote, Video } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  mentorBookingRequests,
  mentorBookingStats,
  mentorDetailedBookings,
} from "@/features/mentor/portal-data";
import { cn } from "@/lib/utils";

const filters = ["Upcoming", "Requests", "Completed"] as const;

export function MentorBookingsManagementPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Upcoming");

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
          Bookings
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
          Manage upcoming sessions, respond to requests, and keep preparation tight before each
          conversation.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {mentorBookingStats.map((stat) => (
          <SurfaceCard key={stat.label} className="p-5 md:p-6">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {stat.label}
            </p>
            <p className="pt-3 font-display text-4xl font-bold tracking-[-0.06em] text-[var(--ink)]">
              {stat.value}
            </p>
            <p className="pt-1 text-sm text-[var(--accent)]">{stat.note}</p>
          </SurfaceCard>
        ))}
      </div>

      <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Session Queue
              </h2>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold transition",
                      activeFilter === filter
                        ? "bg-[var(--accent)] text-[var(--on-accent)]"
                        : "bg-[var(--surface-low)] text-[var(--ink-muted)]",
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {mentorDetailedBookings.map((booking) => (
                <div key={booking.id} className="rounded-[30px] bg-[var(--surface-low)] p-5">
                  <div className="grid gap-4 lg:grid-cols-[84px_1fr_172px] lg:items-start">
                    <div className="flex h-[76px] flex-col items-center justify-center rounded-[24px] bg-white text-center shadow-[0_10px_24px_rgba(45,51,56,0.04)]">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {booking.month}
                      </span>
                      <span className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                        {booking.day}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold text-[var(--ink)]">{booking.title}</h3>
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
                            booking.status === "Confirmed"
                              ? "bg-[rgba(68,197,118,0.14)] text-[#2b9d5a]"
                              : "bg-white text-[var(--muted)]",
                          )}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-[var(--ink-muted)]">
                        <p>
                          {booking.student} • {booking.studentRole}
                        </p>
                        <p>{booking.time}</p>
                      </div>
                      <div className="rounded-[24px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(45,51,56,0.04)]">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                          Preparation
                        </p>
                        <p className="pt-2 text-sm leading-7 text-[var(--ink-muted)]">
                          {booking.preparation}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className={buttonStyles({ variant: "primary" })}>
                        <Video className="size-4" />
                        Join Session
                      </button>
                      <button className={buttonStyles({ variant: "secondary" })}>
                        <CalendarDays className="size-4" />
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard tone="soft" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-white text-[var(--accent)]">
                  <MessageSquareQuote className="size-4" />
                </div>
                <div>
                  <p className="eyebrow">Request Queue</p>
                  <h2 className="text-2xl font-semibold text-[var(--ink)]">New requests</h2>
                </div>
              </div>

              <div className="space-y-3">
                {mentorBookingRequests.map((request) => (
                  <div key={request.id} className="rounded-[24px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(45,51,56,0.04)]">
                    <p className="text-sm font-semibold text-[var(--ink)]">{request.name}</p>
                    <p className="pt-2 text-sm leading-7 text-[var(--ink-muted)]">{request.note}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button className={buttonStyles({ variant: "primary" })}>Approve Slot</button>
                <button className={buttonStyles({ variant: "ghost" })}>Dismiss</button>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <div className="space-y-4">
              <p className="eyebrow">Ops Note</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Protect your prep window.
              </h2>
              <p className="text-sm leading-7 text-[var(--ink-muted)]">
                Thursday sessions with design leaders convert best when you preserve 30 minutes of
                note review beforehand. Keep that buffer locked.
              </p>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </div>
  );
}
