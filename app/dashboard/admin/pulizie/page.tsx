"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_PRENOTAZIONI } from "@/lib/mock-data"
import { Calendar, Users, Home } from "lucide-react"

export default function AdminPuliziePage() {
  const prenotazioniConfermate = MOCK_PRENOTAZIONI.filter((p) => p.status === "confermata")

  // Raggruppa per piano
  const primoPiano = prenotazioniConfermate.filter((p) => p.piano === "primo")
  const secondoPiano = prenotazioniConfermate.filter((p) => p.piano === "secondo")

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestione Pulizie</h1>
            <p className="text-muted-foreground mt-1">Pianifica le pulizie in base agli arrivi e partenze</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Primo Piano */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Primo Piano</h2>
                </div>

                {primoPiano.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">Nessuna prenotazione attiva</p>
                ) : (
                  <div className="space-y-4">
                    {primoPiano.map((prenotazione) => (
                      <div key={prenotazione.id} className="rounded-lg border border-border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{prenotazione.userName}</p>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                            Confermata
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Check-in: {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Check-out: {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {prenotazione.numeroPersone} persone
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-sm font-medium text-primary">
                            🧹 Pulizia necessaria il{" "}
                            {new Date(
                              new Date(prenotazione.checkIn).getTime() - 24 * 60 * 60 * 1000,
                            ).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Secondo Piano */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Secondo Piano</h2>
                </div>

                {secondoPiano.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">Nessuna prenotazione attiva</p>
                ) : (
                  <div className="space-y-4">
                    {secondoPiano.map((prenotazione) => (
                      <div key={prenotazione.id} className="rounded-lg border border-border p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{prenotazione.userName}</p>
                          <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                            Confermata
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Check-in: {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Check-out: {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {prenotazione.numeroPersone} persone
                        </div>
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-sm font-medium text-primary">
                            🧹 Pulizia necessaria il{" "}
                            {new Date(
                              new Date(prenotazione.checkIn).getTime() - 24 * 60 * 60 * 1000,
                            ).toLocaleDateString("it-IT")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Promemoria Generale */}
          <Card className="mt-6 border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Checklist Pulizie Standard</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Cambio biancheria letti (lenzuola e federe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Pulizia e sanificazione bagni</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Pulizia cucina (piano cottura, frigorifero, lavello)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Aspirapolvere e lavaggio pavimenti</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Svuotamento cestini e sostituzione sacchi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Controllo funzionamento riscaldamento e acqua calda</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
