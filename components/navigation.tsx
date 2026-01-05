"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">Il Cacciatore</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/noi" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Noi
            </Link>
            <Link href="/prenota" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
              Prenota
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                {user.role === "user" && (
                  <Link href="/dashboard/user/notifiche" className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm">
                  Accedi
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/noi"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Noi
            </Link>
            <Link
              href="/prenota"
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              Prenota
            </Link>
            {user ? (
              <>
                <Link
                  href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === "user" && (
                  <Link
                    href="/dashboard/user/notifiche"
                    className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                    onClick={() => setIsOpen(false)}
                  >
                    Notifiche
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                Accedi
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
