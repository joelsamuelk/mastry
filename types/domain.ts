export type AppRole = "mentee" | "mentor" | "admin";

export type MentorStatus =
  | "draft"
  | "pending_review"
  | "approved"
  | "rejected"
  | "suspended";

export type GoalStatus = "draft" | "active" | "completed" | "archived";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "refunded"
  | "no_show";

export interface FocusArea {
  id: string;
  slug: string;
  label: string;
  category: "discipline" | "industry" | "goal";
}

export interface SessionType {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  priceUsd: number;
  deliveryMode: "video" | "async";
  featured?: boolean;
}

export interface MentorBadge {
  id: string;
  label: string;
  tone?: "accent" | "neutral";
}

export interface MentorProfileStat {
  id: string;
  value: string;
  label: string;
}

export interface MentorExpertise {
  id: string;
  title: string;
  description: string;
  eyebrow?: string;
  icon?: "sparkles" | "briefcase" | "target" | "rocket";
}

export interface MentorCareerEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
}

export interface MentorAvailabilitySlot {
  id: string;
  startsAt: string;
  available: boolean;
}

export interface MentorAvailabilityDay {
  id: string;
  isoDate: string;
  slots: MentorAvailabilitySlot[];
}

export interface Mentor {
  id: string;
  slug: string;
  name: string;
  headline: string;
  company: string;
  location: string;
  bio: string;
  status: MentorStatus;
  experienceLabel: string;
  rating: number;
  reviewCount: number;
  hourlyRateUsd: number;
  avatarGradient: string;
  initials: string;
  focusAreas: FocusArea[];
  sessionTypes: SessionType[];
  featuredQuote?: string;
  badges?: MentorBadge[];
  profileStats?: MentorProfileStat[];
  expertise?: MentorExpertise[];
  careerHistory?: MentorCareerEntry[];
  availability?: MentorAvailabilityDay[];
}

export interface GrowthMilestone {
  id: string;
  title: string;
  description: string;
  state: "complete" | "active" | "locked";
  masteryPercent: number;
  tags: string[];
}

export interface GrowthPlan {
  id: string;
  title: string;
  summary: string;
  nextStep: string;
  weeklyFocus: string;
  milestones: GrowthMilestone[];
}

export interface CuratorInsight {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  actions: string[];
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  summary: string;
  completionPercent?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
