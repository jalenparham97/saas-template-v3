'use client';

import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavTabsProps {
  children: React.ReactNode;
  className?: string;
}

export function NavTabs({ children, className }: NavTabsProps) {
  return (
    <div className="relative w-full overflow-x-auto overflow-y-hidden">
      <div className={cn('flex pb-0', className)}>
        <>{children}</>
      </div>
      <div className="right-0 bottom-0 left-0 -mt-[2px] h-[2px] w-full bg-gray-200/80" />
    </div>
  );
}

interface NavTabProps {
  href: string;
  label: string;
  [x: string]: unknown;
}

export function NavTab({ href, label, ...otherProps }: NavTabProps) {
  const pathname = usePathname();
  const isRouteMatch = pathname === href;

  return (
    <div>
      <div
        {...otherProps}
        className={cn(
          `border-b-2 border-gray-200 py-3`,
          isRouteMatch && 'border-b-2 border-gray-900'
        )}
      >
        <Link
          href={href}
          className={cn(
            'rounded-lg px-3.5 py-2 text-[15px] font-medium whitespace-nowrap text-gray-500 no-underline hover:bg-gray-100 hover:text-gray-900',
            isRouteMatch && 'text-gray-900 hover:text-gray-900'
          )}
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
