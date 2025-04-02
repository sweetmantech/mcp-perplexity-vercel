import { z } from "zod";
import { PerplexityClient, MessageSchema } from "../../perplexity/client";

// Define parameter schema
const MessagesParamSchema = z.object({
  messages: z.array(MessageSchema),
});

export type MessagesParam = z.infer<typeof MessagesParamSchema>;

// Initialize Perplexity client
const perplexityClient = new PerplexityClient(
  process.env.PERPLEXITY_API_KEY || ""
);

/**
 * Handles perplexity_reason requests using the sonar-reasoning-pro model
 * @param params The messages to process
 * @returns Response with reasoning analysis
 */
export const handlePerplexityReason = async (params: MessagesParam) => {
  try {
    const validParams = MessagesParamSchema.parse(params);
    const response = await perplexityClient.reason(validParams.messages);
    return {
      content: [{ type: "text", text: response }],
      isError: false,
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      ],
      isError: true,
    };
  }
};
