import { z } from "zod";

// Define message schema for type safety
export const MessageSchema = z.object({
  role: z.string(),
  content: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
export type Messages = Message[];

// Available Perplexity models
export const PERPLEXITY_MODELS = {
  SONAR_PRO: "sonar-pro",
  SONAR_RESEARCH: "sonar-research",
  SONAR_REASON_PRO: "sonar-reasoning-pro",
} as const;

export type PerplexityModel =
  (typeof PERPLEXITY_MODELS)[keyof typeof PERPLEXITY_MODELS];

interface PerplexityResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  citations?: string[];
}

export class PerplexityClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Perplexity API key is required");
    }
    this.apiKey = apiKey;
    this.baseUrl = "https://api.perplexity.ai";
  }

  /**
   * Performs a chat completion using the specified model
   * @param messages Array of message objects with role and content
   * @param model The Perplexity model to use
   * @returns The response content with citations if available
   */
  async chatCompletion(
    messages: Messages,
    model: PerplexityModel = PERPLEXITY_MODELS.SONAR_PRO
  ): Promise<string> {
    try {
      // Validate messages
      messages.forEach((msg) => {
        const result = MessageSchema.safeParse(msg);
        if (!result.success) {
          throw new Error(`Invalid message format: ${result.error.message}`);
        }
      });

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      });

      if (!response.ok) {
        let errorText = await response.text();
        throw new Error(
          `Perplexity API error: ${response.status} ${response.statusText}\n${errorText}`
        );
      }

      const data = (await response.json()) as PerplexityResponse;

      // Get the main message content
      let messageContent = data.choices[0].message.content;

      // Append citations if available
      if (data.citations && data.citations.length > 0) {
        messageContent += "\n\nCitations:\n";
        data.citations.forEach((citation, index) => {
          messageContent += `[${index + 1}] ${citation}\n`;
        });
      }

      return messageContent;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Perplexity chat completion failed: ${error.message}`);
      }
      throw new Error("Perplexity chat completion failed with unknown error");
    }
  }

  /**
   * Performs a research query using the research-optimized model
   */
  async research(messages: Messages): Promise<string> {
    return this.chatCompletion(messages, PERPLEXITY_MODELS.SONAR_RESEARCH);
  }

  /**
   * Performs a reasoning task using the reasoning-optimized model
   */
  async reason(messages: Messages): Promise<string> {
    return this.chatCompletion(messages, PERPLEXITY_MODELS.SONAR_REASON_PRO);
  }
}
