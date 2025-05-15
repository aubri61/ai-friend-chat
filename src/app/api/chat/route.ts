import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  COZY_PROMPT,
  CHEERY_PROMPT,
  COZY_PROMPT_KR,
  CHEERY_PROMPT_KR,
} from "@/lib/data";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, newMessage, style } = body;

    const chat = ai.chats.create({
      model: "gemini-2.0-flash", //무료
      history: [
        {
          role: "user",
          parts: [
            {
              text:
                SYSTEM_PROMPT + style === "cozy"
                  ? COZY_PROMPT_KR
                  : CHEERY_PROMPT_KR,
            },
          ],
        },

        ...messages.map((msg: any) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage({ message: newMessage });

    return NextResponse.json({
      role: "ai",
      content: result.text,
    });
  } catch (error) {
    console.error("[Gemini Error]", error);
    return NextResponse.json(
      { error: "Gemini API 호출 실패" },
      { status: error?.status ?? 500 }
    );
  }
}
