"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ConsoleHeader } from "./console-header"
import { ConsoleSidebar } from "./console-sidebar"

export function ConsoleLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar on page navigation
  useEffect(() => {
    setSidebarOpen(false)
    setMobileSidebarOpen(false)
  }, [pathname])

  const handleChatOpen = () => {
    setSidebarOpen(false)
    setMobileSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans antialiased">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-200 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <ConsoleSidebar collapsed={false} />
      </div>

      {/* Desktop sidebar - fixed */}
      <div className="hidden md:block">
        <ConsoleSidebar collapsed={!sidebarOpen} />
      </div>

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        <ConsoleHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onChatOpen={handleChatOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
