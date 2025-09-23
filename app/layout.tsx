import type { Metadata } from 'next'
import { Inter, Poppins, Roboto } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-heading" });
const roboto = Roboto({ subsets: ["latin"], weight: ["300","400","500"], variable: "--font-body" });

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
    <html lang="en" className={`${poppins.variable} ${roboto.variable}` + ` ` + `background`}>
      <body className="bg-black text-white">
        {children}
        <Analytics />      
      </body>
    </html>
  )
}
