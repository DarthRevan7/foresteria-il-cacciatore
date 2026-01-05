"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Calendar, Bell, LogOut, ClipboardList, Users, Menu, X } from "lucide-react"
import { useState } from "react"

export function DashboardNav() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isAdmin = user?.role === "admin"

  const adminLinks = [
    { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/admin/prenotazioni", label: "Prenotazioni", icon: Calendar },
    { href: "/dashboard/admin/reminder", label: "Reminder", icon: Bell },
    { href: "/dashboard/admin/pulizie", label: "Pulizie", icon: ClipboardList },
    { href: "/dashboard/admin/ospiti", label: "Ospiti", icon: Users },
  ]

  const userLinks = [
    { href: "/dashboard/user", label: "Le Mie Prenotazioni", icon: Calendar },
    { href: "/dashboard/user/notifiche", label: "Notifiche", icon: Bell },
  ]

  const links = isAdmin ? adminLinks : userLinks

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-bold text-primary">Il Cacciatore</div>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {isAdmin ? "Admin" : "Pannello Utente"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-4 md:flex">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              )
            })}

            <div className="ml-4 flex items-center gap-2 border-l border-border pl-4">
              <span className="text-sm text-muted-foreground hidden lg:inline">
                {user?.nome} {user?.cognome}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden lg:inline">Esci</span>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <div className="mb-3 pb-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">
                {user?.nome} {user?.cognome}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>

            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              )
            })}

            <button
              onClick={() => {
                logout()
                setIsMobileMenuOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-destructive hover:bg-muted"
            >
              <LogOut className="h-5 w-5" />
              Esci
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
