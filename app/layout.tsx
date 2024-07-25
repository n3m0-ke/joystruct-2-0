import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'


import StickyNavbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JoyStructurals Website',
  description: 'JoyStructurals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StickyNavbar />
        {children}
        
      </body>
    </html>
  )
}
