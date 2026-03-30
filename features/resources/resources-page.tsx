import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { growthResources } from "@/lib/mock-data";

export function ResourcesPage() {
  const [featured, ...resources] = growthResources;

  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="eyebrow">Curated For You</p>
          <h1 className="font-display text-balance text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Recommended resources that reinforce the current plan.
          </h1>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="rounded-[32px] bg-[linear-gradient(145deg,#1a2438_0%,#4e45e4_100%)] p-6 text-white">
            <p className="eyebrow !text-white/80">{featured.category}</p>
            <h2 className="font-display pt-3 text-4xl font-bold tracking-[-0.05em]">
              {featured.title}
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm leading-7 text-[var(--ink-muted)]">{featured.summary}</p>
            <div className="h-2 rounded-full bg-[var(--surface-low)]">
              <div
                className="h-full rounded-full bg-[var(--accent)]"
                style={{ width: `${featured.completionPercent}%` }}
              />
            </div>
            <button className={buttonStyles({ variant: "primary" })}>Resume Path</button>
          </div>
        </div>
      </SurfaceCard>

      <div className="grid gap-5">
        {resources.map((resource) => (
          <SurfaceCard key={resource.id} className="p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="space-y-2">
                <p className="eyebrow">{resource.category}</p>
                <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  {resource.title}
                </h3>
                <p className="text-sm leading-7 text-[var(--ink-muted)]">{resource.summary}</p>
              </div>
              <div className="min-w-[160px] space-y-3">
                <div className="h-2 rounded-full bg-[var(--surface-low)]">
                  <div
                    className="h-full rounded-full bg-[var(--accent)]"
                    style={{ width: `${resource.completionPercent}%` }}
                  />
                </div>
                <p className="text-right text-sm font-semibold text-[var(--ink)]">
                  {resource.completionPercent}% complete
                </p>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
