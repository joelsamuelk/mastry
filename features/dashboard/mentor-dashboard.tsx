import Link from "next/link";
import { CalendarDays, Plus, Video } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  mentorAiPerformanceInsight,
  mentorOverviewBookings,
  mentorOverviewRevenue,
  mentorPortalMentor,
} from "@/features/mentor/portal-data";
import { cn } from "@/lib/utils";

function BookingAction({ action }: { action: "video" | "calendar" | "none" }) {
  if (action === "none") {
    return (
      <div className="grid size-11 place-items-center rounded-full bg-[var(--surface-low)] text-[var(--muted)]">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em]">...</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid size-11 place-items-center rounded-full",
        action === "video"
          ? "bg-[var(--accent)] text-[var(--on-accent)]"
          : "bg-[var(--surface-low)] text-[var(--ink-muted)]",
      )}
    >
      {action === "video" ? <Video className="size-4" /> : <CalendarDays className="size-4" />}
    </div>
  );
}

export function MentorDashboard() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
          Command Center
        </h1>
        <p className="text-sm leading-7 text-[var(--ink-muted)] md:text-base">
          Welcome back, {mentorPortalMentor.name.split(" ")[0]}. Your trajectory is looking sharp.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.24fr_0.76fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">{mentorOverviewRevenue.eyebrow}</p>
                <p className="pt-3 font-display text-4xl font-extrabold tracking-[-0.08em] text-[var(--ink)] md:text-6xl">
                  {mentorOverviewRevenue.headline}
                </p>
              </div>
              <span className="rounded-full bg-[rgba(68,197,118,0.14)] px-3 py-1 text-xs font-semibold text-[#2b9d5a]">
                {mentorOverviewRevenue.delta}
              </span>
            </div>

            <div className="grid h-44 grid-cols-7 items-end gap-3">
              {mentorOverviewRevenue.bars.map((bar) => (
                <div key={bar.id} className="relative flex h-full items-end">
                  {bar.highlight ? (
                    <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-[var(--ink)] px-2.5 py-1 text-[0.58rem] font-semibold text-white">
                      {mentorOverviewRevenue.peakLabel}
                    </span>
                  ) : null}
                  <div
                    className={cn(
                      "w-full rounded-t-[34px]",
                      bar.highlight ? "bg-[var(--accent)]" : "bg-[var(--surface-high)]",
                    )}
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {mentorOverviewRevenue.stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {stat.label}
                  </p>
                  <p className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="soft" className="p-6 md:p-7">
          <div className="space-y-5">
            <div className="relative mx-auto flex size-32 items-center justify-center rounded-full bg-white shadow-[0_14px_32px_rgba(45,51,56,0.08)]">
              <div
                className="grid size-24 place-items-center rounded-full text-2xl font-display font-bold text-white"
                style={{ backgroundImage: mentorPortalMentor.avatarGradient }}
              >
                {mentorPortalMentor.initials}
              </div>
              <button
                type="button"
                className="absolute bottom-2 right-2 grid size-10 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)] shadow-[0_12px_28px_rgba(78,69,228,0.24)]"
                aria-label="Edit profile"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <div className="space-y-2 text-center">
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                {mentorPortalMentor.name}
              </h2>
              <p className="text-sm font-medium text-[var(--accent)]">
                {mentorPortalMentor.headline} Mentor
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {mentorPortalMentor.focusAreas.slice(0, 2).map((focus) => (
                  <Pill key={focus.id}>{focus.label}</Pill>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link href={`/mentors/${mentorPortalMentor.slug}`} className={buttonStyles({ variant: "secondary" })}>
                Public Profile
              </Link>
              <Link href="/mentor/availability" className={buttonStyles({ variant: "ghost" })}>
                Manage Availability
              </Link>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Active Bookings
                </h2>
              </div>
              <Link href="/mentor/bookings" className="text-sm font-semibold text-[var(--accent)]">
                View Calendar
              </Link>
            </div>

            <div className="space-y-4">
              {mentorOverviewBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={cn(
                    "grid gap-4 rounded-[30px] px-5 py-4 md:grid-cols-[84px_1fr_56px]",
                    booking.status === "tentative" ? "bg-[rgba(255,255,255,0.56)]" : "bg-white",
                  )}
                >
                  <div className="flex h-[72px] flex-col items-center justify-center rounded-[24px] bg-[var(--surface-low)] text-center">
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {booking.month}
                    </span>
                    <span className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                      {booking.day}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-base font-semibold text-[var(--ink)]">{booking.title}</p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      with {booking.person} • {booking.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-end">
                    <BookingAction action={booking.action} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard tone="soft" className="overflow-hidden p-6 md:p-7">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="eyebrow">AI Performance Insights</p>
              <div className="relative rounded-[28px] bg-white px-5 py-5 shadow-[0_10px_28px_rgba(45,51,56,0.04)]">
                <div className="absolute inset-y-5 left-0 w-1 rounded-full bg-[var(--accent)]" />
                <p className="pl-4 text-sm leading-7 text-[var(--ink-muted)]">
                  {mentorAiPerformanceInsight.quote}
                </p>
              </div>
            </div>

            <div className="rounded-[28px] bg-white px-5 py-5 shadow-[0_10px_28px_rgba(45,51,56,0.04)]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {mentorAiPerformanceInsight.themeLabel}
              </p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="grid size-14 place-items-center rounded-full bg-[rgba(78,69,228,0.1)] text-base font-bold text-[var(--accent)]">
                    {mentorAiPerformanceInsight.themeScore}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--ink)]">
                      {mentorAiPerformanceInsight.themeTitle}
                    </p>
                    <p className="text-sm text-[var(--ink-muted)]">
                      {mentorAiPerformanceInsight.themeBody}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="grid size-11 place-items-center rounded-full bg-[var(--ink)] text-white"
                  aria-label="Add note"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

            <div className="h-28 rounded-[24px] bg-[linear-gradient(145deg,rgba(45,51,56,0.14)_0%,rgba(45,51,56,0.04)_100%)]" />
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
