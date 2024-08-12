import { NextResponse } from "next/server"; // Import NextResponse from Next.js for handling responses
import OpenAI from "openai"; // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
You are an AI-powered customer support assistant for a De Anza College, a community college in Cupertino, California. You are helping a student with their questions about the college. The student asks: "What are the requirements for transferring to a university from De Anza College?" You should provide the student with information about the requirements for transferring to a university from De Anza College.
The De Anza Story
De Anza College is always at or near the top in transfers to four-year universities. We offer programs, degrees and certificates to fit your needs, and plenty of campus activities to enhance your college experience. We welcome and support a diverse student body, with student services that will help you succeed!

Apply and Register
Academic Programs
Accreditation
Career Training
Civic Engagement
De Anza College Promise
Equity
Financial Aid
History of the College
Leadership and Governance
Learning Communities
Maps, Tours and Parking
Sustainability
Villages at De Anza
Vision, Mission and Values

`;
// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI(); // Create a new instance of the OpenAI client
  const data = await req.json(); // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt }, ...data], // Include the system prompt and user messages
    model: "gpt-4o-mini-2024-07-18", // Specify the model to use
    stream: true, // Enable streaming responses
    temperature: 1, // Set the temperature to 1
    max_tokens: 128, // Set the maximum number of tokens to generate
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
