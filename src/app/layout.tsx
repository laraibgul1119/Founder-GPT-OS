import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FounderGPT OS - AI Business Plan Generator',
  description: 'Generate complete, investor-ready business plans in minutes using AI.',
  keywords: 'startup, business plan, founder, investor ready, pitch deck outline, competitor analysis, personas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
