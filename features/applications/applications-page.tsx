"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Mail,
  Sparkles,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Opportunity, ApplicationMaterial } from "@/types/domain";
import { toast } from "sonner";

export function ApplicationsPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [materials, setMaterials] = useState<ApplicationMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) { setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [oppsRes, matsRes] = await Promise.all([
        supabase
          .from("opportunities")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("application_materials")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      setOpportunities(oppsRes.data ?? []);
      setMaterials(matsRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleGenerate(opportunityId: string, type: "cover_letter" | "outreach_message") {
    setGenerating(`${opportunityId}-${type}`);
    try {
      const res = await fetch("/api/applications/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId, type }),
      });

      const json = await res.json();
      if (res.ok) {
        setMaterials((prev) => [json.data, ...prev]);
        setExpandedId(json.data.id);
        toast.success(`${type === "cover_letter" ? "Cover letter" : "Outreach message"} generated`);
      } else {
        toast.error(json.error);
      }
    } catch {
      toast.error("Failed to generate content");
    }
    setGenerating(null);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
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
        eyebrow="Application Workspace"
        title="Craft your applications"
        description="Generate cover letters and outreach messages tailored to each role, powered by your Career Passport."
      />

      {opportunities.length === 0 ? (
        <Card className="py-16 text-center">
          <FileText className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No opportunities yet</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Add opportunities in the Opportunity Scout first, then come back to generate application materials.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {opportunities.map((opp) => {
            const oppMaterials = materials.filter((m) => m.opportunity_id === opp.id);
            return (
              <Card key={opp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{opp.title}</CardTitle>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">{opp.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGenerate(opp.id, "cover_letter")}
                      disabled={generating === `${opp.id}-cover_letter`}
                      className={buttonStyles({ variant: "primary", size: "sm" })}
                    >
                      <FileText className="h-4 w-4" />
                      {generating === `${opp.id}-cover_letter` ? "Generating..." : "Cover letter"}
                    </button>
                    <button
                      onClick={() => handleGenerate(opp.id, "outreach_message")}
                      disabled={generating === `${opp.id}-outreach_message`}
                      className={buttonStyles({ variant: "quiet", size: "sm" })}
                    >
                      <Mail className="h-4 w-4" />
                      {generating === `${opp.id}-outreach_message` ? "Generating..." : "Outreach"}
                    </button>
                  </div>
                </div>

                {oppMaterials.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {oppMaterials.map((mat) => (
                      <div
                        key={mat.id}
                        className="rounded-2xl bg-[var(--surface-low)] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {mat.type === "cover_letter" ? (
                              <FileText className="h-4 w-4 text-[var(--ink)]" />
                            ) : (
                              <Mail className="h-4 w-4 text-[var(--ink)]" />
                            )}
                            <span className="text-sm font-semibold text-[var(--ink)]">
                              {mat.title}
                            </span>
                            <Badge>
                              {mat.type === "cover_letter" ? "Cover Letter" : "Outreach"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => copyToClipboard(mat.content)}
                              className={buttonStyles({ variant: "ghost", size: "sm" })}
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setExpandedId(expandedId === mat.id ? null : mat.id)}
                              className={buttonStyles({ variant: "ghost", size: "sm" })}
                            >
                              {expandedId === mat.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        {expandedId === mat.id && (
                          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink-muted)]">
                            {mat.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
