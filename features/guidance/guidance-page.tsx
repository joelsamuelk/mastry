import { buttonStyles } from "@/components/ui/button";
import { InsightCard } from "@/components/ui/insight-card";
import { SurfaceCard } from "@/components/ui/surface-card";
import { curatorInsights, dashboardPlan, featuredMentors } from "@/lib/mock-data";

export function GuidancePage() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="eyebrow">Clarity Engine</p>
          <h1 className="font-display text-balance text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Define your trajectory. We&apos;ll map the path.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--ink-muted)] md:text-base">
            AI guidance in Mastry is structured as documents, milestones, and focused next steps
            rather than a generic chat thread.
          </p>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-5">
            <p className="eyebrow">Core Objective</p>
            <div className="rounded-[28px] bg-[var(--surface-low)] p-5">
              <p className="text-sm font-semibold text-[var(--ink)]">Become a Principal Product Designer specializing in AI.</p>
            </div>
            <InsightCard
              eyebrow="Structured Guidance"
              title={dashboardPlan.title}
              body="Curate case-study fluency, publish thought leadership, and practice the decision narratives required for Principal-level scope."
              actions={["Refine Path"]}
              className="p-0"
            />
          </div>
        </SurfaceCard>
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-4">
            <p className="eyebrow">Milestones</p>
            {dashboardPlan.milestones.map((milestone) => (
              <div key={milestone.id} className="rounded-[28px] bg-[var(--surface-low)] p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-[var(--ink)]">{milestone.title}</h2>
                    <span className="text-sm font-semibold text-[var(--accent)]">
                      {milestone.masteryPercent}%
                    </span>
                  </div>
                  <p className="text-sm leading-7 text-[var(--ink-muted)]">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </SurfaceCard>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <InsightCard
          eyebrow={curatorInsights[1].eyebrow}
          title={curatorInsights[1].title}
          body={curatorInsights[1].body}
          actions={curatorInsights[1].actions}
        />
        <SurfaceCard tone="soft" className="p-6">
          <div className="space-y-4">
            <p className="eyebrow">Mentor Signal</p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
              {featuredMentors[1].name}
            </h2>
            <p className="text-sm leading-7 text-[var(--ink-muted)]">
              Best fit for your current plan because her session structure mirrors the milestone
              quality required for this track.
            </p>
            <button className={buttonStyles({ variant: "secondary" })}>View Profile</button>
          </div>
        </SurfaceCard>
      </div>
    </div>
  );
}
