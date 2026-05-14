import Link from "next/link";
import { AppLogo } from "@/components/shared/app-logo";

export function AppFooter() {
  return (
    <footer className="border-t bg-muted/40 py-6 md:py-8 w-full mt-auto">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <AppLogo width={20} height={20} />
          <p>© 2026 Workforce. All rights reserved.</p>
        </div>
        <nav className="flex gap-4">
          <Link href="/legal/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/legal/cookies" className="hover:text-foreground transition-colors">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
