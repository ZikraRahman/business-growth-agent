"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted && resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Button
      aria-label="Toggle theme"
      size="icon"
      type="button"
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isMounted ? (isDark ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
