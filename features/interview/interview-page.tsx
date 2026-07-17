"use client";

import { useEffect, useState } from "react";
import {
  MessageSquare,
  Star,
  Building2,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Opportunity, InterviewPrep } from "@/types/domain";
import { toast } from "sonner";

const difficultyColor = {
  easy: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  hard: "bg-red-50 text-red-700",
};

export function InterviewPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [preps, setPreps] = useState<InterviewPrep[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activePrep, setActivePrep] = useState<InterviewPrep | null>(null);
  const [activeTab, setActiveTab] = useState<"questions" | "star" | "research" | "ask">("questions");
  const [manualCompany, setManualCompany] = useState("");
  const [manualRole, setManualRole] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) { setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [oppsRes, prepsRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("interview_preps").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      setOpportunities(oppsRes.data ?? []);
      setPreps(prepsRes.data ?? []);
      if (prepsRes.data && prepsRes.data.length > 0) {
        setActivePrep(prepsRes.data[0]);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handlePrepare(opportunityId: string | null, company: string, role_title: string) {
    setGenerating(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId, company, role_title }),
      });

      const json = await res.json();
      if (res.ok) {
        setPreps((prev) => [json.data, ...prev]);
        setActivePrep(json.data);
        setActiveTab("questions");
        toast.success("Interview prep ready");
      } else {
        toast.error(json.error);
      }
    } catch {
      toast.error("Failed to generate interview prep");
    }
    setGenerating(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-8 w-64" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading
        eyebrow="Interview Coach"
        title="Prepare to impress"
        description="Get likely questions, STAR examples from your real experience, company research, and questions to ask. All tailored to each role."
      />

      {/* Generate prep */}
      <Card className="mb-6">
        <CardTitle className="mb-4">Prepare for an interview</CardTitle>

        {opportunities.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-sm text-[var(--ink-muted)]">From your saved opportunities:</p>
            <div className="flex flex-wrap gap-2">
              {opportunities.map((opp) => (
                <button
                  key={opp.id}
                  onClick={() => handlePrepare(opp.id, opp.company, opp.title)}
                  disabled={generating}
                  className={buttonStyles({ variant: "quiet", size: "sm" })}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {opp.title} at {opp.company}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-[var(--surface-high)] pt-4">
          <p className="mb-3 text-sm text-[var(--ink-muted)]">Or enter manually:</p>
          <div className="flex gap-3">
            <Input
              placeholder="Company name"
              value={manualCompany}
              onChange={(e) => setManualCompany(e.target.value)}
            />
            <Input
              placeholder="Role title"
              value={manualRole}
              onChange={(e) => setManualRole(e.target.value)}
            />
            <Button
              onClick={() => {
                if (!manualCompany || !manualRole) {
                  toast.error("Enter both company and role");
                  return;
                }
                handlePrepare(null, manualCompany, manualRole);
              }}
              disabled={generating}
            >
              {generating ? "Preparing..." : "Prepare"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Prep results */}
      {activePrep && (
        <div>
          {/* Prep selector */}
          {preps.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {preps.map((prep) => (
                <button
                  key={prep.id}
                  onClick={() => { setActivePrep(prep); setActiveTab("questions"); }}
                  className={buttonStyles({
                    variant: activePrep.id === prep.id ? "primary" : "quiet",
                    size: "sm",
                  })}
                >
                  {prep.role_title} at {prep.company}
                </button>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="mb-4 flex gap-1 rounded-2xl bg-[var(--surface-low)] p-1">
            {([
              { key: "questions" as const, label: "Questions", icon: MessageSquare },
              { key: "star" as const, label: "STAR Examples", icon: Star },
              { key: "research" as const, label: "Company", icon: Building2 },
              { key: "ask" as const, label: "Ask Them", icon: HelpCircle },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-white text-[var(--ink)] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Questions tab */}
          {activeTab === "questions" && (
            <div className="space-y-3">
              {activePrep.likely_questions.map((q, i) => (
                <Card key={i}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--ink)]">{q.question}</p>
                      <p className="mt-2 text-sm text-[var(--ink-muted)]">{q.suggested_approach}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <Badge>{q.category}</Badge>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${difficultyColor[q.difficulty]}`}>
                        {q.difficulty}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* STAR tab */}
          {activeTab === "star" && (
            <div className="space-y-4">
              {activePrep.star_examples.map((star, i) => (
                <Card key={i}>
                  <Badge variant="accent" className="mb-3">{star.question_theme}</Badge>
                  <div className="space-y-3">
                    {([
                      { label: "Situation", text: star.situation },
                      { label: "Task", text: star.task },
                      { label: "Action", text: star.action },
                      { label: "Result", text: star.result },
                    ]).map((part) => (
                      <div key={part.label}>
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                          {part.label}
                        </span>
                        <p className="mt-1 text-sm text-[var(--ink-muted)]">{part.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Company research tab */}
          {activeTab === "research" && activePrep.company_research && (
            <div className="space-y-4">
              <Card>
                <CardTitle className="mb-3">Key Points</CardTitle>
                <ul className="space-y-2">
                  {activePrep.company_research.key_points.map((point, i) => (
                    <li key={i} className="text-sm text-[var(--ink-muted)] before:content-['•_'] before:text-[var(--ink)]">
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <CardTitle className="mb-3">Culture & Values</CardTitle>
                <p className="text-sm text-[var(--ink-muted)]">{activePrep.company_research.culture_notes}</p>
              </Card>
              {activePrep.company_research.recent_news.length > 0 && (
                <Card>
                  <CardTitle className="mb-3">Recent News</CardTitle>
                  <ul className="space-y-2">
                    {activePrep.company_research.recent_news.map((news, i) => (
                      <li key={i} className="text-sm text-[var(--ink-muted)] before:content-['📰_']">
                        {news}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}

          {/* Questions to ask tab */}
          {activeTab === "ask" && (
            <Card>
              <CardTitle className="mb-4">Questions to ask the interviewer</CardTitle>
              <div className="space-y-3">
                {activePrep.questions_to_ask.map((q, i) => (
                  <div key={i} className="rounded-2xl bg-[var(--surface-low)] p-4">
                    <p className="text-sm text-[var(--ink)]">{q}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {!activePrep && preps.length === 0 && (
        <Card className="py-16 text-center">
          <MessageSquare className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No interview preps yet</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Select an opportunity above or enter a company and role to generate your first interview prep pack.
          </p>
        </Card>
      )}
    </div>
  );
}
