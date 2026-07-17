"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { seniorityLevels } from "@/lib/validations/passport";
import { remotePreferences } from "@/lib/validations/goals";
import type { CareerGoals } from "@/types/domain";
import { toast } from "sonner";

export function GoalsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [goals, setGoals] = useState<Partial<CareerGoals>>({
    target_role_title: "",
    target_seniority: null,
    preferred_industries: [],
    preferred_locations: [],
    remote_preference: "any",
    salary_min: null,
    salary_currency: "GBP",
    requires_sponsorship: false,
    is_actively_looking: true,
  });
  const [industriesInput, setIndustriesInput] = useState("");
  const [locationsInput, setLocationsInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) {
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("career_goals")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) {
        setGoals(data);
        setIndustriesInput((data.preferred_industries || []).join(", "));
        setLocationsInput((data.preferred_locations || []).join(", "));
      }

      setLoading(false);
    }

    load();
  }, []);

  async function handleSave() {
    setSaving(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      toast.error("Service unavailable");
      setSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }

    const payload = {
      user_id: user.id,
      target_role_title: goals.target_role_title || null,
      target_seniority: goals.target_seniority || null,
      preferred_industries: industriesInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      preferred_locations: locationsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      remote_preference: goals.remote_preference || "any",
      salary_min: goals.salary_min || null,
      salary_currency: goals.salary_currency || "GBP",
      requires_sponsorship: goals.requires_sponsorship ?? false,
      is_actively_looking: goals.is_actively_looking ?? true,
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
      .from("career_goals")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase.from("career_goals").update(payload).eq("id", existing.id);
    } else {
      await supabase.from("career_goals").insert(payload);
    }

    toast.success("Career goals saved");
    setSaving(false);
    router.push("/dashboard");
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-[var(--surface-low)]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <SectionHeading
        eyebrow="Career Goals"
        title="What are you looking for?"
        description="Tell Mastry what you want so we can find the right opportunities."
      />

      <div className="space-y-6">
        <Card>
          <CardTitle className="mb-4">Target Role</CardTitle>
          <div className="space-y-4">
            <Input
              label="Target role title"
              placeholder="e.g. Director of Engineering"
              value={goals.target_role_title || ""}
              onChange={(e) =>
                setGoals((g) => ({ ...g, target_role_title: e.target.value }))
              }
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">
                Target seniority
              </label>
              <select
                className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                value={goals.target_seniority || ""}
                onChange={(e) =>
                  setGoals((g) => ({
                    ...g,
                    target_seniority: (e.target.value || null) as CareerGoals["target_seniority"],
                  }))
                }
              >
                <option value="">Select level</option>
                {seniorityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle className="mb-4">Preferences</CardTitle>
          <div className="space-y-4">
            <Input
              label="Preferred industries (comma-separated)"
              placeholder="e.g. AI, Fintech, Healthcare"
              value={industriesInput}
              onChange={(e) => setIndustriesInput(e.target.value)}
            />
            <Input
              label="Preferred locations (comma-separated)"
              placeholder="e.g. London, New York, Remote"
              value={locationsInput}
              onChange={(e) => setLocationsInput(e.target.value)}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">
                Remote preference
              </label>
              <select
                className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                value={goals.remote_preference || "any"}
                onChange={(e) =>
                  setGoals((g) => ({
                    ...g,
                    remote_preference: e.target.value as CareerGoals["remote_preference"],
                  }))
                }
              >
                {remotePreferences.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref.charAt(0).toUpperCase() + pref.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <CardTitle className="mb-4">Compensation & Visa</CardTitle>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Minimum salary"
                type="number"
                placeholder="e.g. 120000"
                value={goals.salary_min ?? ""}
                onChange={(e) =>
                  setGoals((g) => ({
                    ...g,
                    salary_min: e.target.value ? Number(e.target.value) : null,
                  }))
                }
              />
              <Input
                label="Currency"
                placeholder="e.g. GBP"
                value={goals.salary_currency || ""}
                onChange={(e) =>
                  setGoals((g) => ({ ...g, salary_currency: e.target.value }))
                }
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={goals.requires_sponsorship ?? false}
                onChange={(e) =>
                  setGoals((g) => ({
                    ...g,
                    requires_sponsorship: e.target.checked,
                  }))
                }
                className="h-5 w-5 rounded accent-[var(--ink)]"
              />
              <span className="text-sm text-[var(--ink)]">
                I require visa sponsorship
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={goals.is_actively_looking ?? true}
                onChange={(e) =>
                  setGoals((g) => ({
                    ...g,
                    is_actively_looking: e.target.checked,
                  }))
                }
                className="h-5 w-5 rounded accent-[var(--ink)]"
              />
              <span className="text-sm text-[var(--ink)]">
                I am actively looking for a new role
              </span>
            </label>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="quiet" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="flex-1">
            <Target className="h-4 w-4" />
            {saving ? "Saving..." : "Save goals"}
          </Button>
        </div>
      </div>
    </div>
  );
}
