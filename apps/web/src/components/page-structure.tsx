import { cn } from '@workspace/ui/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="sm:p-6 lg:p-8">{children}</div>;
}

export function PageTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h1 className={cn('text-2xl font-semibold sm:text-2xl', className)}>
      {children}
    </h1>
  );
}

export function PageContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('mt-8', className)}>{children}</div>;
}
