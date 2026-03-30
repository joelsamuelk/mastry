"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Shield } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pill } from "@/components/ui/pill";
import { SurfaceCard } from "@/components/ui/surface-card";
import {
  mentorNotificationSettings,
  mentorPayoutMethods,
  mentorPortalMentor,
  mentorProfileFields,
  mentorSecurityNote,
  mentorSessionOffering,
  mentorSettingsTabs,
} from "@/features/mentor/portal-data";
import { cn } from "@/lib/utils";

function Toggle({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "relative h-7 w-12 rounded-full transition",
        checked ? "bg-[var(--accent)]" : "bg-[var(--surface-high)]",
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          "absolute top-1 size-5 rounded-full bg-white transition",
          checked ? "right-1" : "left-1",
        )}
      />
    </button>
  );
}

export function MentorProfileManagementPage() {
  const [activeTab, setActiveTab] = useState<(typeof mentorSettingsTabs)[number]>("Account");
  const [selectedSessionId, setSelectedSessionId] = useState(
    mentorPortalMentor.sessionTypes.find((session) => session.featured)?.id ??
      mentorPortalMentor.sessionTypes[0]?.id ??
      "",
  );
  const [notifications, setNotifications] = useState(() =>
    Object.fromEntries(mentorNotificationSettings.map((item) => [item.id, item.enabled])),
  );

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--ink)] md:text-5xl">
            Settings
          </h1>
          <p className="text-sm leading-7 text-[var(--ink-muted)] md:text-base">
            Manage your public presence, mentor packaging, and account controls.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {mentorSettingsTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "inline-flex h-11 items-center rounded-full px-5 text-sm font-semibold transition",
                activeTab === tab
                  ? "bg-white text-[var(--accent)] shadow-[0_10px_26px_rgba(45,51,56,0.05)]"
                  : "text-[var(--ink-muted)] hover:bg-white",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                  Profile Identity
                </h2>
                <p className="pt-1 text-sm text-[var(--ink-muted)]">
                  Manage your public presence and personal brand.
                </p>
              </div>
              <button type="button" className="text-sm font-semibold text-[var(--accent)]">
                Edit
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-[140px_1fr]">
              <div
                className="flex aspect-square items-center justify-center rounded-[32px] text-4xl font-display font-bold text-white shadow-[0_14px_34px_rgba(45,51,56,0.1)]"
                style={{ backgroundImage: mentorPortalMentor.avatarGradient }}
              >
                {mentorPortalMentor.initials}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Display Name
                  </label>
                  <Input defaultValue={mentorProfileFields.displayName} />
                </div>
                <div className="space-y-2">
                  <label className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Primary Expertise
                  </label>
                  <Input defaultValue={mentorProfileFields.primaryExpertise} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Biography
              </label>
              <textarea
                defaultValue={mentorProfileFields.biography}
                className="min-h-32 w-full rounded-[28px] bg-[var(--surface-low)] px-5 py-4 text-sm leading-7 text-[var(--ink)] outline-none transition focus-visible:ring-2 focus-visible:ring-[rgba(78,69,228,0.28)]"
              />
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard className="bg-[linear-gradient(145deg,#4e45e4_0%,#4135d8_100%)] p-6 text-white md:p-8">
            <div className="space-y-6">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Growth Tier
                </p>
                <h2 className="pt-3 font-display text-4xl font-bold tracking-[-0.06em]">
                  Professional OS
                </h2>
              </div>
              <div className="space-y-3 text-sm text-white/85">
                <p>Unlimited mentor networking</p>
                <p>Advanced AI strategy tools</p>
                <p>Priority 1:1 booking</p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-white/70">Renews on Oct 12, 2024</p>
                  <p className="pt-2 text-3xl font-bold">
                    $49<span className="text-base font-medium">/mo</span>
                  </p>
                </div>
                <button className={buttonStyles({ variant: "secondary" })}>Manage Plan</button>
              </div>
            </div>
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[var(--ink)]">Notifications</h2>
              {mentorNotificationSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between gap-4 rounded-[24px] bg-[var(--surface-low)] p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">{setting.title}</p>
                    <p className="text-xs text-[var(--ink-muted)]">{setting.description}</p>
                  </div>
                  <Toggle
                    checked={Boolean(notifications[setting.id])}
                    onToggle={() =>
                      setNotifications((current) => ({
                        ...current,
                        [setting.id]: !current[setting.id],
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard tone="soft" className="p-6">
            <div className="space-y-3">
              <div className="inline-flex size-10 items-center justify-center rounded-full bg-white text-[var(--accent)]">
                <Shield className="size-4" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--ink)]">{mentorSecurityNote.title}</h2>
                <p className="pt-2 text-sm leading-7 text-[var(--ink-muted)]">
                  {mentorSecurityNote.body}
                </p>
              </div>
              <button type="button" className="text-sm font-semibold text-[var(--accent)]">
                {mentorSecurityNote.action}
              </button>
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <SurfaceCard className="p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <p className="eyebrow">Service Offering</p>
              <h2 className="pt-3 font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Define how you wish to mentor.
              </h2>
              <p className="pt-2 text-sm leading-7 text-[var(--ink-muted)]">
                Set your rates and choose session types. Mastry handles the logistics so you can
                focus on the growth.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {mentorPortalMentor.sessionTypes.map((session) => {
                const selected = session.id === selectedSessionId;

                return (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => setSelectedSessionId(session.id)}
                    className={cn(
                      "rounded-[30px] p-5 text-left transition",
                      selected
                        ? "bg-white ring-2 ring-[rgba(78,69,228,0.8)] shadow-[0_14px_34px_rgba(45,51,56,0.08)]"
                        : "bg-[var(--surface-low)] hover:-translate-y-0.5",
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="grid size-11 place-items-center rounded-[16px] bg-[rgba(78,69,228,0.1)] text-[var(--accent)]">
                          <CheckCircle2 className="size-4" />
                        </div>
                        {selected ? (
                          <span className="grid size-6 place-items-center rounded-full bg-[var(--accent)] text-[var(--on-accent)]">
                            <CheckCircle2 className="size-3.5" />
                          </span>
                        ) : null}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--ink)]">{session.title}</h3>
                        <p className="pt-2 text-sm leading-7 text-[var(--ink-muted)]">
                          {session.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <SurfaceCard tone="soft" className="p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                <div className="space-y-2">
                  <label className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    Standard Rate (USD)
                  </label>
                  <Input defaultValue={mentorSessionOffering.standardRate} />
                  <p className="text-xs text-[var(--muted)]">
                    Average mentors in your field charge $120-$200/session.
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-[24px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(45,51,56,0.04)]">
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)]">Pro bono option</p>
                    <p className="text-xs text-[var(--ink-muted)]">Offer 1 session/month free</p>
                  </div>
                  <Toggle checked={mentorSessionOffering.proBonoEnabled} onToggle={() => {}} />
                </div>
              </div>
            </SurfaceCard>

            <div className="space-y-3">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Thematic Focus Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {mentorSessionOffering.focusAreas.map((area) => (
                  <Pill key={area}>{area}</Pill>
                ))}
                <button
                  type="button"
                  className="inline-flex h-8 items-center rounded-full border border-dashed border-[rgba(172,179,184,0.45)] px-3 text-xs font-semibold text-[var(--accent)]"
                >
                  + Add Category
                </button>
              </div>
            </div>
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard tone="soft" className="p-6">
            <div className="space-y-4">
              <p className="eyebrow">Payout Methods</p>
              {mentorPayoutMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between gap-4 rounded-[26px] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(45,51,56,0.04)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-full bg-[var(--surface-low)] text-xs font-bold text-[var(--ink)]">
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
          </SurfaceCard>

          <SurfaceCard className="p-6">
            <div className="space-y-4">
              <p className="eyebrow">Public Presence</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.05em] text-[var(--ink)]">
                Keep your public profile sharp.
              </h2>
              <p className="text-sm leading-7 text-[var(--ink-muted)]">
                Every update here flows into mentor discovery, booking confidence, and repeat
                client signal.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/mentors/${mentorPortalMentor.slug}`}
                  className={buttonStyles({ variant: "secondary" })}
                >
                  Preview Profile
                </Link>
                <Link href="/mentor/availability" className={buttonStyles({ variant: "ghost" })}>
                  Edit Availability
                </Link>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </div>
  );
}
