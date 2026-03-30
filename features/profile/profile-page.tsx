import { buttonStyles } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/surface-card";

export function ProfilePage() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6 md:p-8">
        <div className="space-y-4">
          <p className="eyebrow">Account</p>
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Profile identity and system preferences.
          </h1>
        </div>
      </SurfaceCard>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-[180px_1fr]">
              <div className="flex aspect-square items-center justify-center rounded-[32px] bg-[linear-gradient(145deg,#1f2737_0%,#4e45e4_100%)] text-5xl font-display font-bold text-white">
                AV
              </div>
              <div className="space-y-5">
                <div>
                  <p className="eyebrow">Profile Identity</p>
                  <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                    Alexander Vance
                  </h2>
                  <p className="text-sm text-[var(--ink-muted)]">
                    Growth Tier: Professional OS
                  </p>
                </div>
                <div className="rounded-[28px] bg-[var(--surface-low)] p-5 text-sm leading-7 text-[var(--ink-muted)]">
                  Dedicated to scaling high-growth technology companies through operational
                  excellence and strategic mentorship.
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SurfaceCard tone="soft" className="p-5">
                <p className="text-sm font-semibold text-[var(--ink)]">Saved mentors</p>
                <p className="pt-2 text-sm text-[var(--ink-muted)]">14 profiles</p>
              </SurfaceCard>
              <SurfaceCard tone="soft" className="p-5">
                <p className="text-sm font-semibold text-[var(--ink)]">Account settings</p>
                <p className="pt-2 text-sm text-[var(--ink-muted)]">Security & data</p>
              </SurfaceCard>
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard tone="soft" className="p-6">
            <div className="space-y-3">
              <p className="eyebrow">Billing</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Professional OS
              </h2>
              <p className="text-sm leading-7 text-[var(--ink-muted)]">
                Unlimited mentor networking, advanced AI strategy tools, and priority booking.
              </p>
              <button className={buttonStyles({ variant: "primary" })}>Manage Plan</button>
            </div>
          </SurfaceCard>
          <SurfaceCard className="p-6">
            <div className="space-y-4">
              <p className="eyebrow">Notifications</p>
              {[
                "Session reminders",
                "Mentor messages",
                "Growth insights",
              ].map((item, index) => (
                <div key={item} className="flex items-center justify-between gap-4 rounded-[24px] bg-[var(--surface-low)] p-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{item}</p>
                    <p className="text-xs text-[var(--ink-muted)]">Quietly stay in sync</p>
                  </div>
                  <div
                    className={`relative h-7 w-12 rounded-full ${
                      index < 2 ? "bg-[var(--accent)]" : "bg-[var(--surface-high)]"
                    }`}
                  >
                    <div
                      className={`absolute top-1 size-5 rounded-full bg-white transition ${
                        index < 2 ? "right-1" : "left-1"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </div>
      </div>
    </div>
  );
}
