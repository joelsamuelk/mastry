export type ExtractionStatus = "pending" | "processing" | "completed" | "failed";
export type EvidenceType = "publication" | "talk" | "project" | "award" | "patent" | "other";
export type SeniorityLevel = "junior" | "mid" | "senior" | "lead" | "principal" | "director" | "vp" | "c_level";
export type RemotePreference = "remote" | "hybrid" | "onsite" | "any";

export interface Profile {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  headline: string | null;
  timezone: string | null;
  onboarding_completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CareerPassport {
  id: string;
  user_id: string;
  career_summary: string | null;
  current_role_title: string | null;
  current_company: string | null;
  years_experience: number | null;
  seniority_level: SeniorityLevel | null;
  skills: string[];
  languages: string[];
  raw_cv_url: string | null;
  raw_cv_text: string | null;
  ai_extraction_status: ExtractionStatus;
  ai_extraction_result: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Employer {
  id: string;
  passport_id: string;
  company_name: string;
  role_title: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  achievements: string[];
  technologies: string[];
  people_managed: number | null;
  created_at: string;
}

export interface Education {
  id: string;
  passport_id: string;
  institution: string;
  degree: string | null;
  field_of_study: string | null;
  start_year: number | null;
  end_year: number | null;
  created_at: string;
}

export interface Certification {
  id: string;
  passport_id: string;
  name: string;
  issuer: string | null;
  date_obtained: string | null;
  expiry_date: string | null;
  credential_url: string | null;
  created_at: string;
}

export interface CareerEvidence {
  id: string;
  passport_id: string;
  type: EvidenceType;
  title: string;
  description: string | null;
  url: string | null;
  date: string | null;
  created_at: string;
}

export interface CareerGoals {
  id: string;
  user_id: string;
  target_role_title: string | null;
  target_seniority: SeniorityLevel | null;
  preferred_industries: string[];
  preferred_locations: string[];
  remote_preference: RemotePreference;
  salary_min: number | null;
  salary_currency: string | null;
  requires_sponsorship: boolean;
  is_actively_looking: boolean;
  created_at: string;
  updated_at: string;
}

export interface ActivityLogEntry {
  id: string;
  user_id: string;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export interface FullPassport extends CareerPassport {
  employers: Employer[];
  education: Education[];
  certifications: Certification[];
  evidence: CareerEvidence[];
}

// Opportunities
export type OpportunityStatus = "saved" | "applied" | "interviewing" | "offered" | "rejected" | "archived";

export interface Opportunity {
  id: string;
  user_id: string;
  title: string;
  company: string;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  remote_type: "remote" | "hybrid" | "onsite" | null;
  description: string | null;
  url: string | null;
  source: string;
  match_score: number | null;
  match_breakdown: MatchBreakdown | null;
  status: OpportunityStatus;
  notes: string | null;
  applied_at: string | null;
  follow_up_at: string | null;
  deadline: string | null;
  contact_name: string | null;
  contact_email: string | null;
  application_method: "website" | "email" | "linkedin" | "referral" | "recruiter" | "other" | null;
  created_at: string;
  updated_at: string;
}

export interface MatchBreakdown {
  leadership_fit: number;
  domain_fit: number;
  technical_fit: number;
  seniority_fit: number;
  compensation_fit: number;
  visa_fit: number;
  growth_potential: number;
  summary: string;
}

// Application Materials
export type MaterialType = "cover_letter" | "cv_optimised" | "application_answer" | "outreach_message";

export interface ApplicationMaterial {
  id: string;
  user_id: string;
  opportunity_id: string | null;
  type: MaterialType;
  title: string;
  content: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// Interview Prep
export interface InterviewQuestion {
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  suggested_approach: string;
}

export interface StarExample {
  question_theme: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface InterviewPrep {
  id: string;
  user_id: string;
  opportunity_id: string | null;
  company: string;
  role_title: string;
  likely_questions: InterviewQuestion[];
  star_examples: StarExample[];
  company_research: { key_points: string[]; culture_notes: string; recent_news: string[] } | null;
  questions_to_ask: string[];
  created_at: string;
  updated_at: string;
}

// Job Discovery
export type SearchStatus = "pending" | "searching" | "completed" | "failed";

export interface JobSearchResult {
  title: string;
  company: string;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  salary_currency: string | null;
  remote_type: "remote" | "hybrid" | "onsite" | null;
  description: string;
  url: string;
  source: string;
  posted_date: string | null;
}

export interface JobSearch {
  id: string;
  user_id: string;
  query: string;
  filters: Record<string, unknown>;
  results: JobSearchResult[];
  result_count: number;
  status: SearchStatus;
  created_at: string;
}

// Interview Scheduling
export type InterviewScheduleStatus = "scheduled" | "completed" | "cancelled" | "rescheduled";
export type InterviewType = "phone" | "video" | "onsite" | "take_home";

export interface InterviewSchedule {
  id: string;
  user_id: string;
  opportunity_id: string | null;
  company: string;
  role_title: string;
  round: string;
  interview_type: InterviewType;
  scheduled_at: string;
  duration_minutes: number;
  location: string | null;
  meeting_link: string | null;
  interviewer_names: string[];
  notes: string | null;
  calendar_event_id: string | null;
  status: InterviewScheduleStatus;
  reminder_sent: boolean;
  created_at: string;
  updated_at: string;
}

// Mock Interviews
export type MockInterviewType = "behavioral" | "technical" | "case_study" | "mixed";

export interface MockInterviewMessage {
  role: "interviewer" | "candidate" | "system";
  content: string;
  timestamp: string;
}

export interface MockInterviewFeedback {
  overall_score: number;
  strengths: string[];
  improvements: string[];
  question_scores: Array<{
    question: string;
    score: number;
    feedback: string;
  }>;
  tips: string[];
}

export interface MockInterview {
  id: string;
  user_id: string;
  opportunity_id: string | null;
  company: string;
  role_title: string;
  interview_type: MockInterviewType;
  difficulty: "easy" | "medium" | "hard";
  messages: MockInterviewMessage[];
  feedback: MockInterviewFeedback | null;
  status: "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}
