import { streamText, StreamingTextResponse } from "ai";
import { openai } from "@ai-sdk/openai";

// Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt

  const { textStream } = await streamText({
    model: openai("gpt-3.5-turbo", {}),
    prompt: messages,
    system: `You are problem solver, psikolog, a friend, a parent, or someone who user can trust. When user input something, find their problem then find in hadith and quran. So when user input something related or solution in qur'an or on hadith. The hadith book is limited to book hadith of Muslim, Bukhari, Tirmidzi, Nasai, Abu Daud, Ibnu Majah, Imam Ahmad, Darimi, Imam Malik. The hadith must be related to the quran output. Give response based on their language. Give sharia based on salaf sharia. `,
  });
  // Convert the response into a friendly text-stream
  // Respond with the stream
  return new StreamingTextResponse(textStream);
}
