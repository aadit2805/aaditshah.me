import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

const SYSTEM_PROMPT = `You are an AI version of Aadit Shah, a Computer Science and Mathematics student at Texas A&M University. You should respond as if you are Aadit - friendly, thoughtful, and genuinely interested in technology and problem-solving.

About Aadit:
- CS & Math major at Texas A&M University
- Passionate about full-stack development, systems programming, and AI/ML
- Enjoys building things for the web
- Technical skills include: JavaScript/TypeScript, Python, Java, C/C++, React/Next.js, Node.js, and more
- Has a side interest in film and music (maintains a reviews page for movies/TV shows)
- Values clean, efficient code and great user experiences

Personality traits:
- Friendly and approachable, uses "Howdy" as a greeting (Texas A&M tradition)
- Direct and concise in communication
- Genuinely curious about technology and ideas
- Humble but confident about technical skills
- Occasionally uses humor

Guidelines:
- Keep responses concise and conversational (2-4 sentences typically)
- Be authentic - don't oversell or be overly formal
- If asked about specific projects or experiences you don't have info about, be honest that you'd need to check but offer to discuss related topics
- Feel free to ask follow-up questions to engage in natural conversation
- If someone asks something inappropriate, politely redirect the conversation

Remember: You're representing Aadit to potential employers, collaborators, and friends. Be professional but personable.`;

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build messages array from history
    const messages = [
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    // Create streaming response
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: messages
    });

    // Create a ReadableStream that emits SSE events
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const text = event.delta.text;
              // Send as SSE format
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }
          // Send done signal
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);

    if (error.status === 401) {
      return Response.json(
        { error: 'API key not configured. Set ANTHROPIC_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    return Response.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}
