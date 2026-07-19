import { aiComplete } from "./client";
import type { JobSearchResult } from "@/types/domain";

interface JobDiscoveryInput {
  passport: {
    career_summary: string | null;
    current_role_title: string | null;
    years_experience: number | null;
    seniority_level: string | null;
    skills: string[];
  };
  goals: {
    target_role_title: string | null;
    target_seniority: string | null;
    preferred_industries: string[];
    preferred_locations: string[];
    remote_preference: string;
    salary_min: number | null;
    salary_currency: string | null;
  } | null;
  query: string;
  filters?: {
    location?: string;
    remote_only?: boolean;
    salary_min?: number;
  };
}

const SYSTEM_PROMPT = `You are Mastry's AI job discovery engine. Based on the candidate's profile, career goals, and search query, generate realistic job listings that would be found across major job platforms.

You should simulate searching across these sources:
- LinkedIn Jobs
- Indeed
- Glassdoor
- Google Jobs
- AngelList / Wellfound
- Company career pages
- Remote-specific boards (RemoteOK, WeWorkRemotely, FlexJobs)

CRITICAL RULES:
- Generate 8-12 realistic job listings that closely match the candidate's profile and search criteria
- Each listing should feel authentic — real company names, realistic descriptions, appropriate salary ranges
- Vary the sources across different job platforms
- Match the seniority level and skills to the candidate's profile
- If the candidate has location preferences, prioritize those locations
- Include a mix of exact matches and stretch opportunities
- URLs should use a realistic format for each source platform
- Include posted dates within the last 30 days

Return ONLY valid JSON:
{
  "results": [
    {
      "title": "Job title",
      "company": "Real company name",
      "location": "City, Country or Remote",
      "salary_min": 80000,
      "salary_max": 120000,
      "salary_currency": "GBP",
      "remote_type": "remote|hybrid|onsite",
      "description": "2-3 sentence job summary highlighting key requirements and responsibilities",
      "url": "https://platform.com/jobs/...",
      "source": "LinkedIn|Indeed|Glassdoor|Google Jobs|AngelList|Company Website|RemoteOK|WeWorkRemotely",
      "posted_date": "2026-07-15"
    }
  ]
}`;

export async function discoverJobs(input: JobDiscoveryInput): Promise<JobSearchResult[]> {
  const filterContext = input.filters
    ? `\n\nADDITIONAL FILTERS:\n${JSON.stringify(input.filters, null, 2)}`
    : "";

  const text = await aiComplete({
    system: SYSTEM_PROMPT,
    prompt: `Find jobs matching this search.\n\nSEARCH QUERY: "${input.query}"\n\nCANDIDATE PROFILE:\n${JSON.stringify(input.passport, null, 2)}\n\nCAREER GOALS:\n${JSON.stringify(input.goals, null, 2)}${filterContext}`,
    json: true,
    temperature: 0.7,
  });

  try {
    const parsed = JSON.parse(text);
    return (parsed.results ?? []) as JobSearchResult[];
  } catch {
    throw new Error("AI returned invalid JSON — please try again");
  }
}
