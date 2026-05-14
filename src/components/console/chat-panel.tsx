"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatForm, ChatMessages, MessageInput, type Message } from "./chat"

interface ChatPanelProps {
  open: boolean
  onClose: () => void
}

export function ChatPanel({ open, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [value, setValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  if (!open) return null

  const handleSubmit = async () => {
    if (!value.trim()) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: value.trim(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setValue("")
    setIsGenerating(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to get response")
      }

      const data = await res.json()

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Error: ${error.message}`,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="fixed top-14 right-0 z-40 h-[calc(100%-3.5rem)] w-full max-w-sm border-l bg-background shadow-xl flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold">Chat</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ChatMessages messages={messages} />

      <div className="border-t p-3">
        <ChatForm
          className="w-full"
          isPending={isGenerating}
          handleSubmit={handleSubmit}
        >
          {({ files, setFiles }) => (
            <MessageInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              isGenerating={isGenerating}
              stop={() => setIsGenerating(false)}
              allowAttachments
              files={files}
              setFiles={setFiles}
              placeholder="Type a message..."
            />
          )}
        </ChatForm>
      </div>
    </div>
  )
}
