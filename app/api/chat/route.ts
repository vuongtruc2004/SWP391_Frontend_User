import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

interface GeminiHistoryMessage {
    role: "user" | "model" | "function" | "system";
    parts: { text: string }[];
}
export async function POST(req: Request) {
    try {
        const { prompt, messages } = await req.json();
        const history: GeminiHistoryMessage[] = messages.map((message: MessageResponse) => ({
            role: message.role.toLowerCase(),
            parts: [{ text: message.content }]
        }));

        const chatSession = model.startChat({
            generationConfig,
            history: history,
        });

        const result = await chatSession.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({
            status: 200,
            data: text
        });

    } catch (error) {
        return NextResponse.json({
            status: 400,
            errorMessage: `${error}`,
        }, { status: 400 });
    }
}
