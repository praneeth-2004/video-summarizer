// import { createOpenAI } from "@ai-sdk/openai";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const prompt = reqBody.data.prompt;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "No prompt provided" }), {
        status: 400,
      });
    }

    // Ensure you have the API key set in your environment variables
    const openai = createOpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: process.env.GROQ_API_KEY, // Set this in your .env file
    });

    // Call the LLM using streamText
    const result = await streamText({
      model: openai('llama-3.2-11b-text-preview'),
      prompt: prompt,
    });

    // Return the streamed result in a JSON response
    return new Response(JSON.stringify({ data: result }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error during LLM response:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process LLM request." }),
      { status: 500 }
    );
  }
}
