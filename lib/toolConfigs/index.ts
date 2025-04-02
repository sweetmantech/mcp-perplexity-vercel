import { PerplexityTools } from "./perplexityTools";

export const TOOL_CONFIGS = {
  ...PerplexityTools,
} as const;

export type ToolConfig = typeof TOOL_CONFIGS;
export type ToolName = keyof ToolConfig;
