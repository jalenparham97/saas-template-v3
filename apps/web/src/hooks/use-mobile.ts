import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * A React hook that detects whether the current viewport is mobile-sized.
 *
 * This hook uses the `window.matchMedia` API to listen for viewport width changes
 * and determines if the screen width is below the mobile breakpoint (768px).
 * The hook returns `false` during server-side rendering and on the initial client render
 * to prevent hydration mismatches.
 *
 * @returns {boolean} `true` if the viewport width is less than 768px, `false` otherwise.
 *
 * @example
 * Basic usage in a component:
 * ```tsx
 * import { useIsMobile } from '@/hooks/use-mobile'
 *
 * function MyComponent() {
 *   const isMobile = useIsMobile()
 *
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileNavigation />
 *       ) : (
 *         <DesktopNavigation />
 *       )}
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * Conditional rendering based on screen size:
 * ```tsx
 * import { useIsMobile } from '@/hooks/use-mobile'
 *
 * function ResponsiveLayout() {
 *   const isMobile = useIsMobile()
 *
 *   return (
 *     <div className={isMobile ? 'flex-col' : 'flex-row'}>
 *       <aside>{isMobile ? <MobileMenu /> : <Sidebar />}</aside>
 *       <main>
 *         <Content />
 *       </main>
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * Using with conditional logic:
 * ```tsx
 * import { useIsMobile } from '@/hooks/use-mobile'
 *
 * function DataTable() {
 *   const isMobile = useIsMobile()
 *   const columns = isMobile ? mobileColumns : desktopColumns
 *   const pageSize = isMobile ? 5 : 10
 *
 *   return <Table columns={columns} pageSize={pageSize} data={data} />
 * }
 * ```
 *
 * @remarks
 * - The mobile breakpoint is set at 768px (screens narrower than this are considered mobile)
 * - This hook uses `matchMedia` for efficient, native browser viewport detection
 * - The hook automatically cleans up event listeners when the component unmounts
 * - Initial value is `undefined` which converts to `false` to prevent hydration issues
 * - The hook re-renders the component when the viewport crosses the mobile breakpoint
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
