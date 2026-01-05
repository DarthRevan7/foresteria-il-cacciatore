"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_REMINDERS, type Reminder } from "@/lib/mock-data"
import { useState } from "react"
import { Plus, Check, Calendar, AlertCircle, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminReminderPage() {
  const [reminders, setReminders] = useState(MOCK_REMINDERS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nuovoReminder, setNuovoReminder] = useState<Partial<Reminder>>({
    titolo: "",
    descrizione: "",
    data: "",
    tipo: "altro",
    priorita: "media",
    completato: false,
  })

  const handleAggiungiReminder = () => {
    if (!nuovoReminder.titolo || !nuovoReminder.data) return

    const reminder: Reminder = {
      id: Date.now().toString(),
      titolo: nuovoReminder.titolo,
      descrizione: nuovoReminder.descrizione || "",
      data: nuovoReminder.data,
      tipo: nuovoReminder.tipo as Reminder["tipo"],
      priorita: nuovoReminder.priorita as Reminder["priorita"],
      completato: false,
    }

    setReminders([...reminders, reminder])
    setIsModalOpen(false)
    setNuovoReminder({
      titolo: "",
      descrizione: "",
      data: "",
      tipo: "altro",
      priorita: "media",
      completato: false,
    })
  }

  const handleCompletaReminder = (id: string) => {
    setReminders(reminders.map((r) => (r.id === id ? { ...r, completato: !r.completato } : r)))
  }

  const handleEliminaReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id))
  }

  const getPrioritaColor = (priorita: Reminder["priorita"]) => {
    return priorita === "alta"
      ? "text-red-600 dark:text-red-400"
      : priorita === "media"
        ? "text-orange-600 dark:text-orange-400"
        : "text-blue-600 dark:text-blue-400"
  }

  const getTipoIcon = (tipo: Reminder["tipo"]) => {
    const icons = {
      pulizia: "🧹",
      accoglienza: "👋",
      manutenzione: "🔧",
      altro: "📋",
    }
    return icons[tipo]
  }

  const reminderNonCompletati = reminders.filter((r) => !r.completato)
  const reminderCompletati = reminders.filter((r) => r.completato)

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reminder</h1>
              <p className="text-muted-foreground mt-1">Gestisci le attività della foresteria</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Nuovo Reminder
            </Button>
          </div>

          {/* Reminder Attivi */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Da Completare</h2>
            <div className="space-y-4">
              {reminderNonCompletati.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center py-8">
                    <p className="text-muted-foreground">Nessun reminder da completare</p>
                  </CardContent>
                </Card>
              ) : (
                reminderNonCompletati.map((reminder) => (
                  <Card key={reminder.id} className="border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => handleCompletaReminder(reminder.id)}
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-input hover:border-primary transition-colors"
                        >
                          {reminder.completato && <Check className="h-3 w-3 text-primary" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start gap-2 mb-2">
                            <span className="text-2xl">{getTipoIcon(reminder.tipo)}</span>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-foreground">{reminder.titolo}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{reminder.descrizione}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(reminder.data).toLocaleDateString("it-IT")}
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertCircle className={`h-4 w-4 ${getPrioritaColor(reminder.priorita)}`} />
                              <span className={`font-medium ${getPrioritaColor(reminder.priorita)}`}>
                                Priorità {reminder.priorita}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEliminaReminder(reminder.id)}
                          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Reminder Completati */}
          {reminderCompletati.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">Completati</h2>
              <div className="space-y-4">
                {reminderCompletati.map((reminder) => (
                  <Card key={reminder.id} className="border-border opacity-60">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => handleCompletaReminder(reminder.id)}
                          className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-primary bg-primary"
                        >
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </button>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground line-through">{reminder.titolo}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{reminder.descrizione}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {new Date(reminder.data).toLocaleDateString("it-IT")}
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEliminaReminder(reminder.id)}
                          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Nuovo Reminder */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Nuovo Reminder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titolo">Titolo</Label>
                  <Input
                    id="titolo"
                    value={nuovoReminder.titolo}
                    onChange={(e) => setNuovoReminder({ ...nuovoReminder, titolo: e.target.value })}
                    placeholder="Es: Pulizia primo piano"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descrizione">Descrizione</Label>
                  <Textarea
                    id="descrizione"
                    value={nuovoReminder.descrizione}
                    onChange={(e) => setNuovoReminder({ ...nuovoReminder, descrizione: e.target.value })}
                    placeholder="Dettagli dell'attività..."
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      value={nuovoReminder.data}
                      onChange={(e) => setNuovoReminder({ ...nuovoReminder, data: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <select
                      id="tipo"
                      value={nuovoReminder.tipo}
                      onChange={(e) => setNuovoReminder({ ...nuovoReminder, tipo: e.target.value as Reminder["tipo"] })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="pulizia">Pulizia</option>
                      <option value="accoglienza">Accoglienza</option>
                      <option value="manutenzione">Manutenzione</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priorita">Priorità</Label>
                  <select
                    id="priorita"
                    value={nuovoReminder.priorita}
                    onChange={(e) =>
                      setNuovoReminder({ ...nuovoReminder, priorita: e.target.value as Reminder["priorita"] })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="bassa">Bassa</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAggiungiReminder} className="flex-1" size="lg">
                    Aggiungi Reminder
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)} variant="outline" size="lg">
                    Annulla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
