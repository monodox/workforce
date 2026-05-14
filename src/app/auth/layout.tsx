import { AppLayout } from "@/components/app/app-layout";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <div className="flex flex-1 items-center justify-center p-4 md:p-8 bg-muted/20">
        {children}
      </div>
    </AppLayout>
  );
}
