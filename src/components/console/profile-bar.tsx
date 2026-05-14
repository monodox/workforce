"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Settings, HelpCircle, LogOut, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ProfileBarProps {
  collapsed?: boolean
}

export function ProfileBar({ collapsed = false }: ProfileBarProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div ref={menuRef} className="relative border-t px-3 py-3">
      {open && (
        <div className={cn(
          "absolute bottom-full left-2 right-2 mb-2 rounded-md border bg-popover p-1 shadow-md z-50",
          collapsed && "left-0 right-auto w-48"
        )}>
          <Link
            href="/console/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/console/help"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
          <div className="my-1 h-px bg-muted" />
          <button
            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => setOpen(false)}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center rounded-md text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
          collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
        )}
      >
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">U</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">User</span>
            <ChevronUp className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </>
        )}
      </button>
    </div>
  )
}
