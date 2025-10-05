import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Food Swipe - Build Your Grocery List',
  description: 'Swipe right on foods you want, build your weekly grocery list',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
