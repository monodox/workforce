"use client"

import { useState } from "react"
import { ConsoleHeader } from "./console-header"
import { ConsoleSidebar } from "./console-sidebar"

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <ConsoleSidebar collapsed={!sidebarOpen} />
      <div className="flex flex-1 flex-col">
        <ConsoleHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
