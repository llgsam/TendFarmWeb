import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tend Farm',
  description: 'Your healthy life, growing here.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
