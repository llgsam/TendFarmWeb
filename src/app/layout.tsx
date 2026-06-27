import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Farming Game Hub',
  description: 'The farming game community — guides, tools, and quizzes for Hay Day, Stardew Valley, Animal Crossing, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
