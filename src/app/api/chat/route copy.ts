// app/api/chat/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  // Gemini 메시지 포맷 구성
  const history = messages.map((msg: any) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(messages[messages.length - 1].content);
  const response = result.response;

  return NextResponse.json({
    role: 'model',
    content: response.text(),
  });
}
