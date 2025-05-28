import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './provider';
import Navigaton from '@/components/Navigaton';
import Footer from '@/components/Footer';
import { Analytics } from "@vercel/analytics/react"
import LenisProvider from '@/components/Provider/LenisProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Feed-Wall',
  description: 'Feed-Wall a feedback collection tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigaton />
           <Analytics/>
           <LenisProvider>
            <main className="">{children}</main>
            </LenisProvider>
            <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
