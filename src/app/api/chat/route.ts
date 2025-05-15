import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT_KR,
  COZY_PROMPT_KR,
  CHEERY_PROMPT_KR,
  SYSTEM_PROMPT,
  COZY_PROMPT,
  CHEERY_PROMPT,
} from "@/lib/data";

import { ChatMessage } from "@/stores/useChatStore";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, newMessage, style, locale } = body;

    const chat = ai.chats.create({
      model: "gemini-2.0-flash", //무료
      history: [
        {
          role: "user",
          parts: [
            {
              text:
                locale === "kr"
                  ? SYSTEM_PROMPT_KR + style === "cozy"
                    ? COZY_PROMPT_KR
                    : CHEERY_PROMPT_KR
                  : SYSTEM_PROMPT + style === "cozy"
                  ? COZY_PROMPT
                  : CHEERY_PROMPT,
            },
          ],
        },
        ...messages.map((msg: ChatMessage) => ({
          role: msg.role,
          parts: [
            {
              text: msg.content,
            },
          ],
        })),
      ],
    });

    const result = await chat.sendMessage({
      message: newMessage + locale === "kr" ? "반말로 답해." : "let's just chat. you're my close friend.",
    });

    return NextResponse.json({
      role: "model",
      content: result.text,
    });
  } catch (error) {
    console.error("[Gemini Error]", error);
    return NextResponse.json(
      { error: "Gemini API 호출 실패" },
      { status: 500 }
    );
  }
}
