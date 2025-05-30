import { NextResponse } from "next/server";
import { verifyToken } from "@/middleware/verifyToken";
import axios from "axios";
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request) {
  const auth = await verifyToken(request);

  if (auth?.error) {
    return NextResponse.json(auth.error, { status: auth.error.status });
  }

  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     { role: 'system', content: 'You are a helpful assistant that generates complete HTML blog templates with appropriate inline styles. Respond only with valid HTML code.' },
    //     { role: 'user', content: prompt }
    //   ],
    //   temperature: 0.7,
    //   max_tokens: 2048,
    // });

    const completion = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that generates complete HTML blog templates with appropriate inline styles. Respond only with valid HTML code.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 2048,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          // 'HTTP-Referer': 'http://localhost', // or your deployed URL
          "Content-Type": "application/json",
        },
      }
    );
console.log(JSON.stringify(completion.data))
    return NextResponse.json({
      id: "genai-template",
      title: "Generated Template",
      description: "Template generated by AI based on your prompt.",
      thumbnail: "/template-images/genai-thumb.png", // placeholder path
      type: "BLOG",
      content: completion.data.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
