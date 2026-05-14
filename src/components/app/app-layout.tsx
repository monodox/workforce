import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";
import { CookieBanner } from "@/components/shared/cookie-banner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      <AppHeader />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <AppFooter />
      <CookieBanner />
    </div>
  );
}
