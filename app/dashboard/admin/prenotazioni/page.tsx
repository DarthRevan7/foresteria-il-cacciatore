"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_PRENOTAZIONI, type Prenotazione } from "@/lib/mock-data"
import { useState } from "react"
import { Check, X, Calendar, Users, Euro, Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPrenotazioniPage() {
  const [prenotazioni, setPrenotazioni] = useState(MOCK_PRENOTAZIONI)
  const [selectedPrenotazione, setSelectedPrenotazione] = useState<Prenotazione | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messaggio, setMessaggio] = useState("")
  const [nuovaDataInizio, setNuovaDataInizio] = useState("")
  const [nuovaDataFine, setNuovaDataFine] = useState("")
  const [giorniScadenza, setGiorniScadenza] = useState("2")

  const handleApriDettagli = (prenotazione: Prenotazione) => {
    setSelectedPrenotazione(prenotazione)
    setMessaggio("")
    setNuovaDataInizio(prenotazione.checkIn)
    setNuovaDataFine(prenotazione.checkOut)
    setIsModalOpen(true)
  }

  const handleConferma = () => {
    if (!selectedPrenotazione) return

    const scadenza = new Date()
    scadenza.setDate(scadenza.getDate() + Number.parseInt(giorniScadenza))

    const prenotazioneAggiornata: Prenotazione = {
      ...selectedPrenotazione,
      status: "contrattazione",
      checkIn: nuovaDataInizio,
      checkOut: nuovaDataFine,
      messaggioAdmin: messaggio || "Prenotazione confermata. Procedi con il pagamento dell'acconto.",
      scadenzaPagamento: scadenza.toISOString(),
    }

    setPrenotazioni(prenotazioni.map((p) => (p.id === selectedPrenotazione.id ? prenotazioneAggiornata : p)))
    setIsModalOpen(false)
    setSelectedPrenotazione(null)
  }

  const handleRifiuta = () => {
    if (!selectedPrenotazione) return

    const prenotazioneAggiornata: Prenotazione = {
      ...selectedPrenotazione,
      status: "rifiutata",
      messaggioAdmin: messaggio || "Spiacenti, non possiamo accettare questa prenotazione.",
    }

    setPrenotazioni(prenotazioni.map((p) => (p.id === selectedPrenotazione.id ? prenotazioneAggiornata : p)))
    setIsModalOpen(false)
    setSelectedPrenotazione(null)
  }

  const getStatusBadge = (status: Prenotazione["status"]) => {
    const badges = {
      in_attesa: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      contrattazione: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      confermata: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      rifiutata: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      completata: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    }
    const labels = {
      in_attesa: "In Attesa",
      contrattazione: "Contrattazione",
      confermata: "Confermata",
      rifiutata: "Rifiutata",
      completata: "Completata",
    }
    return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badges[status]}`}>{labels[status]}</span>
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-muted/30">
        <DashboardNav />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Gestione Prenotazioni</h1>
            <p className="text-muted-foreground mt-1">Gestisci tutte le richieste di prenotazione</p>
          </div>

          <div className="space-y-4">
            {prenotazioni.map((prenotazione) => (
              <Card key={prenotazione.id} className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{prenotazione.userName}</h3>
                        {getStatusBadge(prenotazione.status)}
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {new Date(prenotazione.checkIn).toLocaleDateString("it-IT")} -{" "}
                            {new Date(prenotazione.checkOut).toLocaleDateString("it-IT")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4 shrink-0" />
                          <span>{prenotazione.numeroPersone} persone</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Euro className="h-4 w-4 shrink-0" />
                          <span>
                            Totale: €{prenotazione.totale} | Acconto: €{prenotazione.acconto}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {new Date(prenotazione.dataRichiesta).toLocaleDateString("it-IT")}
                          </span>
                        </div>
                      </div>

                      {prenotazione.note && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Note:</span> {prenotazione.note}
                        </p>
                      )}

                      {prenotazione.messaggioAdmin && (
                        <div className="mt-3 rounded-md bg-primary/10 p-3">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Tuo messaggio:</span> {prenotazione.messaggioAdmin}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none bg-transparent"
                        onClick={() => handleApriDettagli(prenotazione)}
                      >
                        Gestisci
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal Gestione */}
        {isModalOpen && selectedPrenotazione && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Gestisci Prenotazione - {selectedPrenotazione.userName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dataInizio">Data Check-in</Label>
                    <Input
                      id="dataInizio"
                      type="date"
                      value={nuovaDataInizio}
                      onChange={(e) => setNuovaDataInizio(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataFine">Data Check-out</Label>
                    <Input
                      id="dataFine"
                      type="date"
                      value={nuovaDataFine}
                      onChange={(e) => setNuovaDataFine(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="giorniScadenza">Giorni per il pagamento dell'acconto</Label>
                  <Input
                    id="giorniScadenza"
                    type="number"
                    min="1"
                    max="7"
                    value={giorniScadenza}
                    onChange={(e) => setGiorniScadenza(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="messaggio">Messaggio per il cliente</Label>
                  <Textarea
                    id="messaggio"
                    placeholder="Scrivi un messaggio per il cliente..."
                    value={messaggio}
                    onChange={(e) => setMessaggio(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={handleConferma} className="flex-1" size="lg">
                    <Check className="mr-2 h-4 w-4" />
                    Conferma e Avvia Contrattazione
                  </Button>
                  <Button onClick={handleRifiuta} variant="destructive" className="flex-1" size="lg">
                    <X className="mr-2 h-4 w-4" />
                    Rifiuta Prenotazione
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
