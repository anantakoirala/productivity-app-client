"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>; // Prevents hydration mismatches
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
