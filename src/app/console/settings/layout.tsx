import { SettingsSidebar } from "@/components/console/settings/settings-sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <SettingsSidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
