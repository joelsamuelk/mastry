import { SurfaceCard } from "@/components/ui/surface-card";
import { adminMetrics, featuredMentors } from "@/lib/mock-data";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="eyebrow">System Administration</p>
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Mastry Command
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
            Oversee the mentor ecosystem, manage quality standards, user growth, and the operating
            health of the Personal OS.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 lg:grid-cols-3">
        {adminMetrics.map((metric, index) => (
          <SurfaceCard
            key={metric.label}
            className={`p-6 ${index === 2 ? "bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] text-white" : ""}`}
          >
            <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.22em] ${index === 2 ? "text-white/70" : "text-[var(--muted)]"}`}>
              {metric.label}
            </p>
            <p className="pt-3 font-display text-4xl font-bold tracking-[-0.06em]">
              {metric.value}
            </p>
            <p className={`pt-1 text-sm ${index === 2 ? "text-white/80" : "text-[var(--accent)]"}`}>
              {metric.note}
            </p>
          </SurfaceCard>
        ))}
      </div>

      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Mentors Directory</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Current mentor surface area
              </h2>
            </div>
            <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              System Live
            </span>
          </div>
          <div className="overflow-hidden rounded-[28px] bg-[var(--surface-low)]">
            <div className="grid grid-cols-[1.4fr_1fr_0.8fr] gap-4 px-5 py-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              <span>Identity</span>
              <span>Focus Area</span>
              <span>Status</span>
            </div>
            {featuredMentors.slice(0, 3).map((mentor, index) => (
              <div
                key={mentor.id}
                className={`grid grid-cols-[1.4fr_1fr_0.8fr] gap-4 px-5 py-4 ${index !== 2 ? "border-b border-transparent" : ""}`}
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{mentor.name}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{mentor.company}</p>
                </div>
                <p className="text-sm text-[var(--ink-muted)]">{mentor.focusAreas[0]?.label}</p>
                <p className="text-sm font-semibold text-[var(--accent)]">Active Now</p>
              </div>
            ))}
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
