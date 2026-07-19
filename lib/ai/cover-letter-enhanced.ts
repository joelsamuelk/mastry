import { aiComplete } from "./client";

export type CoverLetterTone = "professional" | "conversational" | "assertive" | "creative";
export type CoverLetterVersion = "standard" | "concise" | "detailed" | "storytelling";

interface EnhancedCoverLetterInput {
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
  type: "cover_letter" | "outreach_message" | "follow_up" | "thank_you";
  tone: CoverLetterTone;
  version: CoverLetterVersion;
  custom_instructions?: string;
}

function getToneGuidance(tone: CoverLetterTone): string {
  switch (tone) {
    case "professional":
      return "Use a formal, polished tone. Demonstrate expertise and authority.";
    case "conversational":
      return "Use a warm, approachable tone. Be personable while maintaining professionalism.";
    case "assertive":
      return "Use a confident, direct tone. Lead with impact and results.";
    case "creative":
      return "Use a distinctive, memorable tone. Show personality while being appropriate.";
  }
}

function getVersionGuidance(version: CoverLetterVersion, type: string): string {
  if (type === "outreach_message") return "2-3 short paragraphs.";
  if (type === "follow_up") return "2 paragraphs — reference the interview and reiterate interest.";
  if (type === "thank_you") return "2-3 paragraphs — express gratitude, reference specific topics discussed.";

  switch (version) {
    case "concise":
      return "2 tight paragraphs. Get to the point quickly.";
    case "detailed":
      return "4-5 paragraphs. Go deep on relevant experience and cultural fit.";
    case "storytelling":
      return "3-4 paragraphs. Open with a compelling anecdote from your career that connects to this role.";
    default:
      return "3-4 paragraphs, tailored to the specific role.";
  }
}

const SYSTEM_PROMPT = `You are Mastry's expert application writing assistant. Generate professional application materials based ONLY on the candidate's real experience.

CRITICAL RULES:
- ONLY reference achievements, skills, and experience from the candidate's actual profile
- NEVER fabricate metrics, projects, or experiences
- Be specific — reference real companies, roles, and achievements from their history
- Adapt your writing style based on the tone and version instructions provided
- For follow-up emails: reference the interview naturally, reinforce key talking points
- For thank-you notes: be genuine, reference specific conversation topics

Return the content as plain text (no markdown formatting).`;

export async function generateEnhancedCoverLetter(input: EnhancedCoverLetterInput): Promise<string> {
  const typeLabels: Record<string, string> = {
    cover_letter: "cover letter",
    outreach_message: "recruiter outreach message",
    follow_up: "post-interview follow-up email",
    thank_you: "interview thank-you note",
  };

  const customInstructions = input.custom_instructions
    ? `\n\nADDITIONAL INSTRUCTIONS FROM USER: ${input.custom_instructions}`
    : "";

  return aiComplete({
    system: SYSTEM_PROMPT,
    prompt: `Generate a ${typeLabels[input.type]} for this candidate.\n\nTONE: ${getToneGuidance(input.tone)}\nFORMAT: ${getVersionGuidance(input.version, input.type)}\n\nCANDIDATE:\n${JSON.stringify(input.passport, null, 2)}\n\nRECENT EXPERIENCE:\n${JSON.stringify(input.employers.slice(0, 3), null, 2)}\n\nTARGET ROLE:\n${JSON.stringify(input.opportunity, null, 2)}${customInstructions}`,
    temperature: 0.7,
  });
}
