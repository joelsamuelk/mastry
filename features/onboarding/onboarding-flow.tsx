"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Upload, Target, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Brand } from "@/components/brand/brand";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { seniorityLevels } from "@/lib/validations/passport";
import { toast } from "sonner";

type Step = "welcome" | "cv" | "goals" | "complete";

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>("welcome");
  const [loading, setLoading] = useState(false);
  const [cvText, setCvText] = useState("");
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [parsing, setParsing] = useState(false);
  const [goals, setGoals] = useState({
    target_role_title: "",
    target_seniority: "",
    remote_preference: "any",
    requires_sponsorship: false,
  });
  const router = useRouter();


  async function handleParseCV() {
    if (cvText.trim().length < 50) {
      toast.error("Please provide more CV content");
      return;
    }

    setParsing(true);
    try {
      const res = await fetch("/api/cv/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText }),
      });

      if (!res.ok) {
        toast.error("Parsing failed. You can add details manually later.");
      } else {
        toast.success("CV parsed successfully!");
      }
    } catch {
      toast.error("Parsing failed. You can add details manually later.");
    }
    setParsing(false);
    setStep("goals");
  }

  async function handleSaveGoals() {
    setLoading(true);

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

    // Save goals if provided
    if (goals.target_role_title) {
      await supabase.from("career_goals").upsert({
        user_id: user.id,
        target_role_title: goals.target_role_title || null,
        target_seniority: goals.target_seniority || null,
        remote_preference: goals.remote_preference,
        requires_sponsorship: goals.requires_sponsorship,
        preferred_industries: [],
        preferred_locations: [],
        is_actively_looking: true,
      });
    }

    // Mark onboarding as complete
    await supabase.auth.updateUser({
      data: { onboarding_completed: true },
    });

    setLoading(false);
    setStep("complete");
  }

  async function handleFileUpload(file: File) {
    setCvFileName(file.name);

    if (file.name.endsWith(".txt")) {
      const text = await file.text();
      setCvText(text);
      return;
    }

    // Upload file and extract text
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cv/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setCvFileName(null);
        toast.error(data.error || "Upload failed");
        return;
      }

      if (data.extractedText) {
        setCvText(data.extractedText);
        toast.success("CV uploaded and text extracted!");
      } else {
        toast.success("CV uploaded! Paste the text content below to parse it.");
      }
    } catch {
      setCvFileName(null);
      toast.error("Upload failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {(["welcome", "cv", "goals", "complete"] as Step[]).map((s, i) => (
            <div
              key={s}
              className={`h-1.5 w-12 rounded-full transition ${
                (["welcome", "cv", "goals", "complete"] as Step[]).indexOf(step) >= i
                  ? "bg-[var(--ink)]"
                  : "bg-[var(--surface-high)]"
              }`}
            />
          ))}
        </div>

        {step === "welcome" && (
          <div className="text-center">
            <Brand size="lg" className="mb-6" />
            <h1 className="font-display text-3xl font-bold text-[var(--ink)]">
              Welcome to Mastry
            </h1>
            <p className="mt-3 text-[var(--ink-muted)]">
              Let&apos;s set up your Career Passport in a few quick steps.
            </p>
            <Button
              onClick={() => setStep("cv")}
              className="mt-8"
              size="lg"
            >
              Let&apos;s go
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {step === "cv" && (
          <div>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-low)]">
                <Upload className="h-5 w-5 text-[var(--ink)]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
                Upload your CV
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                We&apos;ll extract your career data automatically
              </p>
            </div>

            <FileUpload onFileSelect={handleFileUpload} selectedFileName={cvFileName} className="mb-6" />

            <div className="mb-6">
              <Textarea
                label="Or paste your CV text"
                placeholder="Paste your CV content here..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="quiet" onClick={() => setStep("goals")}>
                Skip for now
              </Button>
              <Button
                onClick={handleParseCV}
                disabled={parsing || cvText.trim().length < 50}
                className="flex-1"
              >
                {parsing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  <>
                    Parse with AI
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "goals" && (
          <div>
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(16,185,129,0.08)]">
                <Target className="h-5 w-5 text-[var(--success)]" />
              </div>
              <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
                Set your goals
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                What kind of role are you looking for?
              </p>
            </div>

            <Card className="mb-6">
              <div className="space-y-4">
                <Input
                  label="Target role"
                  placeholder="e.g. Director of Engineering"
                  value={goals.target_role_title}
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
                    value={goals.target_seniority}
                    onChange={(e) =>
                      setGoals((g) => ({ ...g, target_seniority: e.target.value }))
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
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[var(--ink)]">
                    Remote preference
                  </label>
                  <select
                    className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                    value={goals.remote_preference}
                    onChange={(e) =>
                      setGoals((g) => ({ ...g, remote_preference: e.target.value }))
                    }
                  >
                    <option value="any">Any</option>
                    <option value="remote">Remote only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={goals.requires_sponsorship}
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
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="quiet" onClick={() => setStep("cv")}>
                Back
              </Button>
              <Button
                onClick={handleSaveGoals}
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Saving..." : "Complete setup"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(16,185,129,0.1)]">
              <CheckCircle2 className="h-8 w-8 text-[var(--success)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--ink)]">
              You&apos;re all set!
            </h2>
            <p className="mt-2 text-[var(--ink-muted)]">
              Your Career Passport is ready. Head to your dashboard to start mastering your career.
            </p>
            <Button
              onClick={() => {
                router.push("/dashboard");
                router.refresh();
              }}
              className="mt-8"
              size="lg"
            >
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
