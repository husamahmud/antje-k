import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

export const Header = () => {
  return (
    <header className="container mx-auto flex items-center justify-between pt-10">
      <p className="text-3xl text-[#1A1A1A]">Antje-k</p>

      <div className="font-dm-sans flex gap-5 text-xl font-light">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1">
            <span>Contact</span>
            <ChevronDown strokeWidth="1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/about">Gallery</Link>
      </div>
    </header>
  )
}
