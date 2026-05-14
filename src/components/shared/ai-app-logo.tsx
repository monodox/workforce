"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface AiAppLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function AiAppLogo({ width = 24, height = 24, className }: AiAppLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width, height }} className={className} />;
  }

  const src =
    resolvedTheme === "dark"
      ? "/icons/ai-icon-light.png"
      : "/icons/ai-icon-dark.png";

  return (
    <Image
      src={src}
      alt="AI Assistant"
      width={width}
      height={height}
      className={className}
    />
  );
}
