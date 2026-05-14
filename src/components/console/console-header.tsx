"use client"

import { useState } from "react"
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AiAppLogo } from "@/components/shared/ai-app-logo"
import { ChatPanel } from "./chat-panel"

interface ConsoleHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  onMobileMenuToggle?: () => void
  onChatOpen?: () => void
}

export function ConsoleHeader({ sidebarOpen, onToggleSidebar, onMobileMenuToggle, onChatOpen }: ConsoleHeaderProps) {
  const [chatOpen, setChatOpen] = useState(false)

  const handleChatOpen = () => {
    setChatOpen(true)
    onChatOpen?.()
  }

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMobileMenuToggle} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          {/* Desktop sidebar toggle */}
          <Button variant="ghost" size="icon" className="hidden md:inline-flex" onClick={onToggleSidebar} aria-label="Toggle sidebar">
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleChatOpen} aria-label="Open chat">
            <AiAppLogo width={20} height={20} />
          </Button>
        </div>
      </header>
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
