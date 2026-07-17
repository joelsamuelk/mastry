import { getOpenAIClient } from "./client";

interface CoverLetterInput {
  passport: {
    career_summary: string | null;
    current_role_title: string | null;
    current_company: string | null;
    years_experience: number | null;
    skills: string[];
  };
  employers: Array<{
    company_name: string;
    role_title: string;
    achievements: string[];
  }>;
  opportunity: {
    title: string;
    company: string;
    description: string | null;
  };
  type: "cover_letter" | "outreach_message";
}

const SYSTEM_PROMPT = `You are Mastry's application writing assistant. Generate professional application materials based ONLY on the candidate's real experience.

CRITICAL RULES:
- ONLY reference achievements, skills, and experience from the candidate's actual profile
- NEVER fabricate metrics, projects, or experiences
- Be specific — reference real companies, roles, and achievements from their history
- Keep the tone professional but personable
- For cover letters: 3-4 paragraphs, tailored to the specific role
- For outreach messages: 2-3 short paragraphs, suitable for LinkedIn or email to a recruiter

Return the content as plain text (no markdown formatting).`;

export async function generateCoverLetter(input: CoverLetterInput): Promise<string> {
  const openai = getOpenAIClient();
  if (!openai) throw new Error("OpenAI API not configured");

  const typeLabel = input.type === "cover_letter" ? "cover letter" : "recruiter outreach message";

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Generate a ${typeLabel} for this candidate applying to this role.\n\nCANDIDATE:\n${JSON.stringify(input.passport, null, 2)}\n\nRECENT EXPERIENCE:\n${JSON.stringify(input.employers.slice(0, 3), null, 2)}\n\nTARGET ROLE:\n${JSON.stringify(input.opportunity, null, 2)}`,
      },
    ],
    temperature: 0.7,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) throw new Error("No response from AI");

  return text;
}
