"use client"

import { Bell } from "lucide-react"
import { MOCK_NOTIFICHE } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export function NotificationBadge() {
  const { user } = useAuth()

  if (!user || user.role !== "user") return null

  const notificheNonLette = MOCK_NOTIFICHE.filter((n) => n.userId === user.id && !n.letta).length

  return (
    <Link href="/dashboard/user/notifiche" className="relative">
      <Bell className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
      {notificheNonLette > 0 && (
        <>
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {notificheNonLette}
          </span>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary animate-ping opacity-75" />
        </>
      )}
    </Link>
  )
}
