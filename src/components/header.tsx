'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const Header = () => {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="container mx-auto px-3 pt-6 sm:pt-8 md:pt-10">
      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center justify-between">
        <p className="text-2xl sm:text-3xl text-[#1A1A1A]">Antje-k</p>

        <nav className="font-dm-sans flex gap-8 text-lg font-light sm:gap-10 md:gap-14 md:text-xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-light transition-colors duration-300 hover:text-[#828282]',
                pathname === item.href && 'font-medium'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between">
          <p className="text-xl text-[#1A1A1A]">Antje-k</p>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1 p-2"
            aria-label="Toggle mobile menu"
          >
            <span 
              className={cn(
                "block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300",
                mobileMenuOpen && "rotate-45 translate-y-1.5"
              )}
            />
            <span 
              className={cn(
                "block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300",
                mobileMenuOpen && "opacity-0"
              )}
            />
            <span 
              className={cn(
                "block h-0.5 w-6 bg-[#1A1A1A] transition-all duration-300",
                mobileMenuOpen && "-rotate-45 -translate-y-1.5"
              )}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="mt-4 pb-4 border-t border-gray-200">
            <div className="font-dm-sans flex flex-col gap-3 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-lg font-light py-2 transition-colors duration-300 hover:text-[#828282]',
                    pathname === item.href && 'font-medium text-[#1A1A1A]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
