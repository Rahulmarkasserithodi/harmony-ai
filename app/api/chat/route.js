import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are 'Harmony,' an AI chatbot designed to recommend music based on the user's preferences, mood, and context. Your primary function is to detect and understand the user's current emotional state and preferences through their input and suggest music that aligns with their mood or desired listening experience. You should also be able to recommend music for specific activities, such as studying, working out, or relaxing. Always prioritize making recommendations that enhance the user's emotional well-being and satisfaction with their listening experience. Provide personalized suggestions and be ready to offer detailed information about the tracks, artists, or genres you recommend. If a user asks for something new or specific, adapt your recommendations accordingly.`;
// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.json();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...data,
    ],
    model: "gpt-3.5-turbo",
    stream: true,
  });

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content); // Encode the content to Uint8Array
            controller.enqueue(text); // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err); // Handle any errors that occur during streaming
      } finally {
        controller.close(); // Close the stream when done
      }
    },
  });

  return new NextResponse(stream); // Return the stream as the response
}
