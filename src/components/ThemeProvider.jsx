"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { MotionConfig } from "framer-motion";

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      {/* Respect the OS "reduce motion" setting for every animation in one place. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
