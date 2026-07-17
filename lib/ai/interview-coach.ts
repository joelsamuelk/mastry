import { getOpenAIClient } from "./client";
import type { InterviewQuestion, StarExample } from "@/types/domain";

interface InterviewPrepInput {
  passport: {
    career_summary: string | null;
    current_role_title: string | null;
    years_experience: number | null;
    seniority_level: string | null;
    skills: string[];
  };
  employers: Array<{
    company_name: string;
    role_title: string;
    description: string | null;
    achievements: string[];
    technologies: string[];
    people_managed: number | null;
  }>;
  opportunity: {
    title: string;
    company: string;
    description: string | null;
  };
}

interface InterviewPrepResult {
  likely_questions: InterviewQuestion[];
  star_examples: StarExample[];
  company_research: {
    key_points: string[];
    culture_notes: string;
    recent_news: string[];
  };
  questions_to_ask: string[];
}

const SYSTEM_PROMPT = `You are Mastry's interview coach. Prepare a comprehensive interview prep pack tailored to a specific role and company, using the candidate's real experience.

CRITICAL RULES:
- Generate questions that are realistic for this specific role at this company
- STAR examples MUST be based on the candidate's REAL experience — never fabricate
- If the candidate lacks relevant experience for a question theme, note that honestly
- Company research should be based on general knowledge (note if information may be outdated)
- Questions to ask should be thoughtful and specific to the role/company

Return ONLY valid JSON:
{
  "likely_questions": [
    {
      "question": "The interview question",
      "category": "behavioral|technical|situational|culture",
      "difficulty": "easy|medium|hard",
      "suggested_approach": "Brief guidance on how to answer"
    }
  ],
  "star_examples": [
    {
      "question_theme": "What theme this example addresses",
      "situation": "The situation from their real experience",
      "task": "What they needed to accomplish",
      "action": "What they specifically did",
      "result": "The outcome, with metrics if available from their profile"
    }
  ],
  "company_research": {
    "key_points": ["Key fact about the company"],
    "culture_notes": "Notes about company culture and values",
    "recent_news": ["Recent developments (note: based on training data, may not be current)"]
  },
  "questions_to_ask": ["Thoughtful question to ask the interviewer"]
}

Generate 8-10 questions, 3-5 STAR examples, and 4-6 questions to ask.`;

export async function prepareInterview(input: InterviewPrepInput): Promise<InterviewPrepResult> {
  const openai = getOpenAIClient();
  if (!openai) throw new Error("OpenAI API not configured");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Prepare an interview prep pack for this candidate.\n\nCANDIDATE:\n${JSON.stringify(input.passport, null, 2)}\n\nEXPERIENCE:\n${JSON.stringify(input.employers.slice(0, 4), null, 2)}\n\nTARGET ROLE:\n${JSON.stringify(input.opportunity, null, 2)}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.5,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) throw new Error("No response from AI");

  try {
    return JSON.parse(text) as InterviewPrepResult;
  } catch {
    throw new Error("AI returned invalid JSON — please try again");
  }
}
