'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className="container px-3 mx-auto flex items-center justify-between pt-10">
      <p className="text-3xl text-[#1A1A1A]">Antje-k</p>

      <div className="font-dm-sans flex gap-14 text-xl font-light">
        <Link
          href="/"
          className={cn(
            "font-light",
            pathname === "/" && "font-medium"
          )}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={cn(
            "font-light",
            pathname === "/about" && "font-medium"
          )}
        >
          About
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1">
            <span>Contact</span>
            <ChevronDown strokeWidth="1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link
          href="/gallery"
          className={cn(
            "font-light",
            pathname === "/gallery" && "font-medium"
          )}
        >
          Gallery
        </Link>
      </div>
    </header>
  )
}
