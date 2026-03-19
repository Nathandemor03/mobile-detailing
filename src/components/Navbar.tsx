'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#0f172a] border-b border-[#1e2d45] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <Sparkles className="text-amber-400 w-6 h-6" />
            <span>
              <span className="text-amber-400">Utah</span> Detail Co.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Book Now + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/book"
              className="hidden md:inline-flex items-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-semibold rounded-lg text-sm transition-colors"
            >
              Book Now
            </Link>
            <button
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f172a] border-t border-[#1e2d45] px-4 pb-4">
          <nav className="flex flex-col gap-3 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 transition-colors text-base font-medium py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0f172a] font-semibold rounded-lg text-sm transition-colors"
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
