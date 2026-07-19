"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  Play,
  StopCircle,
  BarChart3,
  Sparkles,
  Loader2,
  Star,
  TrendingUp,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { MockInterview, MockInterviewFeedback, MockInterviewType, Opportunity } from "@/types/domain";
import { toast } from "sonner";

function FeedbackView({ feedback }: { feedback: MockInterviewFeedback }) {
  const scoreColor =
    feedback.overall_score >= 80
      ? "text-emerald-600"
      : feedback.overall_score >= 60
        ? "text-amber-600"
        : "text-red-500";

  return (
    <div className="space-y-6">
      {/* Overall score */}
      <Card className="text-center">
        <div className={`text-5xl font-bold ${scoreColor}`}>
          {feedback.overall_score}
        </div>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">Overall Score</p>
      </Card>

      {/* Strengths & Improvements */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Star className="h-4 w-4 text-emerald-600" />
            <CardTitle>Strengths</CardTitle>
          </div>
          <ul className="space-y-2">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="text-sm text-[var(--ink-muted)]">
                {s}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-amber-600" />
            <CardTitle>To Improve</CardTitle>
          </div>
          <ul className="space-y-2">
            {feedback.improvements.map((s, i) => (
              <li key={i} className="text-sm text-[var(--ink-muted)]">
                {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Question scores */}
      {feedback.question_scores.length > 0 && (
        <Card>
          <CardTitle className="mb-4">Question-by-Question</CardTitle>
          <div className="space-y-4">
            {feedback.question_scores.map((qs, i) => (
              <div key={i} className="rounded-2xl bg-[var(--surface-low)] p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    {qs.question}
                  </p>
                  <span
                    className={`flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      qs.score >= 80
                        ? "bg-emerald-50 text-emerald-700"
                        : qs.score >= 60
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {qs.score}/100
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--ink-muted)]">
                  {qs.feedback}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tips */}
      {feedback.tips.length > 0 && (
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[var(--ink)]" />
            <CardTitle>Tips for Next Time</CardTitle>
          </div>
          <ul className="space-y-2">
            {feedback.tips.map((tip, i) => (
              <li key={i} className="text-sm text-[var(--ink-muted)]">
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

export function MockInterviewPage() {
  const [interviews, setInterviews] = useState<MockInterview[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInterview, setActiveInterview] = useState<MockInterview | null>(null);
  const [starting, setStarting] = useState(false);
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [setup, setSetup] = useState<{
    company: string;
    role_title: string;
    interview_type: MockInterviewType;
    difficulty: "easy" | "medium" | "hard";
    opportunity_id: string;
  }>({
    company: "",
    role_title: "",
    interview_type: "behavioral",
    difficulty: "medium",
    opportunity_id: "",
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) { setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [interviewsRes, oppsRes] = await Promise.all([
        supabase.from("mock_interviews").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("opportunities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      setInterviews(interviewsRes.data ?? []);
      setOpportunities(oppsRes.data ?? []);

      const inProgress = (interviewsRes.data ?? []).find((i: MockInterview) => i.status === "in_progress");
      if (inProgress) setActiveInterview(inProgress);

      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeInterview?.messages]);

  async function handleStart() {
    if (!setup.company || !setup.role_title) {
      toast.error("Enter company and role");
      return;
    }

    setStarting(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setup),
      });

      const json = await res.json();
      if (res.ok) {
        setActiveInterview(json.data);
        setInterviews((prev) => [json.data, ...prev]);
        setShowSetup(false);
        toast.success("Mock interview started");
      } else {
        toast.error(json.error);
      }
    } catch {
      toast.error("Failed to start interview");
    }
    setStarting(false);
  }

  async function handleSend() {
    if (!response.trim() || !activeInterview) return;

    setSending(true);
    const currentResponse = response;
    setResponse("");

    try {
      const res = await fetch("/api/mock-interview", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeInterview.id,
          response: currentResponse,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setActiveInterview(json.data);
        setInterviews((prev) =>
          prev.map((i) => (i.id === json.data.id ? json.data : i))
        );
        if (json.data.status === "completed") {
          toast.success("Interview complete! Check your feedback.");
        }
      } else {
        toast.error(json.error);
        setResponse(currentResponse);
      }
    } catch {
      toast.error("Failed to send response");
      setResponse(currentResponse);
    }
    setSending(false);
  }

  async function handleEnd() {
    if (!activeInterview) return;

    setSending(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeInterview.id,
          end_interview: true,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setActiveInterview(json.data);
        setInterviews((prev) =>
          prev.map((i) => (i.id === json.data.id ? json.data : i))
        );
        toast.success("Interview ended. Check your feedback!");
      }
    } catch {
      toast.error("Failed to end interview");
    }
    setSending(false);
  }

  function prefillFromOpportunity(oppId: string) {
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp) {
      setSetup((s) => ({
        ...s,
        company: opp.company,
        role_title: opp.title,
        opportunity_id: opp.id,
      }));
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Skeleton className="h-8 w-64" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-32" />)}
      </div>
    );
  }

  // Show feedback if interview is completed
  if (activeInterview?.status === "completed" && activeInterview.feedback) {
    return (
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Mock Interview"
          title={`${activeInterview.role_title} at ${activeInterview.company}`}
          description="Here's your performance feedback."
        />
        <div className="mb-6 flex gap-3">
          <Button
            variant="quiet"
            onClick={() => {
              setActiveInterview(null);
              setShowSetup(false);
            }}
          >
            Back to all interviews
          </Button>
          <Button onClick={() => { setActiveInterview(null); setShowSetup(true); }}>
            <Play className="h-4 w-4" />
            Start new interview
          </Button>
        </div>
        <FeedbackView feedback={activeInterview.feedback} />
      </div>
    );
  }

  // Active interview chat
  if (activeInterview?.status === "in_progress") {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
              Mock Interview
            </p>
            <h1 className="font-display text-2xl font-bold text-[var(--ink)]">
              {activeInterview.role_title} at {activeInterview.company}
            </h1>
            <div className="mt-1 flex gap-2">
              <Badge>{activeInterview.interview_type}</Badge>
              <Badge variant="accent">{activeInterview.difficulty}</Badge>
            </div>
          </div>
          <Button variant="quiet" onClick={handleEnd} disabled={sending}>
            <StopCircle className="h-4 w-4" />
            End interview
          </Button>
        </div>

        {/* Chat messages */}
        <div className="mb-4 max-h-[60vh] space-y-4 overflow-y-auto rounded-[2rem] bg-[var(--surface-low)] p-6">
          {activeInterview.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "candidate" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "candidate"
                    ? "bg-[var(--ink)] text-white"
                    : "bg-white text-[var(--ink)] shadow-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                <Loader2 className="h-4 w-4 animate-spin text-[var(--ink-muted)]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <Textarea
            placeholder="Type your answer..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={sending || !response.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Setup / history view
  return (
    <div className="mx-auto max-w-4xl">
      <SectionHeading
        eyebrow="Mock Interview"
        title="Practice makes perfect"
        description="Run realistic AI mock interviews tailored to any role. Get detailed feedback on your performance."
      />

      {!showSetup ? (
        <div className="mb-6">
          <Button onClick={() => setShowSetup(true)}>
            <Play className="h-4 w-4" />
            Start mock interview
          </Button>
        </div>
      ) : (
        <Card className="mb-6">
          <CardTitle className="mb-4">Set up your mock interview</CardTitle>

          {opportunities.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-sm text-[var(--ink-muted)]">From your opportunities:</p>
              <div className="flex flex-wrap gap-2">
                {opportunities.slice(0, 6).map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => prefillFromOpportunity(opp.id)}
                    className={buttonStyles({ variant: "quiet", size: "sm" })}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    {opp.title} at {opp.company}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Company *"
                value={setup.company}
                onChange={(e) => setSetup((s) => ({ ...s, company: e.target.value }))}
              />
              <Input
                label="Role *"
                value={setup.role_title}
                onChange={(e) => setSetup((s) => ({ ...s, role_title: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Interview type</label>
                <select
                  className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                  value={setup.interview_type}
                  onChange={(e) => setSetup((s) => ({ ...s, interview_type: e.target.value as MockInterview["interview_type"] }))}
                >
                  <option value="behavioral">Behavioral</option>
                  <option value="technical">Technical</option>
                  <option value="case_study">Case Study</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Difficulty</label>
                <select
                  className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                  value={setup.difficulty}
                  onChange={(e) => setSetup((s) => ({ ...s, difficulty: e.target.value as MockInterview["difficulty"] }))}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="quiet" onClick={() => setShowSetup(false)}>Cancel</Button>
              <Button onClick={handleStart} disabled={starting}>
                {starting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start interview
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Past interviews */}
      {interviews.filter((i) => i.status === "completed").length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">Past interviews</h2>
          <div className="space-y-3">
            {interviews
              .filter((i) => i.status === "completed")
              .map((interview) => (
                <Card
                  key={interview.id}
                  className="cursor-pointer transition hover:shadow-md"
                  onClick={() => setActiveInterview(interview)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-[var(--ink)]">
                          {interview.role_title} at {interview.company}
                        </span>
                        <Badge>{interview.interview_type}</Badge>
                        <Badge variant="accent">{interview.difficulty}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-[var(--muted)]">
                        {new Date(interview.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {interview.feedback && (
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-[var(--ink-muted)]" />
                        <span
                          className={`text-lg font-bold ${
                            interview.feedback.overall_score >= 80
                              ? "text-emerald-600"
                              : interview.feedback.overall_score >= 60
                                ? "text-amber-600"
                                : "text-red-500"
                          }`}
                        >
                          {interview.feedback.overall_score}
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {interviews.length === 0 && !showSetup && (
        <Card className="py-16 text-center">
          <MessageCircle className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No mock interviews yet</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Start a mock interview to practice with an AI interviewer and get detailed feedback.
          </p>
        </Card>
      )}
    </div>
  );
}
