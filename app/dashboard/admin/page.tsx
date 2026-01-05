"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_STATISTICHE, MOCK_PRENOTAZIONI, MOCK_REMINDERS } from "@/lib/mock-data"
import { Euro, Users, Calendar, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminDashboardPage() {
  const stats = MOCK_STATISTICHE
  const prenotazioniInAttesa = MOCK_PRENOTAZIONI.filter((p) => p.status === "in_attesa").length
  const reminderUrgenti = MOCK_REMINDERS.filter((r) => !r.completato && r.priorita === "alta").length

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard Amministratore</h1>
            <p className="text-muted-foreground mt-1">Panoramica generale della foresteria</p>
          </div>

          {/* Alert per azioni urgenti */}
          {(prenotazioniInAttesa > 0 || reminderUrgenti > 0) && (
            <Card className="mb-6 border-orange-500/50 bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-orange-900 dark:text-orange-100">Azioni richieste</p>
                    <div className="text-sm text-orange-800 dark:text-orange-200 space-y-1">
                      {prenotazioniInAttesa > 0 && <p>• {prenotazioniInAttesa} prenotazioni in attesa di risposta</p>}
                      {reminderUrgenti > 0 && <p>• {reminderUrgenti} reminder urgenti da completare</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics Cards */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incasso Mensile</CardTitle>
                <Euro className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">€{stats.incassoMensile}</div>
                <p className="text-xs text-muted-foreground mt-1">Gennaio 2026</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ospiti Totali</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.numeroOspiti}</div>
                <p className="text-xs text-muted-foreground mt-1">Questo mese</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prenotazioni Attive</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.prenotazioniAttive}</div>
                <p className="text-xs text-muted-foreground mt-1">In corso</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasso Occupazione</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.occupazionePercentuale}%</div>
                <p className="text-xs text-muted-foreground mt-1">Media mensile</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Ultime Prenotazioni */}
            <Card>
              <CardHeader>
                <CardTitle>Ultime Prenotazioni</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_PRENOTAZIONI.slice(0, 3).map((prenotazione) => (
                    <div
                      key={prenotazione.id}
                      className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">{prenotazione.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} -{" "}
                          {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          prenotazione.status === "confermata"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : prenotazione.status === "in_attesa"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {prenotazione.status === "confermata"
                          ? "Confermata"
                          : prenotazione.status === "in_attesa"
                            ? "In attesa"
                            : "Contrattazione"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reminder Urgenti */}
            <Card>
              <CardHeader>
                <CardTitle>Reminder Urgenti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_REMINDERS.filter((r) => !r.completato && r.priorita === "alta")
                    .slice(0, 3)
                    .map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <AlertCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground">{reminder.titolo}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{reminder.descrizione}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(reminder.data).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                      </div>
                    ))}

                  {MOCK_REMINDERS.filter((r) => !r.completato && r.priorita === "alta").length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">Nessun reminder urgente</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
