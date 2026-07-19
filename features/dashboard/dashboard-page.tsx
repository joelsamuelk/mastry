"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Upload, Target, Fingerprint, ArrowRight, Search, FileText, Shield, MessageSquare, Globe, Calendar, Mic } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { CareerPassport, CareerGoals, Employer, Education } from "@/types/domain";

interface PassportData {
  passport: CareerPassport | null;
  employers: Employer[];
  education: Education[];
  goals: CareerGoals | null;
}

function calculateCompleteness(data: PassportData): number {
  if (!data.passport) return 0;

  const checks = [
    !!data.passport.career_summary,
    !!data.passport.current_role_title,
    !!data.passport.current_company,
    data.passport.years_experience !== null,
    !!data.passport.seniority_level,
    data.passport.skills.length > 0,
    data.employers.length > 0,
    data.education.length > 0,
    !!data.goals,
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

export function DashboardPage() {
  const [data, setData] = useState<PassportData | null>(null);
  const [loading, setLoading] = useState(true);

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

      const passportRes = await supabase
        .from("career_passports")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      const passportId = passportRes.data?.id;

      const [employersRes, educationRes, goalsRes] = await Promise.all([
        passportId
          ? supabase
              .from("employers")
              .select("*")
              .eq("passport_id", passportId)
              .order("start_date", { ascending: false })
          : Promise.resolve({ data: [] as Employer[] }),
        passportId
          ? supabase
              .from("education")
              .select("*")
              .eq("passport_id", passportId)
          : Promise.resolve({ data: [] as Education[] }),
        supabase
          .from("career_goals")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
      ]);

      setData({
        passport: passportRes.data,
        employers: employersRes.data ?? [],
        education: educationRes.data ?? [],
        goals: goalsRes.data,
      });
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-xl bg-[var(--surface-low)]" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-[2rem] bg-[var(--surface-low)]" />
          ))}
        </div>
      </div>
    );
  }

  const completeness = data ? calculateCompleteness(data) : 0;
  const hasPassport = data?.passport?.career_summary;
  const hasGoals = !!data?.goals;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-[var(--ink)]">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">
          Your career mastery at a glance
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Passport completeness */}
        <Card className="flex flex-col items-center justify-center gap-4 text-center">
          <ProgressRing value={completeness} label="Complete" />
          <div>
            <CardTitle>Career Passport</CardTitle>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              {completeness < 100
                ? "Keep building your passport for better matches"
                : "Your passport is complete"}
            </p>
          </div>
          <Link
            href="/passport"
            className={buttonStyles({ variant: "quiet", size: "sm" })}
          >
            <Fingerprint className="h-4 w-4" />
            {hasPassport ? "View passport" : "Start building"}
          </Link>
        </Card>

        {/* Upload CV */}
        <Card className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--surface-low)]">
            <Upload className="h-6 w-6 text-[var(--ink)]" />
          </div>
          <div>
            <CardTitle>Upload CV</CardTitle>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              {data?.passport?.raw_cv_url
                ? "CV uploaded. You can re-upload anytime"
                : "Upload your CV to auto-build your passport"}
            </p>
          </div>
          <Link
            href="/upload"
            className={buttonStyles({ variant: "quiet", size: "sm" })}
          >
            <Upload className="h-4 w-4" />
            {data?.passport?.raw_cv_url ? "Re-upload" : "Upload CV"}
          </Link>
        </Card>

        {/* Career goals */}
        <Card className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(16,185,129,0.08)]">
            <Target className="h-6 w-6 text-[var(--success)]" />
          </div>
          <div>
            <CardTitle>Career Goals</CardTitle>
            <p className="mt-1 text-xs text-[var(--ink-muted)]">
              {hasGoals
                ? "Goals set. Update anytime"
                : "Set your goals so Mastry can find the right roles"}
            </p>
          </div>
          <Link
            href="/goals"
            className={buttonStyles({ variant: "quiet", size: "sm" })}
          >
            <Target className="h-4 w-4" />
            {hasGoals ? "Edit goals" : "Set goals"}
          </Link>
        </Card>
      </div>

      {/* Feature shortcuts */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Job Discovery", href: "/discover", icon: Globe, desc: "AI-powered job search" },
          { label: "Opportunity Scout", href: "/opportunities", icon: Search, desc: "Track & score roles" },
          { label: "Applications", href: "/applications", icon: FileText, desc: "Cover letters & outreach" },
          { label: "Scheduler", href: "/scheduler", icon: Calendar, desc: "Manage interviews" },
          { label: "Interview Coach", href: "/interview", icon: MessageSquare, desc: "Prep for interviews" },
          { label: "Mock Interview", href: "/mock-interview", icon: Mic, desc: "Practice with AI" },
          { label: "Visa Intelligence", href: "/visa", icon: Shield, desc: "Work permit analysis" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-[2rem] bg-white p-5 shadow-[0_12px_40px_rgba(45,51,56,0.04)] transition duration-200 ease-out hover:-translate-y-0.5"
          >
            <item.icon className="mb-3 h-5 w-5 text-[var(--ink)]" />
            <div className="text-sm font-semibold text-[var(--ink)]">{item.label}</div>
            <div className="mt-0.5 text-xs text-[var(--ink-muted)]">{item.desc}</div>
          </Link>
        ))}
      </div>

      {/* Quick summary */}
      {data?.passport && (
        <div className="mt-10">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  {data.passport.current_role_title || "Your career"}
                </CardTitle>
                {data.passport.current_company && (
                  <p className="mt-1 text-sm text-[var(--ink-muted)]">
                    at {data.passport.current_company}
                  </p>
                )}
              </div>
              {data.passport.seniority_level && (
                <Badge variant="accent">
                  {data.passport.seniority_level.replace("_", " ")}
                </Badge>
              )}
            </div>

            {data.passport.skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.passport.skills.slice(0, 8).map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
                {data.passport.skills.length > 8 && (
                  <Badge>+{data.passport.skills.length - 8}</Badge>
                )}
              </div>
            )}

            <Link
              href="/passport"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:underline"
            >
              View full passport
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}
