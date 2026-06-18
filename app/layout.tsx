import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'StyleSwitch - Swap Clothes, Share Style',
  description: 'Good fits don\'t gatekeep. Join the sustainable fashion revolution. Switch clothes with your community, reduce waste.',
  keywords: ['clothing swap', 'sustainable fashion', 'thrift', 'clothing exchange', 'eco-friendly', 'fashion marketplace'],
  authors: [{ name: 'StyleSwitch' }],
  openGraph: {
    title: 'StyleSwitch - Good fits don\'t gatekeep',
    description: 'Swap clothes, share style. Join the sustainable fashion revolution.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#e84393',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
