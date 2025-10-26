'use client';

import { useUserEmailVerificationMutation } from '@/features/auth/queries/auth.queries';
import {
  Alert,
  AlertDescription,
  AlertIcon,
} from '@workspace/ui/components/alert';
import { Button } from '@workspace/ui/components/button';
import { AlertCircle, CheckCircle2, Mail, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

export function VerifyEmailView() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const email = useMemo(() => {
    return searchParams.get('email') ?? '';
  }, [searchParams]);

  const emailVerificationMutation = useUserEmailVerificationMutation();

  const handleResendEmail = async () => {
    if (!email) {
      setError('Email address not found');
      return;
    }
    setError(null);
    await emailVerificationMutation.mutateAsync({ email });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="flex size-12 items-center justify-center rounded-full border border-primary/10 bg-primary/5 text-primary shadow-xs">
            <Mail className="size-6" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify your email
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            We've sent a verification email to{' '}
            <strong className="text-foreground">{email}</strong>
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" appearance="light">
          <AlertIcon>
            <AlertCircle className="h-4 w-4" />
          </AlertIcon>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Alert variant="success" appearance="light">
        <AlertIcon>
          <CheckCircle2 className="h-4 w-4" />
        </AlertIcon>
        <AlertDescription>
          Check your inbox and click the verification link to activate your
          account.
        </AlertDescription>
      </Alert>

      <div className="space-y-3 rounded-xl border bg-muted/40 p-4">
        <p className="text-sm font-medium text-foreground">
          Didn't receive the email?
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span>Check your spam or promotions folder</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span>Make sure the email address is correct</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
            <span>Wait a few seconds and check again</span>
          </li>
        </ul>
      </div>

      <Button
        type="button"
        onClick={handleResendEmail}
        className="w-full"
        loading={emailVerificationMutation.isPending}
      >
        <RefreshCw className="mr-2 size-4" />
        Resend verification email
      </Button>
    </div>
  );
}
