"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { passportSchema, type PassportFormData, seniorityLevels } from "@/lib/validations/passport";
import { toast } from "sonner";

export function PassportEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PassportFormData>({
    resolver: zodResolver(passportSchema),
    defaultValues: {
      career_summary: null,
      current_role_title: null,
      current_company: null,
      years_experience: null,
      seniority_level: null,
      skills: [],
      languages: [],
    },
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("");

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

      const { data: passport } = await supabase
        .from("career_passports")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (passport) {
        reset({
          career_summary: passport.career_summary,
          current_role_title: passport.current_role_title,
          current_company: passport.current_company,
          years_experience: passport.years_experience,
          seniority_level: passport.seniority_level,
          skills: passport.skills || [],
          languages: passport.languages || [],
        });
        setSkillsInput((passport.skills || []).join(", "));
        setLanguagesInput((passport.languages || []).join(", "));
      }

      setLoading(false);
    }

    load();
  }, [reset]);

  async function onSubmit(formData: PassportFormData) {
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

    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const languages = languagesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updateData = {
      ...formData,
      skills,
      languages,
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
      .from("career_passports")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("career_passports")
        .update(updateData)
        .eq("id", existing.id);
    } else {
      await supabase
        .from("career_passports")
        .insert({ user_id: user.id, ...updateData });
    }

    toast.success("Career Passport updated");
    setSaving(false);
    router.push("/passport");
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
        eyebrow="Career Passport"
        title="Edit your passport"
        description="Update your career information. This data powers all of Mastry's recommendations."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardTitle className="mb-4">Overview</CardTitle>
          <div className="space-y-4">
            <Input
              label="Current role title"
              placeholder="e.g. Senior Engineering Manager"
              error={errors.current_role_title?.message}
              {...register("current_role_title")}
            />
            <Input
              label="Current company"
              placeholder="e.g. Anthropic"
              error={errors.current_company?.message}
              {...register("current_company")}
            />
            <Input
              label="Years of experience"
              type="number"
              placeholder="e.g. 12"
              error={errors.years_experience?.message}
              {...register("years_experience", { valueAsNumber: true })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--ink)]">
                Seniority level
              </label>
              <select
                className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                {...register("seniority_level")}
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
          <CardTitle className="mb-4">Career Summary</CardTitle>
          <Textarea
            placeholder="Write a brief summary of your career, key achievements, and expertise..."
            error={errors.career_summary?.message}
            {...register("career_summary")}
          />
        </Card>

        <Card>
          <CardTitle className="mb-4">Skills & Languages</CardTitle>
          <div className="space-y-4">
            <Input
              label="Skills (comma-separated)"
              placeholder="e.g. TypeScript, React, System Design, Team Leadership"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
            />
            <Input
              label="Languages (comma-separated)"
              placeholder="e.g. English, French, Lingala"
              value={languagesInput}
              onChange={(e) => setLanguagesInput(e.target.value)}
            />
          </div>
        </Card>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="quiet"
            onClick={() => router.push("/passport")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving} className="flex-1">
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save passport"}
          </Button>
        </div>
      </form>
    </div>
  );
}
