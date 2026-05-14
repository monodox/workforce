import { ConsoleLayout } from "@/components/console/console-layout";
import { ThemeProvider } from "@/components/shared/theme-provider";

export default function ConsoleRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ConsoleLayout>{children}</ConsoleLayout>
    </ThemeProvider>
  );
}
