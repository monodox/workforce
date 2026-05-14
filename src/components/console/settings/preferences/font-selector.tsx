"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const fonts = [
  { value: "google-sans", label: "Google Sans", family: '"Google Sans", sans-serif' },
  { value: "inter", label: "Inter", family: '"Inter", sans-serif' },
  { value: "system", label: "System", family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  { value: "mono", label: "Mono", family: '"JetBrains Mono", "Fira Code", monospace' },
]

export function FontSelector() {
  const [selectedFont, setSelectedFont] = useState("google-sans")

  useEffect(() => {
    const saved = localStorage.getItem("workforce-font")
    if (saved) setSelectedFont(saved)
  }, [])

  const handleFontChange = (fontValue: string) => {
    setSelectedFont(fontValue)
    localStorage.setItem("workforce-font", fontValue)
    const font = fonts.find((f) => f.value === fontValue)
    if (font) {
      document.documentElement.style.setProperty("--font-sans", font.family)
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-medium">Font</h3>
        <p className="text-sm text-muted-foreground">Choose your preferred font for the interface.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fonts.map((font) => (
          <button
            key={font.value}
            onClick={() => handleFontChange(font.value)}
            className={cn(
              "flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-colors hover:bg-accent",
              selectedFont === font.value
                ? "border-primary bg-primary/5"
                : "border-border"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                selectedFont === font.value ? "text-primary" : "text-foreground"
              )}
              style={{ fontFamily: font.family }}
            >
              {font.label}
            </span>
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: font.family }}
            >
              The quick brown fox
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
