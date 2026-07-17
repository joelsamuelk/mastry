import { getOpenAIClient } from "./client";

interface VisaInput {
  nationality: string | null;
  target_locations: string[];
  current_role: string | null;
  years_experience: number | null;
  seniority_level: string | null;
  skills: string[];
  requires_sponsorship: boolean;
}

export interface VisaAnalysis {
  overall_assessment: string;
  locations: Array<{
    location: string;
    visa_types: Array<{
      name: string;
      description: string;
      eligibility: "likely" | "possible" | "unlikely" | "unknown";
      requirements: string[];
    }>;
    sponsorship_landscape: string;
    difficulty: "easy" | "moderate" | "difficult" | "very_difficult";
  }>;
  recommendations: string[];
  disclaimer: string;
}

const SYSTEM_PROMPT = `You are Mastry's visa intelligence assistant. Provide factual visa and work permit analysis based on the candidate's profile.

CRITICAL RULES:
- NEVER claim a company sponsors unless you have evidence
- Be clear about what is general knowledge vs what requires verification
- Always include a disclaimer about consulting immigration lawyers
- Focus on work visa categories relevant to the candidate's profession and seniority
- Rate eligibility honestly: likely, possible, unlikely, or unknown

Return ONLY valid JSON matching this structure:
{
  "overall_assessment": "2-3 sentence overview of their visa situation",
  "locations": [
    {
      "location": "Country/City",
      "visa_types": [
        {
          "name": "Visa category name",
          "description": "Brief description",
          "eligibility": "likely|possible|unlikely|unknown",
          "requirements": ["requirement1", "requirement2"]
        }
      ],
      "sponsorship_landscape": "General info about employer sponsorship in this market",
      "difficulty": "easy|moderate|difficult|very_difficult"
    }
  ],
  "recommendations": ["actionable recommendation 1", "recommendation 2"],
  "disclaimer": "Standard legal disclaimer"
}`;

export async function analyzeVisa(input: VisaInput): Promise<VisaAnalysis> {
  const openai = getOpenAIClient();
  if (!openai) throw new Error("OpenAI API not configured");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analyze visa and work permit options for this candidate.\n\nPROFILE:\n${JSON.stringify(input, null, 2)}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const text = response.choices[0]?.message?.content;
  if (!text) throw new Error("No response from AI");

  try {
    return JSON.parse(text) as VisaAnalysis;
  } catch {
    throw new Error("AI returned invalid JSON — please try again");
  }
}
