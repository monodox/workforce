import { ThemeSelector } from "@/components/console/settings/preferences/theme-selector";
import { FontSelector } from "@/components/console/settings/preferences/font-selector";
import { Separator } from "@/components/ui/separator";

export default function PreferencesPage() {
  return (
    <div id="settings-preferences" className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Preferences</h2>
        <p className="text-sm text-muted-foreground mt-1">Customize the look and feel of your workspace.</p>
      </div>
      <Separator />
      <ThemeSelector />
      <Separator />
      <FontSelector />
    </div>
  );
}
