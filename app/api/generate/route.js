import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// This initializes the OpenAI client using the secret key you added to Vercel
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    // 1. Get the user's prompt from the frontend request
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 2. Send the prompt to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // You can use "gpt-4o" or "gpt-3.5-turbo"
      messages: [
        { 
          role: "system", 
          content: "You are Codely AI, an expert web developer. Output ONLY valid, high-quality HTML code with Tailwind CSS and JavaScript embedded. Do not provide explanations, do not use markdown code blocks like ```html. Start directly with <!DOCTYPE html>." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    // 3. Extract the generated code
    const generatedCode = response.choices[0].message.content;

    // 4. Send the code back to your frontend
    return NextResponse.json({ output: generatedCode });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "AI generation failed. Check OpenAI billing/credits." }, 
      { status: 500 }
    );
  }
}
