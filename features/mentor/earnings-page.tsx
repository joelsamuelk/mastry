import { BadgeDollarSign, Plus } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  mentorEarningsHighlights,
  mentorEarningsTrend,
  mentorPayoutMethods,
  mentorRecentPayouts,
} from "@/features/mentor/portal-data";
import { cn } from "@/lib/utils";

export function MentorEarningsPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
          Earnings
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
          Track revenue momentum, manage payout destinations, and keep the financial side of your
          mentor practice calm and predictable.
        </p>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Revenue Momentum</p>
                <p className="pt-3 font-display text-4xl font-extrabold tracking-[-0.08em] text-[var(--ink)] md:text-6xl">
                  $64,920
                </p>
              </div>
              <span className="rounded-full bg-[rgba(68,197,118,0.14)] px-3 py-1 text-xs font-semibold text-[#2b9d5a]">
                +18% YoY
              </span>
            </div>

            <div className="grid h-48 grid-cols-7 items-end gap-3">
              {mentorEarningsTrend.map((bar) => (
                <div key={bar.id} className="space-y-3">
                  <div className="flex h-40 items-end">
                    <div
                      className={cn(
                        "w-full rounded-t-[32px]",
                        bar.highlight ? "bg-[var(--accent)]" : "bg-[var(--surface-high)]",
                      )}
                      style={{ height: `${bar.value}%` }}
                    />
                  </div>
                  <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {bar.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          {mentorEarningsHighlights.map((highlight, index) => (
            <SurfaceCard
              key={highlight.label}
              className={cn(
                "p-6",
                index === 1
                  ? "bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] text-white"
                  : "",
              )}
            >
              <p
                className={cn(
                  "text-[0.68rem] font-semibold uppercase tracking-[0.22em]",
                  index === 1 ? "text-white/70" : "text-[var(--muted)]",
                )}
              >
                {highlight.label}
              </p>
              <p className="pt-3 font-display text-4xl font-bold tracking-[-0.06em]">
                {highlight.value}
              </p>
              <p className={cn("pt-1 text-sm", index === 1 ? "text-white/80" : "text-[var(--accent)]")}>
                {highlight.note}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.06fr_0.94fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Payout Methods
                </h2>
                <p className="pt-1 text-sm text-[var(--ink-muted)]">
                  Your default destinations for scheduled disbursements.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {mentorPayoutMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between gap-4 rounded-[28px] bg-[var(--surface-low)] px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-full bg-white text-xs font-bold text-[var(--ink)] shadow-[0_10px_24px_rgba(45,51,56,0.04)]">
                      {method.brand}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--ink)]">{method.label}</p>
                      <p className="text-xs text-[var(--ink-muted)]">{method.detail}</p>
                    </div>
                  </div>
                  <button type="button" className="text-sm font-semibold text-[var(--muted)]">
                    ...
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-dashed border-[rgba(172,179,184,0.45)] px-5 text-sm font-semibold text-[var(--ink-muted)]"
            >
              <Plus className="size-4" />
              Add Payout Method
            </button>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard tone="soft" className="p-6">
            <div className="space-y-4">
              <div className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[var(--accent)]">
                <BadgeDollarSign className="size-4" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Recent Payouts
                </h2>
                <p className="pt-2 text-sm leading-7 text-[var(--ink-muted)]">
                  Keep an eye on what has already landed and which destination received it.
                </p>
              </div>

              <div className="space-y-3">
                {mentorRecentPayouts.map((payout) => (
                  <div key={payout.id} className="rounded-[24px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(45,51,56,0.04)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--ink)]">{payout.date}</p>
                      <span className="rounded-full bg-[rgba(68,197,118,0.14)] px-3 py-1 text-[0.68rem] font-semibold text-[#2b9d5a]">
                        {payout.status}
                      </span>
                    </div>
                    <p className="pt-2 font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                      {payout.amount}
                    </p>
                    <p className="pt-1 text-sm text-[var(--ink-muted)]">{payout.destination}</p>
                  </div>
                ))}
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <div className="space-y-4">
              <p className="eyebrow">Payout Cadence</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Disbursements run twice per month.
              </h2>
              <p className="text-sm leading-7 text-[var(--ink-muted)]">
                The next payout batch closes on October 17. Keep one primary account active to
                avoid transfer delays.
              </p>
              <button className={buttonStyles({ variant: "secondary" })}>Manage Finance Settings</button>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </div>
  );
}
