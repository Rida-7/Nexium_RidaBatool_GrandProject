// app/layout.tsx
import './globals.css'; // Tailwind or any global CSS
// import { GeistSans } from 'geist/font/sans'; // optional, if using a custom font
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import type { ReactNode } from 'react';

// Optional: Set global metadata
export const metadata: Metadata = {
  title: 'AI Recipe Generator',
  description: 'AI-powered app to generate delicious recipes tailored to you.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
