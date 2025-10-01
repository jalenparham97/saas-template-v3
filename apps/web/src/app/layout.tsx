import { Inter } from 'next/font/google';

import { Providers } from '@/components/providers';
import '@workspace/ui/globals.css';

const fontInter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontInter.className} text-base antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
