import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'C-C-G | Plombier Chauffagiste à Héricourt - Intervention Rapide',
  description: 'C-C-G, votre artisan plombier chauffagiste de confiance à Héricourt. Installation, dépannage chauffage, climatisation et plomberie. Devis gratuit et intervention rapide.',
  keywords: 'plombier Héricourt, chauffagiste Héricourt, dépannage chauffage, installation climatisation, plomberie urgence',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'C-C-G | Plombier Chauffagiste à Héricourt',
    description: 'Artisan plombier chauffagiste à Héricourt. Intervention rapide, devis gratuit. Noté 5/5 sur Google et Pages Jaunes.',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/logo.svg',
        width: 200,
        height: 60,
        alt: 'C-C-G Logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-ccg-dark`}>
        {children}
      </body>
    </html>
  )
}