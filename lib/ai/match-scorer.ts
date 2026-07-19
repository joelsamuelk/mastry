import { aiComplete } from "./client";
import type { MatchBreakdown } from "@/types/domain";

interface MatchInput {
  passport: {
    career_summary: string | null;
    current_role_title: string | null;
    years_experience: number | null;
    seniority_level: string | null;
    skills: string[];
    languages: string[];
  };
  goals: {
    target_role_title: string | null;
    target_seniority: string | null;
    preferred_industries: string[];
    preferred_locations: string[];
    remote_preference: string;
    salary_min: number | null;
    salary_currency: string | null;
    requires_sponsorship: boolean;
  } | null;
  opportunity: {
    title: string;
    company: string;
    location: string | null;
    salary_min: number | null;
    salary_max: number | null;
    remote_type: string | null;
    description: string | null;
  };
}

const SYSTEM_PROMPT = `You are a career matching engine for Mastry. Score how well a job opportunity matches a candidate's profile and goals.

Score each dimension 0-100:
- leadership_fit: How well the role matches their management/leadership experience
- domain_fit: How well the industry/domain matches their background and preferences
- technical_fit: How well their skills match the job requirements
- seniority_fit: How well the seniority level matches their current level and target
- compensation_fit: How well the salary range matches their minimum (100 if no salary data)
- visa_fit: Whether the role/location is compatible with sponsorship needs (100 if not needed)
- growth_potential: How much this role advances their stated career goals

Return ONLY valid JSON:
{
  "leadership_fit": number,
  "domain_fit": number,
  "technical_fit": number,
  "seniority_fit": number,
  "compensation_fit": number,
  "visa_fit": number,
  "growth_potential": number,
  "summary": "2-3 sentence explanation of the match"
}`;

export async function scoreMatch(input: MatchInput): Promise<{ score: number; breakdown: MatchBreakdown }> {
  const text = await aiComplete({
    system: SYSTEM_PROMPT,
    prompt: `CANDIDATE PROFILE:\n${JSON.stringify(input.passport, null, 2)}\n\nCAREER GOALS:\n${JSON.stringify(input.goals, null, 2)}\n\nJOB OPPORTUNITY:\n${JSON.stringify(input.opportunity, null, 2)}`,
    json: true,
    temperature: 0.2,
  });

  let breakdown: MatchBreakdown;
  try {
    breakdown = JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON — please try again");
  }

  const dimensions = [
    breakdown.leadership_fit,
    breakdown.domain_fit,
    breakdown.technical_fit,
    breakdown.seniority_fit,
    breakdown.compensation_fit,
    breakdown.visa_fit,
    breakdown.growth_potential,
  ].map((v) => (typeof v === "number" && !isNaN(v) ? Math.min(100, Math.max(0, v)) : 50));
  const score = Math.round(dimensions.reduce((a, b) => a + b, 0) / dimensions.length);

  return { score, breakdown };
}
