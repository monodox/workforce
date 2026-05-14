import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // Check API key before importing model
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your-gemini-api-key-here") {
      return NextResponse.json(
        { error: "AI assistant is currently unavailable. Please try again later." },
        { status: 503 }
      )
    }

    const { geminiModel } = await import("@/lib/ai")
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      )
    }

    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }))

    const lastMessage = messages[messages.length - 1]

    const chat = geminiModel.startChat({ history })
    const result = await chat.sendMessage(lastMessage.content)
    const response = result.response.text()

    return NextResponse.json({ content: response })
  } catch (error: any) {
    console.error("Gemini API error:", error)

    const message = error?.message || ""

    // User-friendly error messages
    if (message.includes("API_KEY_INVALID") || message.includes("API key not valid")) {
      return NextResponse.json(
        { error: "AI assistant is temporarily unavailable. Please contact support." },
        { status: 401 }
      )
    }

    if (message.includes("QUOTA_EXCEEDED") || message.includes("429")) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 }
      )
    }

    if (message.includes("SAFETY")) {
      return NextResponse.json(
        { error: "Your message was blocked by safety filters. Please rephrase and try again." },
        { status: 400 }
      )
    }

    if (message.includes("fetch") || message.includes("ECONNREFUSED") || message.includes("network")) {
      return NextResponse.json(
        { error: "Unable to reach the AI service. Please check your internet connection." },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
