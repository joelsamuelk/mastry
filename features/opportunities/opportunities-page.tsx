"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  MapPin,
  Building2,
  TrendingUp,
  Zap,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Opportunity, MatchBreakdown } from "@/types/domain";
import { toast } from "sonner";

function MatchScoreBadge({ score }: { score: number | null }) {
  if (score === null) return null;
  const color =
    score >= 80 ? "text-emerald-600 bg-emerald-50" :
    score >= 60 ? "text-amber-600 bg-amber-50" :
    "text-red-500 bg-red-50";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${color}`}>
      <TrendingUp className="h-3 w-3" />
      {score}% match
    </span>
  );
}

function MatchBreakdownCard({ breakdown }: { breakdown: MatchBreakdown }) {
  const dimensions = [
    { label: "Leadership", value: breakdown.leadership_fit },
    { label: "Domain", value: breakdown.domain_fit },
    { label: "Technical", value: breakdown.technical_fit },
    { label: "Seniority", value: breakdown.seniority_fit },
    { label: "Compensation", value: breakdown.compensation_fit },
    { label: "Visa", value: breakdown.visa_fit },
    { label: "Growth", value: breakdown.growth_potential },
  ];

  return (
    <div className="mt-4 space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {dimensions.map((d) => (
          <div key={d.label} className="rounded-xl bg-[var(--surface-low)] p-2 text-center">
            <div className="text-xs text-[var(--ink-muted)]">{d.label}</div>
            <div className="text-sm font-bold text-[var(--ink)]">{d.value}%</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--ink-muted)]">{breakdown.summary}</p>
    </div>
  );
}

export function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [scoring, setScoring] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary_min: "",
    salary_max: "",
    remote_type: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    loadOpportunities();
  }, []);

  async function loadOpportunities() {
    const res = await fetch("/api/opportunities");
    const json = await res.json();
    setOpportunities(json.data ?? []);
    setLoading(false);
  }

  async function handleAdd() {
    if (!form.title || !form.company) {
      toast.error("Title and company are required");
      return;
    }

    const res = await fetch("/api/opportunities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        remote_type: form.remote_type || null,
      }),
    });

    const json = await res.json();
    if (res.ok) {
      setOpportunities((prev) => [json.data, ...prev]);
      setForm({ title: "", company: "", location: "", salary_min: "", salary_max: "", remote_type: "", description: "", url: "" });
      setShowForm(false);
      toast.success("Opportunity saved");
    } else {
      toast.error(json.error);
    }
  }

  async function handleScore(id: string) {
    setScoring(id);
    const res = await fetch("/api/opportunities/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ opportunityId: id }),
    });

    const json = await res.json();
    if (res.ok) {
      setOpportunities((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, match_score: json.score, match_breakdown: json.breakdown } : o
        )
      );
      setExpandedId(id);
      toast.success(`Match score: ${json.score}%`);
    } else {
      toast.error(json.error);
    }
    setScoring(null);
  }

  async function handleDelete(id: string) {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("opportunities").delete().eq("id", id);
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    toast.success("Opportunity removed");
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-8 w-64" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 flex items-start justify-between">
        <SectionHeading
          eyebrow="Opportunity Scout"
          title="Find your next role"
          description="Add job opportunities and let Mastry score how well they match your profile."
          className="mb-0"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className={buttonStyles({ variant: "primary", size: "sm" })}
        >
          <Plus className="h-4 w-4" />
          Add role
        </button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardTitle className="mb-4">Add an opportunity</CardTitle>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Job title *"
                placeholder="e.g. Senior Product Manager"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
              <Input
                label="Company *"
                placeholder="e.g. Stripe"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Location"
                placeholder="e.g. London"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
              <Input
                label="Min salary"
                type="number"
                placeholder="80000"
                value={form.salary_min}
                onChange={(e) => setForm((f) => ({ ...f, salary_min: e.target.value }))}
              />
              <Input
                label="Max salary"
                type="number"
                placeholder="120000"
                value={form.salary_max}
                onChange={(e) => setForm((f) => ({ ...f, salary_max: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Remote type</label>
                <select
                  className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(78,69,228,0.35)]"
                  value={form.remote_type}
                  onChange={(e) => setForm((f) => ({ ...f, remote_type: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
              <Input
                label="Job URL"
                placeholder="https://..."
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
              />
            </div>
            <Textarea
              label="Job description"
              placeholder="Paste the full job description here for better matching..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={6}
            />
            <div className="flex gap-3">
              <Button variant="quiet" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4" />
                Save opportunity
              </Button>
            </div>
          </div>
        </Card>
      )}

      {opportunities.length === 0 ? (
        <Card className="py-16 text-center">
          <Search className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No opportunities yet</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Add a job you&apos;re interested in and Mastry will score how well it matches your profile.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opp) => (
            <Card key={opp.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle>{opp.title}</CardTitle>
                    <MatchScoreBadge score={opp.match_score} />
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5" />
                      {opp.company}
                    </span>
                    {opp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {opp.location}
                      </span>
                    )}
                    {opp.remote_type && (
                      <Badge variant="accent">{opp.remote_type}</Badge>
                    )}
                  </div>
                  {opp.salary_min && (
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {opp.salary_currency || "GBP"} {opp.salary_min.toLocaleString()}
                      {opp.salary_max && ` - ${opp.salary_max.toLocaleString()}`}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {opp.url && (
                    <a
                      href={opp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonStyles({ variant: "ghost", size: "sm" })}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleScore(opp.id)}
                    disabled={scoring === opp.id}
                    className={buttonStyles({ variant: opp.match_score ? "quiet" : "primary", size: "sm" })}
                  >
                    <Zap className="h-4 w-4" />
                    {scoring === opp.id ? "Scoring..." : opp.match_score ? "Re-score" : "Score match"}
                  </button>
                  <button
                    onClick={() => handleDelete(opp.id)}
                    className={buttonStyles({ variant: "ghost", size: "sm" })}
                  >
                    <Trash2 className="h-4 w-4 text-[var(--danger)]" />
                  </button>
                </div>
              </div>

              {opp.match_breakdown && expandedId === opp.id && (
                <MatchBreakdownCard breakdown={opp.match_breakdown} />
              )}

              {opp.match_score !== null && (
                <button
                  onClick={() => setExpandedId(expandedId === opp.id ? null : opp.id)}
                  className="mt-3 text-xs font-medium text-[var(--accent)] hover:underline"
                >
                  {expandedId === opp.id ? "Hide breakdown" : "Show match breakdown"}
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
