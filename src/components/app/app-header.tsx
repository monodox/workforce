import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AppLogo } from "@/components/shared/app-logo";

export function AppHeader() {
  return (
    <header className="border-b bg-background w-full sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo width={28} height={28} />
          <span className="font-bold text-lg tracking-tight">Workforce</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/auth/login" className="hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/auth/signup" className="hover:text-primary transition-colors">
            Sign Up
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
