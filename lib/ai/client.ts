import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

export function getAIClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.startsWith("your_")) return null;

  if (!client) {
    client = new Anthropic({ apiKey });
  }

  return client;
}

const MODEL = "claude-sonnet-4-20250514";

export async function aiComplete(options: {
  system: string;
  prompt: string;
  json?: boolean;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const ai = getAIClient();
  if (!ai) throw new Error("AI API not configured");

  const systemPrompt = options.json
    ? `${options.system}\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no explanation — just the raw JSON object.`
    : options.system;

  const response = await ai.messages.create({
    model: MODEL,
    max_tokens: options.maxTokens ?? 4096,
    temperature: options.temperature ?? 0.5,
    system: systemPrompt,
    messages: [{ role: "user", content: options.prompt }],
  });

  const block = response.content[0];
  if (block.type !== "text") throw new Error("No text response from AI");

  return block.text;
}

export async function aiChat(options: {
  system: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  json?: boolean;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const ai = getAIClient();
  if (!ai) throw new Error("AI API not configured");

  const systemPrompt = options.json
    ? `${options.system}\n\nIMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no explanation — just the raw JSON object.`
    : options.system;

  const response = await ai.messages.create({
    model: MODEL,
    max_tokens: options.maxTokens ?? 4096,
    temperature: options.temperature ?? 0.5,
    system: systemPrompt,
    messages: options.messages,
  });

  const block = response.content[0];
  if (block.type !== "text") throw new Error("No text response from AI");

  return block.text;
}
