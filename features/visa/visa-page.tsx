"use client";

import { useState } from "react";
import {
  Shield,
  Globe,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import type { VisaAnalysis } from "@/lib/ai/visa-analyzer";
import { toast } from "sonner";

const eligibilityIcon = {
  likely: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  possible: <HelpCircle className="h-4 w-4 text-amber-500" />,
  unlikely: <XCircle className="h-4 w-4 text-red-500" />,
  unknown: <HelpCircle className="h-4 w-4 text-[var(--ink-muted)]" />,
};

const difficultyColor = {
  easy: "text-emerald-600 bg-emerald-50",
  moderate: "text-amber-600 bg-amber-50",
  difficult: "text-orange-600 bg-orange-50",
  very_difficult: "text-red-600 bg-red-50",
};

export function VisaPage() {
  const [nationality, setNationality] = useState("");
  const [analysis, setAnalysis] = useState<VisaAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!nationality.trim()) {
      toast.error("Please enter your nationality");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/visa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nationality }),
    });

    const json = await res.json();
    if (res.ok) {
      setAnalysis(json.data);
    } else {
      toast.error(json.error);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading
        eyebrow="Visa Intelligence"
        title="Understand your work permit options"
        description="Get factual visa analysis based on your profile, skills, and target locations. Never claims sponsorship unless evidence exists."
      />

      <Card className="mb-6">
        <CardTitle className="mb-4">Your nationality</CardTitle>
        <p className="mb-4 text-sm text-[var(--ink-muted)]">
          Enter your nationality so we can analyze work visa options for your preferred locations (set in Career Goals).
        </p>
        <div className="flex gap-3">
          <Input
            placeholder="e.g. Nigerian, Indian, Brazilian"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAnalyze} disabled={loading}>
            <Shield className="h-4 w-4" />
            {loading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </Card>

      {analysis && (
        <div className="space-y-6">
          {/* Overall assessment */}
          <Card>
            <div className="flex items-start gap-3">
              <Globe className="mt-0.5 h-5 w-5 text-[var(--ink)]" />
              <div>
                <CardTitle>Overview</CardTitle>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                  {analysis.overall_assessment}
                </p>
              </div>
            </div>
          </Card>

          {/* Per-location analysis */}
          {analysis.locations.map((loc) => (
            <Card key={loc.location}>
              <div className="flex items-center justify-between">
                <CardTitle>{loc.location}</CardTitle>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${difficultyColor[loc.difficulty]}`}>
                  {loc.difficulty.replace("_", " ")}
                </span>
              </div>

              <p className="mt-2 text-sm text-[var(--ink-muted)]">
                {loc.sponsorship_landscape}
              </p>

              <div className="mt-4 space-y-3">
                {loc.visa_types.map((visa) => (
                  <div
                    key={visa.name}
                    className="rounded-2xl bg-[var(--surface-low)] p-4"
                  >
                    <div className="flex items-center gap-2">
                      {eligibilityIcon[visa.eligibility]}
                      <span className="text-sm font-semibold text-[var(--ink)]">
                        {visa.name}
                      </span>
                      <Badge variant={visa.eligibility === "likely" ? "accent" : "default"}>
                        {visa.eligibility}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">
                      {visa.description}
                    </p>
                    {visa.requirements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {visa.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-[var(--muted)] before:content-['•_'] before:text-[var(--ink)]">
                            {req}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Recommendations */}
          {analysis.recommendations.length > 0 && (
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-[var(--ink)]" />
                <CardTitle>Recommendations</CardTitle>
              </div>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="text-sm text-[var(--ink-muted)] before:content-['→_'] before:text-[var(--ink)]">
                    {rec}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Disclaimer */}
          <Card className="bg-amber-50/50">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
              <p className="text-sm text-amber-800">{analysis.disclaimer}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
