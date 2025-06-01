'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="container mx-auto flex items-center justify-between px-3 pt-10">
      <p className="text-3xl text-[#1A1A1A]">Antje-k</p>

      <div className="font-dm-sans flex gap-14 text-xl font-light">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn('font-light', pathname === item.href && 'font-medium')}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
