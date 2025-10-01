import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Concept Generator',
  description: 'Generate creative marketing concepts based on audience demographics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <div className="min-h-screen">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
