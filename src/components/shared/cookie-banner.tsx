"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t bg-background p-4 shadow-lg">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-muted-foreground text-center sm:text-left">
          We use cookies to improve your experience.{" "}
          <Link href="/legal/cookies" className="text-primary underline underline-offset-4 hover:text-primary/80">
            Learn more
          </Link>
        </p>
        <Button size="sm" onClick={handleAccept} className="shrink-0">
          Accept
        </Button>
      </div>
    </div>
  );
}
