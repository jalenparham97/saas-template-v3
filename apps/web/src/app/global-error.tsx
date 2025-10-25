'use client';

import { Button } from '@workspace/ui/components/button';
import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Critical Error</h2>
              <p className="text-muted-foreground">
                A critical error occurred. Please refresh the page or contact
                support if the problem persists.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={reset}>Try again</Button>
              <Button
                onClick={() => (window.location.href = '/')}
                variant="outline"
              >
                Go home
              </Button>
            </div>

            {error.digest && (
              <p className="text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
