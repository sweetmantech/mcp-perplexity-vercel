import { z } from "zod";
import { MessageSchema } from "../../perplexity/client";

export const MessagesParamSchema = z.object({
  messages: z.array(MessageSchema),
});

export type MessagesParam = z.infer<typeof MessagesParamSchema>;

export { handlePerplexityAsk } from "./askHandler";
export { handlePerplexityReason } from "./reasonHandler";
