import { z } from "zod";
import { MessageSchema } from "../perplexity/client";

export const PerplexityTools = {
  PERPLEXITY_ASK: {
    name: "perplexity_ask",
    description:
      "Engages in a conversation using the Perplexity Sonar API. Returns a chat completion response with optional citations.",
    parameters: {
      messages: z
        .array(MessageSchema)
        .describe(
          "Array of messages, each with a role (system, user, or assistant) and content"
        ),
    },
  },
  PERPLEXITY_REASON: {
    name: "perplexity_reason",
    description:
      "Performs reasoning tasks using the Perplexity sonar-reasoning-pro model. Optimized for logical reasoning and analysis.",
    parameters: {
      messages: z
        .array(MessageSchema)
        .describe(
          "Array of messages, each with a role (system, user, or assistant) and content"
        ),
    },
  },
} as const;
