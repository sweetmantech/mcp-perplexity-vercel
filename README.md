# Perplexity MCP Server

A Model Context Protocol server that provides access to Perplexity AI's powerful language models through a standardized interface.

## Features

- **Ask Tool**: Natural conversation capabilities using Perplexity's Sonar Pro model
- **Reason Tool**: Advanced reasoning and analysis using the specialized reasoning model
- **MCP Compatible**: Works with any MCP-enabled client (Cursor, Claude, etc.)
- **Real-time Streaming**: Supports streaming responses for better interaction
- **One-Click Vercel Deployment**: Unlike other Perplexity MCP servers, this one can be instantly deployed to Vercel for free with just one click
- **Zero Infrastructure Management**: No need to manage servers or worry about scaling - Vercel handles it all

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsweetmantech%2Fmcp-perplexity-vercel)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Set your environment variables:
   - `PERPLEXITY_API_KEY`: Your Perplexity API key
   - `REDIS_URL`: Your Redis URL (Vercel has integrations with various Redis providers)
4. Click deploy!

Your MCP server will be live in minutes with:

- Automatic HTTPS
- Global CDN
- Automatic scaling
- Zero configuration needed

## Manual Setup

If you prefer to run locally or deploy elsewhere:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Add your Perplexity API key to `.env`:

   ```
   PERPLEXITY_API_KEY=your_api_key_here
   REDIS_URL=your_redis_url_here  # Required for MCP functionality
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## Usage

### Configuration

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "perplexity": {
      "type": "remote",
      "url": "https://mcp-perplexity-vercel.vercel.app/sse",
      "supportsStreaming": true
    }
  }
}
```

### Available Tools

#### perplexity_ask

Natural conversation tool using Perplexity's Sonar Pro model.

```typescript
{
  name: "perplexity_ask",
  parameters: {
    messages: Array<{role: string, content: string}>
  }
}
```

Example:

```json
{
  "messages": [{ "role": "user", "content": "What is the capital of France?" }]
}
```

#### perplexity_reason

Advanced reasoning tool optimized for complex analysis and logical problem-solving.

```typescript
{
  name: "perplexity_reason",
  parameters: {
    messages: Array<{role: string, content: string}>
  }
}
```

Example:

```json
{
  "messages": [
    { "role": "user", "content": "Analyze the pros and cons of remote work" }
  ]
}
```

## Development

### Project Structure

```
.
├── api/
│   └── server.ts      # MCP server implementation
├── lib/
│   ├── perplexity/    # Perplexity client implementation
│   └── handlers/      # Tool handlers
└── public/            # Static assets
```

### Environment Variables

Required environment variables:

- `PERPLEXITY_API_KEY`: Your Perplexity API key (get one from Perplexity)
- `REDIS_URL`: Redis instance URL (required for MCP functionality)

## Deployment

This server is optimized for Vercel deployment, making it the easiest Perplexity MCP server to self-host. The production server is available at:
https://mcp-perplexity-vercel.vercel.app/

### Deploy Options

1. **One-Click Vercel Deploy (Recommended)**

   - Use the "Deploy with Vercel" button above
   - Set your environment variables
   - Your server will be live in minutes

2. **Manual Vercel Deploy**

   - Fork this repository
   - Import to Vercel
   - Configure environment variables
   - Deploy

3. **Custom Deployment**
   - Deploy to any platform that supports Node.js
   - Ensure Redis is available
   - Configure environment variables
   - Start the server

## License

MIT
