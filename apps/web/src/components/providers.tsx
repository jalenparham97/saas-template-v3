'use client';

import { TRPCReactProvider } from '@/trpc/react';
import { ToastProvider } from '@workspace/ui/components/base-toast';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ToastProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ToastProvider>
    </NextThemesProvider>
  );
}
