"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_PRENOTAZIONI } from "@/lib/mock-data"
import { Mail, Calendar, Users, Home } from "lucide-react"

export default function AdminOspitiPage() {
  const prenotazioniConfermate = MOCK_PRENOTAZIONI.filter((p) => p.status === "confermata" || p.status === "completata")

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Registro Ospiti</h1>
            <p className="text-muted-foreground mt-1">Elenco completo degli ospiti e loro prenotazioni</p>
          </div>

          <div className="space-y-4">
            {prenotazioniConfermate.map((prenotazione) => (
              <Card key={prenotazione.id} className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{prenotazione.userName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Mail className="h-4 w-4" />
                          {prenotazione.userEmail}
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Soggiorno</p>
                            <p>
                              {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} -{" "}
                              {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4 shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Persone</p>
                            <p>{prenotazione.numeroPersone} ospiti</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Home className="h-4 w-4 shrink-0" />
                          <div>
                            <p className="font-medium text-foreground">Piano</p>
                            <p className="capitalize">{prenotazione.piano} piano</p>
                          </div>
                        </div>
                      </div>

                      {prenotazione.note && (
                        <div className="rounded-md bg-muted/50 p-3">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Note:</span> {prenotazione.note}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            prenotazione.status === "confermata"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                          }`}
                        >
                          {prenotazione.status === "confermata" ? "Attiva" : "Completata"}
                        </span>
                        {prenotazione.accontoVersato && (
                          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            Acconto versato
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {prenotazioniConfermate.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-8">
                  <p className="text-muted-foreground">Nessun ospite registrato</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
