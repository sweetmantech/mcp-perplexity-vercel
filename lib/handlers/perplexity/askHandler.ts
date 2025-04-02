import { z } from "zod";
import { PerplexityClient, MessageSchema } from "../../perplexity/client";

const MessagesParamSchema = z.object({
  messages: z.array(MessageSchema),
});

export type MessagesParam = z.infer<typeof MessagesParamSchema>;

const perplexityClient = new PerplexityClient(
  process.env.PERPLEXITY_API_KEY || ""
);

/**
 * Handles perplexity_ask requests using the sonar-pro model
 * @param params The messages to process
 * @returns Response with completion or error
 */
export const handlePerplexityAsk = async (params: MessagesParam) => {
  try {
    const validParams = MessagesParamSchema.parse(params);
    const response = await perplexityClient.chatCompletion(
      validParams.messages
    );
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
