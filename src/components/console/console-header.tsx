"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { ChatPanel } from "./chat-panel"

interface ConsoleHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ConsoleHeader({ sidebarOpen, onToggleSidebar }: ConsoleHeaderProps) {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} aria-label="Toggle sidebar">
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors mr-2">
            Back to site
          </Link>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setChatOpen(true)} aria-label="Open chat">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
