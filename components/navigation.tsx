"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background font-semibold text-sm">C</span>
            </div>
            <span className="font-semibold text-foreground tracking-tight">Clarity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Meetings
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Library
            </Link>
            <Link 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Settings
            </Link>
          </div>

          {/* User Avatar */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">JD</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Meetings
              </Link>
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Library
              </Link>
              <Link 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
