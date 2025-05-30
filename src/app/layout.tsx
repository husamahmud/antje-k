import type { Metadata } from 'next'

import { Caveat, DM_Sans, Source_Serif_4 } from 'next/font/google'

import { Header } from '@/components/header'

import { cn } from '@/lib/utils'
import './globals.css'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Antej-K',
  description: 'Antej-K',
}

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-caveat flex min-h-svh min-w-svw flex-col bg-fixed antialiased',
          caveat.style,
          dmSans.style,
          sourceSerif4.style
        )}
        style={{ backgroundImage: `url('/bg.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
