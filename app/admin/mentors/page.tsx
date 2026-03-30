import { SurfaceCard } from "@/components/ui/surface-card";
import { featuredMentors } from "@/lib/mock-data";

export default function AdminMentorsPage() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <p className="eyebrow">Mentor Approvals</p>
        <h1 className="font-display pt-3 text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
          Review mentor quality and operational status.
        </h1>
      </SurfaceCard>
      <div className="grid gap-4">
        {featuredMentors.map((mentor) => (
          <SurfaceCard key={mentor.id} tone="soft" className="p-6">
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <p className="text-lg font-semibold text-[var(--ink)]">{mentor.name}</p>
                <p className="text-sm text-[var(--ink-muted)]">
                  {mentor.headline} at {mentor.company}
                </p>
              </div>
              <p className="text-sm font-semibold text-[var(--accent)]">Approved</p>
              <p className="text-sm text-[var(--ink-muted)]">${mentor.hourlyRateUsd}/hr</p>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
