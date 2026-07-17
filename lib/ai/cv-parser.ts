import { getOpenAIClient } from "./client";

export interface ParsedCV {
  career_summary: string;
  current_role_title: string | null;
  current_company: string | null;
  years_experience: number | null;
  seniority_level: string | null;
  skills: string[];
  languages: string[];
  employers: Array<{
    company_name: string;
    role_title: string;
    start_date: string | null;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
    achievements: string[];
    technologies: string[];
    people_managed: number | null;
  }>;
  education: Array<{
    institution: string;
    degree: string | null;
    field_of_study: string | null;
    start_year: number | null;
    end_year: number | null;
  }>;
  certifications: Array<{
    name: string;
    issuer: string | null;
    date_obtained: string | null;
  }>;
}

const SYSTEM_PROMPT = `You are an expert CV parser for Mastry, an AI career mastery platform. Your job is to extract structured career data from a CV/resume.

CRITICAL RULES:
- Only extract information that is EXPLICITLY stated in the CV
- NEVER invent, fabricate, or hallucinate achievements, metrics, or experiences
- If information is ambiguous or missing, use null
- Extract actual achievements with real metrics where stated
- Determine seniority_level from one of: junior, mid, senior, lead, principal, director, vp, c_level

Return ONLY valid JSON matching this exact structure:
{
  "career_summary": "2-3 sentence professional summary based on the CV",
  "current_role_title": "most recent job title or null",
  "current_company": "most recent employer or null",
  "years_experience": number or null,
  "seniority_level": "one of the levels or null",
  "skills": ["skill1", "skill2"],
  "languages": ["English", "French"],
  "employers": [
    {
      "company_name": "Company",
      "role_title": "Title",
      "start_date": "YYYY-MM or null",
      "end_date": "YYYY-MM or null",
      "is_current": true/false,
      "description": "role description or null",
      "achievements": ["achievement1"],
      "technologies": ["tech1"],
      "people_managed": number or null
    }
  ],
  "education": [
    {
      "institution": "University",
      "degree": "BSc or null",
      "field_of_study": "Computer Science or null",
      "start_year": 2015 or null,
      "end_year": 2019 or null
    }
  ],
  "certifications": [
    {
      "name": "AWS Solutions Architect",
      "issuer": "Amazon or null",
      "date_obtained": "YYYY-MM or null"
    }
  ]
}`;

export async function parseCV(cvText: string): Promise<ParsedCV> {
  const openai = getOpenAIClient();
  if (!openai) {
    throw new Error("OpenAI API not configured");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Parse the following CV and extract structured career data. Return ONLY valid JSON, no markdown formatting.\n\n---\n\n${cvText}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error("No response from AI");
  }

  let parsed: ParsedCV;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("AI returned invalid JSON — please try again");
  }

  // Ensure required array fields have defaults
  parsed.skills = Array.isArray(parsed.skills) ? parsed.skills : [];
  parsed.languages = Array.isArray(parsed.languages) ? parsed.languages : [];
  parsed.employers = Array.isArray(parsed.employers) ? parsed.employers : [];
  parsed.education = Array.isArray(parsed.education) ? parsed.education : [];
  parsed.certifications = Array.isArray(parsed.certifications) ? parsed.certifications : [];

  return parsed;
}
