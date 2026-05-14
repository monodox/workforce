"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, Library, Plug, Brain, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppLogo } from "@/components/shared/app-logo"
import { ProfileBar } from "./profile-bar"

const navItems = [
  { label: "Overview", href: "/console/overview", icon: LayoutDashboard },
  { label: "Instructions", href: "/console/instructions", icon: FileText },
  { label: "Libraries", href: "/console/libraries", icon: Library },
  { label: "Connections", href: "/console/connections", icon: Plug },
  { label: "Memories", href: "/console/memories", icon: Brain },
  { label: "Agents", href: "/console/agents", icon: Bot },
]

interface ConsoleSidebarProps {
  collapsed?: boolean
}

export function ConsoleSidebar({ collapsed = false }: ConsoleSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-muted/30 transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex h-14 shrink-0 items-center border-b px-3",
        collapsed ? "justify-center" : "gap-2"
      )}>
        <Link href="/console" className="flex items-center gap-2">
          <AppLogo width={28} height={28} />
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight">Workforce</span>
          )}
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center rounded-md text-sm font-medium transition-colors",
                  collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>
      <ProfileBar collapsed={collapsed} />
    </aside>
  )
}
