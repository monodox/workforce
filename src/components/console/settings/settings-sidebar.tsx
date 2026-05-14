"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Shield, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNav = [
  { label: "Profile", href: "/console/settings/profile", icon: User },
  { label: "Security", href: "/console/settings/security", icon: Shield },
  { label: "Preferences", href: "/console/settings/preferences", icon: SlidersHorizontal },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex overflow-x-auto md:overflow-visible md:flex-col md:sticky md:top-0 gap-1 md:w-48 shrink-0 border-b md:border-b-0 pb-2 md:pb-0">
      {settingsNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
