import { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Providers } from '@/app/providers'
import { dark, shadesOfPurple } from '@clerk/themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Navbar } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {NextUIProvider} from '@nextui-org/react'

export const metadata: Metadata = {
  title: "Wheel",
  description: "Your Finance Companion",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: shadesOfPurple,
      userProfile: {
        baseTheme: shadesOfPurple,
      }
    }}>
      <html lang="en" className='dark'>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />

          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''></link>
          <link href="https://fonts.googleapis.com/css2?family=Annapurna+SIL:wght@400;700&family=Inter:wght@100..900&family=Kalam:wght@300;400;700&display=swap" rel="stylesheet"></link>
        </head>
        <body>
          <Providers>
            {children}
          </Providers>
          <SpeedInsights />

        </body>
      </html>
    </ClerkProvider>

  )
}

