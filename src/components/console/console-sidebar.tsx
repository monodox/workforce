import Link from "next/link"
import { LayoutDashboard, FileText, Library, Plug, Brain, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
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
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r bg-muted/30 transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex h-14 items-center border-b px-3",
        collapsed ? "justify-center" : "gap-2"
      )}>
        <Link href="/console" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shrink-0">
            W
          </div>
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight">Workforce</span>
          )}
        </Link>
      </div>
      <div className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                collapsed ? "justify-center px-2 py-2" : "gap-3 px-3 py-2"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <ProfileBar collapsed={collapsed} />
    </aside>
  )
}
