"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  Video,
  Phone,
  MapPin,
  Users,
  Trash2,
  Check,
  X,
  ChevronRight,
  Building2,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonStyles } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeading } from "@/components/ui/section-heading";
import { Skeleton } from "@/components/ui/skeleton";
import type { InterviewSchedule, InterviewType, Opportunity } from "@/types/domain";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { format, isPast, isToday, isTomorrow } from "date-fns";

const interviewTypeIcons = {
  phone: Phone,
  video: Video,
  onsite: MapPin,
  take_home: Clock,
};

const statusColors = {
  scheduled: "bg-blue-50 text-blue-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
  rescheduled: "bg-amber-50 text-amber-700",
};

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return format(date, "EEE, MMM d");
}

export function SchedulerPage() {
  const [schedules, setSchedules] = useState<InterviewSchedule[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    company: string;
    role_title: string;
    round: string;
    interview_type: InterviewType;
    scheduled_at: string;
    duration_minutes: string;
    location: string;
    meeting_link: string;
    interviewer_names: string;
    notes: string;
    opportunity_id: string;
  }>({
    company: "",
    role_title: "",
    round: "Phone Screen",
    interview_type: "video",
    scheduled_at: "",
    duration_minutes: "60",
    location: "",
    meeting_link: "",
    interviewer_names: "",
    notes: "",
    opportunity_id: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) { setLoading(false); return; }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const [schedulesRes, oppsRes] = await Promise.all([
        fetch("/api/interviews/schedule").then((r) => r.json()),
        supabase.from("opportunities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      if (!cancelled) {
        setSchedules(schedulesRes.data ?? []);
        setOpportunities(oppsRes.data ?? []);
        setLoading(false);
      }
    }
    loadData();
    return () => { cancelled = true; };
  }, []);

  async function handleAdd() {
    if (!form.company || !form.role_title || !form.scheduled_at) {
      toast.error("Company, role, and date/time are required");
      return;
    }

    try {
      const res = await fetch("/api/interviews/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration_minutes: Number(form.duration_minutes) || 60,
          interviewer_names: form.interviewer_names
            ? form.interviewer_names.split(",").map((n) => n.trim())
            : [],
          opportunity_id: form.opportunity_id || null,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        setSchedules((prev) => [...prev, json.data].sort(
          (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
        ));
        setShowForm(false);
        setForm({
          company: "", role_title: "", round: "Phone Screen", interview_type: "video",
          scheduled_at: "", duration_minutes: "60", location: "", meeting_link: "",
          interviewer_names: "", notes: "", opportunity_id: "",
        });
        toast.success("Interview scheduled");
      } else {
        toast.error(json.error);
      }
    } catch {
      toast.error("Failed to schedule interview");
    }
  }

  async function handleStatusChange(id: string, status: string) {
    try {
      const res = await fetch("/api/interviews/schedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (res.ok) {
        setSchedules((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: status as InterviewSchedule["status"] } : s))
        );
        toast.success("Status updated");
      }
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/interviews/schedule?id=${id}`, { method: "DELETE" });
      setSchedules((prev) => prev.filter((s) => s.id !== id));
      toast.success("Interview removed");
    } catch {
      toast.error("Failed to delete");
    }
  }

  function prefillFromOpportunity(oppId: string) {
    const opp = opportunities.find((o) => o.id === oppId);
    if (opp) {
      setForm((f) => ({
        ...f,
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

  const upcoming = schedules.filter(
    (s) => s.status === "scheduled" && !isPast(new Date(s.scheduled_at))
  );
  const past = schedules.filter(
    (s) => s.status !== "scheduled" || isPast(new Date(s.scheduled_at))
  );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 flex items-start justify-between">
        <SectionHeading
          eyebrow="Interview Scheduler"
          title="Manage your interviews"
          description="Track all your scheduled interviews, set reminders, and stay organised."
          className="mb-0"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className={buttonStyles({ variant: "primary", size: "sm" })}
        >
          <Plus className="h-4 w-4" />
          Schedule interview
        </button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardTitle className="mb-4">Schedule an interview</CardTitle>

          {opportunities.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-sm text-[var(--ink-muted)]">Quick-fill from opportunity:</p>
              <div className="flex flex-wrap gap-2">
                {opportunities.slice(0, 6).map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => prefillFromOpportunity(opp.id)}
                    className={buttonStyles({ variant: "quiet", size: "sm" })}
                  >
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
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              />
              <Input
                label="Role *"
                value={form.role_title}
                onChange={(e) => setForm((f) => ({ ...f, role_title: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Round"
                placeholder="e.g. Final Round"
                value={form.round}
                onChange={(e) => setForm((f) => ({ ...f, round: e.target.value }))}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--ink)]">Type</label>
                <select
                  className="h-12 w-full rounded-2xl bg-[var(--surface-low)] px-4 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,0,0,0.12)]"
                  value={form.interview_type}
                  onChange={(e) => setForm((f) => ({ ...f, interview_type: e.target.value as "phone" | "video" | "onsite" | "take_home" }))}
                >
                  <option value="video">Video</option>
                  <option value="phone">Phone</option>
                  <option value="onsite">On-site</option>
                  <option value="take_home">Take-home</option>
                </select>
              </div>
              <Input
                label="Duration (min)"
                type="number"
                value={form.duration_minutes}
                onChange={(e) => setForm((f) => ({ ...f, duration_minutes: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date & time *"
                type="datetime-local"
                value={form.scheduled_at}
                onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))}
              />
              <Input
                label="Meeting link"
                placeholder="https://zoom.us/j/..."
                value={form.meeting_link}
                onChange={(e) => setForm((f) => ({ ...f, meeting_link: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Location (if on-site)"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
              <Input
                label="Interviewer names (comma-separated)"
                placeholder="Jane Smith, John Doe"
                value={form.interviewer_names}
                onChange={(e) => setForm((f) => ({ ...f, interviewer_names: e.target.value }))}
              />
            </div>
            <Textarea
              label="Notes"
              placeholder="Any prep notes, things to remember..."
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
            />
            <div className="flex gap-3">
              <Button variant="quiet" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleAdd}>
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Upcoming interviews */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink)]">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((schedule) => {
              const TypeIcon = interviewTypeIcons[schedule.interview_type];
              return (
                <Card key={schedule.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl bg-[var(--surface-low)]">
                        <span className="text-lg font-bold text-[var(--ink)]">
                          {format(new Date(schedule.scheduled_at), "d")}
                        </span>
                        <span className="text-[10px] font-semibold uppercase text-[var(--ink-muted)]">
                          {format(new Date(schedule.scheduled_at), "MMM")}
                        </span>
                      </div>
                      <div>
                        <CardTitle>{schedule.role_title}</CardTitle>
                        <div className="mt-1 flex items-center gap-3 text-sm text-[var(--ink-muted)]">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {schedule.company}
                          </span>
                          <Badge>{schedule.round}</Badge>
                          <span className="flex items-center gap-1">
                            <TypeIcon className="h-3.5 w-3.5" />
                            {schedule.interview_type}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-[var(--muted)]">
                          <Clock className="h-3 w-3" />
                          {getDateLabel(schedule.scheduled_at)} at{" "}
                          {format(new Date(schedule.scheduled_at), "h:mm a")}
                          {" "}({schedule.duration_minutes}min)
                        </div>
                        {schedule.interviewer_names.length > 0 && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-[var(--muted)]">
                            <Users className="h-3 w-3" />
                            {schedule.interviewer_names.join(", ")}
                          </div>
                        )}
                        {schedule.meeting_link && (
                          <a
                            href={schedule.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--ink)] hover:underline"
                          >
                            <Video className="h-3 w-3" />
                            Join meeting
                            <ChevronRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStatusChange(schedule.id, "completed")}
                        className={buttonStyles({ variant: "ghost", size: "sm" })}
                        title="Mark complete"
                      >
                        <Check className="h-4 w-4 text-emerald-600" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(schedule.id, "cancelled")}
                        className={buttonStyles({ variant: "ghost", size: "sm" })}
                        title="Cancel"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        className={buttonStyles({ variant: "ghost", size: "sm" })}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-[var(--danger)]" />
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Past interviews */}
      {past.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[var(--ink-muted)]">Past</h2>
          <div className="space-y-3">
            {past.map((schedule) => (
              <Card key={schedule.id} className="opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[var(--ink)]">
                        {schedule.role_title} at {schedule.company}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusColors[schedule.status]}`}>
                        {schedule.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      {format(new Date(schedule.scheduled_at), "MMM d, yyyy 'at' h:mm a")} — {schedule.round}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(schedule.id)}
                    className={buttonStyles({ variant: "ghost", size: "sm" })}
                  >
                    <Trash2 className="h-4 w-4 text-[var(--danger)]" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {schedules.length === 0 && (
        <Card className="py-16 text-center">
          <Calendar className="mx-auto mb-4 h-10 w-10 text-[var(--ink-muted)]" />
          <CardTitle>No interviews scheduled</CardTitle>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Schedule your upcoming interviews to stay organised and prepared.
          </p>
        </Card>
      )}
    </div>
  );
}
