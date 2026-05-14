"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface AppLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function AppLogo({ width = 32, height = 32, className }: AppLogoProps) {
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
      ? "/icons/icon-light.png"
      : "/icons/icon-dark.png";

  return (
    <Image
      src={src}
      alt="Workforce"
      width={width}
      height={height}
      className={className}
    />
  );
}
