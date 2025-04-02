import { z } from "zod";
import { initializeMcpApiHandler } from "../lib/mcp-api-handler";
import {
  handlePerplexityAsk,
  handlePerplexityReason,
} from "../lib/handlers/perplexityHandlers";
import { TOOL_CONFIGS } from "../lib/toolConfigs";

const handler = initializeMcpApiHandler(
  (server) => {
    server.tool(
      TOOL_CONFIGS.PERPLEXITY_ASK.name,
      TOOL_CONFIGS.PERPLEXITY_ASK.description,
      TOOL_CONFIGS.PERPLEXITY_ASK.parameters,
      // @ts-ignore
      handlePerplexityAsk
    );
    server.tool(
      TOOL_CONFIGS.PERPLEXITY_REASON.name,
      TOOL_CONFIGS.PERPLEXITY_REASON.description,
      TOOL_CONFIGS.PERPLEXITY_REASON.parameters,
      // @ts-ignore
      handlePerplexityReason
    );
  },
  {
    capabilities: {
      tools: Object.fromEntries(
        Object.values(TOOL_CONFIGS).map((config) => [
          config.name,
          {
            description: config.description,
            parameters: Object.fromEntries(
              Object.entries(config.parameters).map(([key, schema]) => [
                key,
                {
                  type: schema instanceof z.ZodString ? "string" : "array",
                  description: schema.description,
                },
              ])
            ),
          },
        ])
      ),
    },
  }
);

export default handler;
