import { AppLayout } from "@/components/app/app-layout";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <div className="flex-1 w-full bg-background">
        <div className="container max-w-4xl py-12 px-4 md:px-6 md:py-16">
          {children}
        </div>
      </div>
    </AppLayout>
  );
}
