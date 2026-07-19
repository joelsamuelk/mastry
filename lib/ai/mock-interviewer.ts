import { aiComplete, aiChat } from "./client";
import type { MockInterviewMessage, MockInterviewFeedback, MockInterviewType } from "@/types/domain";

interface MockInterviewStartInput {
  passport: {
    career_summary: string | null;
    current_role_title: string | null;
    years_experience: number | null;
    seniority_level: string | null;
    skills: string[];
  };
  company: string;
  role_title: string;
  interview_type: MockInterviewType;
  difficulty: "easy" | "medium" | "hard";
}

interface MockInterviewRespondInput {
  company: string;
  role_title: string;
  interview_type: MockInterviewType;
  difficulty: "easy" | "medium" | "hard";
  messages: MockInterviewMessage[];
  candidate_response: string;
}

function getInterviewerSystemPrompt(input: { company: string; role_title: string; interview_type: MockInterviewType; difficulty: string }): string {
  return `You are a realistic interviewer conducting a ${input.interview_type} interview at ${input.company} for the role of ${input.role_title}. Difficulty level: ${input.difficulty}.

RULES:
- Act as a real interviewer would — professional, engaged, occasionally following up
- Ask ONE question at a time, then wait for the candidate's response
- After their response, briefly acknowledge it (naturally, like a real interviewer would) and then ask the next question
- Ask 5-7 questions total across the interview
- For behavioral questions, probe for specifics if the answer is vague
- For technical questions, adjust difficulty based on responses
- Keep your responses concise — interviewers don't give speeches
- When you've asked all questions, say "That covers all the questions I had for today." and end naturally

Return ONLY valid JSON:
{
  "message": "Your response as the interviewer",
  "questions_remaining": number,
  "is_complete": false
}`;
}

export async function startMockInterview(input: MockInterviewStartInput): Promise<string> {
  const text = await aiComplete({
    system: getInterviewerSystemPrompt(input),
    prompt: `Start the interview. The candidate's profile:\n${JSON.stringify(input.passport, null, 2)}\n\nBegin with a brief introduction of yourself (make up a realistic name and title at ${input.company}) and ask the first question.`,
    json: true,
    temperature: 0.6,
  });

  const parsed = JSON.parse(text);
  return parsed.message;
}

export async function respondToCandidate(input: MockInterviewRespondInput): Promise<{ message: string; is_complete: boolean }> {
  const chatMessages: Array<{ role: "user" | "assistant"; content: string }> = [];

  for (const msg of input.messages) {
    chatMessages.push({
      role: msg.role === "interviewer" ? "assistant" : "user",
      content: msg.content,
    });
  }

  chatMessages.push({
    role: "user",
    content: input.candidate_response,
  });

  const text = await aiChat({
    system: getInterviewerSystemPrompt(input),
    messages: chatMessages,
    json: true,
    temperature: 0.6,
  });

  const parsed = JSON.parse(text);
  return { message: parsed.message, is_complete: parsed.is_complete ?? false };
}

export async function generateFeedback(input: {
  company: string;
  role_title: string;
  interview_type: MockInterviewType;
  messages: MockInterviewMessage[];
}): Promise<MockInterviewFeedback> {
  const conversation = input.messages
    .filter((m) => m.role !== "system")
    .map((m) => `${m.role === "interviewer" ? "INTERVIEWER" : "CANDIDATE"}: ${m.content}`)
    .join("\n\n");

  const text = await aiComplete({
    system: `You are an expert interview coach reviewing a mock ${input.interview_type} interview at ${input.company} for ${input.role_title}. Provide detailed, actionable feedback.

Return ONLY valid JSON:
{
  "overall_score": number (0-100),
  "strengths": ["What the candidate did well"],
  "improvements": ["Specific areas to improve with actionable advice"],
  "question_scores": [
    {
      "question": "The interview question",
      "score": number (0-100),
      "feedback": "Specific feedback on this answer"
    }
  ],
  "tips": ["Practical tips for future interviews"]
}`,
    prompt: `Review this mock interview and provide feedback:\n\n${conversation}`,
    json: true,
    temperature: 0.4,
  });

  return JSON.parse(text) as MockInterviewFeedback;
}
