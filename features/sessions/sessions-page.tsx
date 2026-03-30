import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { sessionHistory } from "@/lib/mock-data";

export function SessionsPage() {
  const [upcoming, ...history] = sessionHistory;

  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="eyebrow">Sessions</p>
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Your curated growth roadmap.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
            Upcoming milestones, past reflections, and the operating notes that turn sessions into
            compounding momentum.
          </p>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden p-6 md:p-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Coming Up</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                {upcoming.title}
              </h2>
            </div>
            <span className="text-sm font-semibold text-[var(--accent)]">{upcoming.date}</span>
          </div>
          <div className="rounded-[28px] bg-[var(--surface-low)] p-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[var(--ink)]">
                {upcoming.time} with {upcoming.mentor}
              </p>
              <p className="text-sm text-[var(--ink-muted)]">
                {upcoming.type} • {upcoming.duration}
              </p>
            </div>
          </div>
          <button className={buttonStyles({ variant: "primary" })}>Prepare for Session</button>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-5">
            <p className="eyebrow">Activity History</p>
            {history.map((session) => (
              <div key={session.id} className="rounded-[28px] bg-[var(--surface-low)] p-5">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {session.date}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--ink)]">{session.title}</h3>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">{session.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
        <SurfaceCard tone="soft" className="p-6">
          <div className="space-y-4">
            <p className="eyebrow">Weekly Reflection</p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
              Four sessions completed.
            </h2>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              The strongest change this month is how you frame delegated change under pressure.
              Capture a reflection while the pattern is still fresh.
            </p>
            <button className={buttonStyles({ variant: "secondary" })}>Capture Reflection</button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
