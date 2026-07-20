"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Mail,
  Copy,
  ChevronDown,
  ChevronUp,
  Send,
  Heart,
  Sliders,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Opportunity, ApplicationMaterial } from "@/types/domain";
import { toast } from "sonner";

type ContentType = "cover_letter" | "outreach_message" | "follow_up" | "thank_you";
type Tone = "professional" | "conversational" | "assertive" | "creative";
type Version = "standard" | "concise" | "detailed" | "storytelling";

const toneLabels: Record<Tone, string> = {
  professional: "Professional",
  conversational: "Conversational",
  assertive: "Assertive",
  creative: "Creative",
};

const versionLabels: Record<Version, string> = {
  standard: "Standard",
  concise: "Concise",
  detailed: "Detailed",
  storytelling: "Storytelling",
};

export function ApplicationsPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [materials, setMaterials] = useState<ApplicationMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [tone, setTone] = useState<Tone>("professional");
  const [version, setVersion] = useState<Version>("standard");
  const [customInstructions, setCustomInstructions] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) { setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [oppsRes, matsRes] = await Promise.all([
        supabase.from("opportunities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("application_materials").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      setOpportunities(oppsRes.data ?? []);
      setMaterials(matsRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  async function handleGenerate(opportunityId: string, type: ContentType) {
    const key = `${opportunityId}-${type}`;
    setGenerating(key);
    try {
      const res = await fetch("/api/applications/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunityId,
          type,
          tone,
          version,
          custom_instructions: customInstructions || undefined,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setMaterials((prev) => [json.data, ...prev]);
        setExpandedId(json.data.id);
        setShowOptions(null);
        setCustomInstructions("");
        const labels: Record<string, string> = {
          cover_letter: "Cover letter",
          outreach_message: "Outreach message",
          follow_up: "Follow-up email",
          thank_you: "Thank-you note",
        };
        toast.success(`${labels[type]} generated`);
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
        description="Generate cover letters, outreach messages, follow-ups, and thank-you notes — with tone and style control."
      />

      {opportunities.length === 0 ? (
        <Card className="py-16 text-center">
          <FileText className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No opportunities yet</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Add opportunities in the Opportunity Scout or Job Discovery first, then come back to generate application materials.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {opportunities.map((opp) => {
            const oppMaterials = materials.filter((m) => m.opportunity_id === opp.id);
            const isOptionsOpen = showOptions === opp.id;

            return (
              <Card key={opp.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{opp.title}</CardTitle>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">{opp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowOptions(isOptionsOpen ? null : opp.id)}
                      className={buttonStyles({ variant: "quiet", size: "sm" })}
                      title="Customise"
                    >
                      <Sliders className="h-4 w-4" />
                    </button>
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
                      Outreach
                    </button>
                    <button
                      onClick={() => handleGenerate(opp.id, "follow_up")}
                      disabled={generating === `${opp.id}-follow_up`}
                      className={buttonStyles({ variant: "quiet", size: "sm" })}
                    >
                      <Send className="h-4 w-4" />
                      Follow-up
                    </button>
                    <button
                      onClick={() => handleGenerate(opp.id, "thank_you")}
                      disabled={generating === `${opp.id}-thank_you`}
                      className={buttonStyles({ variant: "quiet", size: "sm" })}
                    >
                      <Heart className="h-4 w-4" />
                      Thank you
                    </button>
                  </div>
                </div>

                {isOptionsOpen && (
                  <div className="mt-4 rounded-2xl bg-[var(--surface-low)] p-4 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                      Customisation
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--ink)]">Tone</label>
                        <div className="flex flex-wrap gap-1.5">
                          {(Object.keys(toneLabels) as Tone[]).map((t) => (
                            <button
                              key={t}
                              onClick={() => setTone(t)}
                              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                tone === t
                                  ? "bg-[var(--ink)] text-white"
                                  : "bg-white text-[var(--ink-muted)] hover:text-[var(--ink)]"
                              }`}
                            >
                              {toneLabels[t]}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[var(--ink)]">Style</label>
                        <div className="flex flex-wrap gap-1.5">
                          {(Object.keys(versionLabels) as Version[]).map((v) => (
                            <button
                              key={v}
                              onClick={() => setVersion(v)}
                              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                version === v
                                  ? "bg-[var(--ink)] text-white"
                                  : "bg-white text-[var(--ink-muted)] hover:text-[var(--ink)]"
                              }`}
                            >
                              {versionLabels[v]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Any special instructions? e.g. 'Emphasise my leadership experience' or 'Mention I was referred by Jane'"
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      rows={2}
                    />
                  </div>
                )}

                {oppMaterials.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {oppMaterials.map((mat) => (
                      <div key={mat.id} className="rounded-2xl bg-[var(--surface-low)] p-4">
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
                            {mat.metadata && (mat.metadata as Record<string, string>).tone && (
                              <Badge variant="accent">
                                {(mat.metadata as Record<string, string>).tone}
                              </Badge>
                            )}
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
