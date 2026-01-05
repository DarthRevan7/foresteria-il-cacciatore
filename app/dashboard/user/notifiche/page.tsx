"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_NOTIFICHE, type Notifica } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"
import { Bell, CheckCircle, XCircle, Clock, CreditCard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UserNotifichePage() {
  const { user } = useAuth()
  const [notifiche, setNotifiche] = useState(MOCK_NOTIFICHE.filter((n) => n.userId === user?.id))

  const handleSegnaComeLetta = (id: string) => {
    setNotifiche(notifiche.map((n) => (n.id === id ? { ...n, letta: true } : n)))
  }

  const handleSegnaTutteComeLette = () => {
    setNotifiche(notifiche.map((n) => ({ ...n, letta: true })))
  }

  const notificheNonLette = notifiche.filter((n) => !n.letta)

  const getNotificaIcon = (tipo: Notifica["tipo"]) => {
    switch (tipo) {
      case "prenotazione_confermata":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "prenotazione_rifiutata":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "nuova_proposta":
        return <Bell className="h-5 w-5 text-blue-600" />
      case "scadenza_pagamento":
        return <Clock className="h-5 w-5 text-orange-600" />
      case "pagamento_ricevuto":
        return <CreditCard className="h-5 w-5 text-green-600" />
    }
  }

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Notifiche</h1>
              <p className="text-muted-foreground mt-1">
                {notificheNonLette.length > 0
                  ? `${notificheNonLette.length} notifiche non lette`
                  : "Nessuna notifica non letta"}
              </p>
            </div>
            {notificheNonLette.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleSegnaTutteComeLette}>
                Segna tutte come lette
              </Button>
            )}
          </div>

          {notifiche.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Non hai ancora notifiche</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {notifiche.map((notifica) => (
                <Card
                  key={notifica.id}
                  className={`border-primary/20 cursor-pointer transition-all ${
                    !notifica.letta ? "bg-primary/5 shadow-md" : ""
                  }`}
                  onClick={() => handleSegnaComeLetta(notifica.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                        {getNotificaIcon(notifica.tipo)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{notifica.titolo}</h3>
                          {!notifica.letta && (
                            <span className="shrink-0 h-2 w-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">{notifica.messaggio}</p>

                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-xs text-muted-foreground">
                            {new Date(notifica.data).toLocaleString("it-IT")}
                          </p>

                          {notifica.prenotazioneId && (
                            <Link href="/dashboard/user">
                              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                Visualizza prenotazione →
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
