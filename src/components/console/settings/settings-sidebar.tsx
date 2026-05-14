import Link from "next/link";
import { User, Shield, SlidersHorizontal } from "lucide-react";

const settingsNav = [
  { label: "Profile", href: "/console/settings/profile", icon: User },
  { label: "Security", href: "/console/settings/security", icon: Shield },
  { label: "Preferences", href: "/console/settings/preferences", icon: SlidersHorizontal },
];

export function SettingsSidebar() {
  return (
    <nav className="flex md:flex-col gap-1 md:w-48 shrink-0">
      {settingsNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
